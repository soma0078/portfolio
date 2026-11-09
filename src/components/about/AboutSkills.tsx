import { useLayoutEffect, useRef, useState } from "react";
import gsap, { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { STACK_HEIGHT, TECH_STACKS } from "@constants/about";
import { PAGE_GUTTER_X, PAGE_MAX_WIDTH } from "@constants/layout";
import TabbedSurface from "@components/common/TabbedSurface";
import type { TabGeometry } from "src/utils/tabPath";
import { SOFT_VOLUME_CARD } from "src/utils/softVolume";

const LAST_INDEX = TECH_STACKS.length - 1;

const CARD_TRAVEL = 70;
const CARD_RISE = 1;
const CARD_STEP = 2;
const SCROLL_PER_CARD = 400;
const CARD_FADE = 0.3;

const ARROW_DROP = 96;
const ARROW_STRETCH = 1.9;
const ARROW_BEAT = 0.8;
const ARROW_SNAP = 0.6;
const ARROW_HOLD = 0.2;
const ARROW_LAG = 0.1;

const BANNER_HEIGHT = 80;
const BLOCK_GAP = 40;

const BLOCK_HEIGHT = `calc(${STACK_HEIGHT} + ${BANNER_HEIGHT + BLOCK_GAP}px)`;
const CARD_PADDING = 24;

const RING_SIZE = 64;
const RING_WIDTH = 2;
const RING_RADIUS = (RING_SIZE - RING_WIDTH) / 2;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

const ringOffset = (p: number) => RING_LENGTH * (1 - p);

// 본체 위로 보이는 탭 높이와 탭 안 제목 위치
const TAB_HEIGHT = 40;
const TAB_LABEL_TOP = 8;
const TAB_PADDING = 16;
// 이웃한 탭의 비스듬한 옆선이 겹치는 폭
const TAB_OVERLAP = 32;
const CARD_RADIUS = 28;

// 탭 윤곽: 비스듬한 옆선의 가로 길이, 위쪽 모서리 둥글기, 옆선과 본체가 만나는 오목한 곡선 크기
const TAB_SLOPE = 22;
const TAB_CORNER = 12;
const TAB_FILLET = 10;

// 제목 폭에 맞춰 탭 너비를 정하고 제목 위치를 함께 돌려준다
function placeTab(left: number, labelWidth: number, flushLeft: boolean) {
  // 왼쪽에 붙는 탭은 오른쪽에만 옆선이 있다
  const tab: TabGeometry = {
    left,
    width: labelWidth + TAB_PADDING * 2 + TAB_SLOPE * (flushLeft ? 1 : 2),
    slope: TAB_SLOPE,
    corner: TAB_CORNER,
    fillet: TAB_FILLET,
    flushLeft,
  };

  return {
    tab,
    labelLeft: left + (flushLeft ? 0 : TAB_SLOPE) + TAB_PADDING,
  };
}

// 카드는 완전히 겹치고 탭만 홈 폴더처럼 한 줄로 나란히 둔다.
// 한 줄에 다 들어가지 않으면 탭도 같은 자리에 겹쳐 맨 앞 카드의 탭만 보이게 한다
function layoutTabs(labelWidths: number[], deckWidth: number) {
  let left = 0;
  const inRow = labelWidths.map((labelWidth, index) => {
    const placed = placeTab(left, labelWidth, index === 0);
    left += placed.tab.width - TAB_OVERLAP;
    return placed;
  });

  const last = inRow[inRow.length - 1];
  const fits = !!last && last.tab.left + last.tab.width <= deckWidth;
  if (fits) return inRow;

  // 겹칠 때는 너비를 가장 긴 제목에 맞춰야 뒤 탭의 모서리가 삐져나오지 않는다
  const longest = Math.max(...labelWidths);
  return labelWidths.map(() => placeTab(0, longest, true));
}

function StepRing({ total }: { total: number }) {
  const center = RING_SIZE / 2;

  return (
    <div
      aria-hidden
      className="js-stack-ring-root absolute z-10 text-black"
      // 카드가 완전히 겹치므로 맨 앞 카드 본체의 오른쪽 위에 둔다
      style={{
        top: TAB_HEIGHT + 24,
        right: 24,
        width: RING_SIZE,
        height: RING_SIZE,
      }}
    >
      <svg width={RING_SIZE} height={RING_SIZE} className="-rotate-90">
        <circle
          cx={center}
          cy={center}
          r={RING_RADIUS}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.22}
          strokeWidth={RING_WIDTH}
        />
        <circle
          className="js-stack-ring"
          cx={center}
          cy={center}
          r={RING_RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={RING_WIDTH}
          strokeLinecap="round"
          strokeDasharray={RING_LENGTH}
          strokeDashoffset={ringOffset(1 / total)}
        />
      </svg>

      <span className="absolute inset-0 flex items-center justify-center  text-sm font-medium">
        {total < 10 && "0"}
        <span className="js-stack-ring-number">1</span>
      </span>
    </div>
  );
}

const ARROWS = [
  { size: 32, weight: "font-normal", lag: 0 },
  { size: 26, weight: "font-semibold", lag: 1 },
] as const;

export default function AboutSkills() {
  const [activeIndex, setActiveIndex] = useState(LAST_INDEX);
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLUListElement>(null);
  const labelRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const [labelWidths, setLabelWidths] = useState<number[]>(() =>
    TECH_STACKS.map(() => 0),
  );
  const [deckWidth, setDeckWidth] = useState(0);

  // 탭 너비는 글자 폭을, 탭 간격은 덱 폭을 따른다. 웹폰트가 늦게 들어와도 다시 잰다
  useLayoutEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const measure = () => {
      setDeckWidth(deck.clientWidth);
      setLabelWidths(labelRefs.current.map((label) => label?.offsetWidth ?? 0));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(deck);
    labelRefs.current.forEach((label) => label && observer.observe(label));

    return () => observer.disconnect();
  }, []);

  const tabs = layoutTabs(labelWidths, deckWidth);

  useGSAP(
    () => {
      const block = pinRef.current;
      if (!block) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          pinned: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const total = TECH_STACKS.length;
          const deck = deckRef.current;
          const ring = deck?.querySelector(".js-stack-ring");
          const ringRoot = deck?.querySelector(".js-stack-ring-root");
          const number = deck?.querySelector(".js-stack-ring-number");
          if (!ring || !ringRoot || !number) return;

          if (context.conditions?.reduced) {
            gsap.set(ring, { strokeDashoffset: ringOffset(1) });
            gsap.set(number, { innerText: String(total) });
            gsap.set(ringRoot, {
              color: TECH_STACKS[total - 1].onDark ? "#fff" : "#000",
            });
            return;
          }
          gsap.utils
            .toArray<HTMLElement>(".js-stack-arrow")
            .forEach((arrow) => {
              const stretch = ARROW_BEAT * ARROW_SNAP;
              const handOver = ARROW_BEAT;

              gsap
                .timeline({
                  repeat: -1,
                  delay: Number(arrow.dataset.arrowLag) * ARROW_LAG,
                })
                .to(
                  arrow,
                  { y: ARROW_DROP, duration: ARROW_BEAT, ease: "power2.in" },
                  0,
                )
                .to(
                  arrow,
                  {
                    scaleY: ARROW_STRETCH,
                    transformOrigin: "50% 0%",
                    duration: stretch,
                    ease: "power2.in",
                  },
                  0,
                )
                .set(
                  arrow,
                  { y: -ARROW_DROP, transformOrigin: "50% 100%" },
                  handOver,
                )
                .to(
                  arrow,
                  { y: 0, duration: ARROW_BEAT, ease: "power2.out" },
                  handOver,
                )
                .to(
                  arrow,
                  { scaleY: 1, duration: stretch, ease: "power2.out" },
                  handOver + ARROW_BEAT - stretch,
                )
                .to({}, { duration: ARROW_HOLD }, handOver + ARROW_BEAT);
            });

          const timeline = gsap.timeline({ paused: true });

          gsap.utils
            .toArray<HTMLElement>(".js-stack-card")
            .slice(1)
            .forEach((card, index) => {
              const at = index * CARD_STEP;

              timeline.fromTo(
                card,
                { yPercent: CARD_TRAVEL },
                { yPercent: 0, duration: CARD_RISE, ease: "power2.out" },
                at,
              );
              timeline.fromTo(
                card,
                { opacity: 0 },
                { opacity: 1, duration: CARD_RISE * CARD_FADE, ease: "none" },
                at,
              );

              const step = index + 2;
              const takeOver = at + CARD_RISE * CARD_FADE;

              timeline.fromTo(
                ring,
                { strokeDashoffset: ringOffset((step - 1) / total) },
                {
                  strokeDashoffset: ringOffset(step / total),
                  duration: CARD_RISE,
                  ease: "none",
                },
                at,
              );
              timeline.set(number, { innerText: String(step) }, takeOver);
              timeline.set(
                ringRoot,
                { color: TECH_STACKS[step - 1].onDark ? "#fff" : "#000" },
                takeOver,
              );
            });

          ScrollTrigger.create({
            animation: timeline,
            trigger: block,
            start: () =>
              `top ${Math.max(0, (window.innerHeight - block.offsetHeight) / 2)}px`,
            end: () => `+=${(TECH_STACKS.length - 1) * SCROLL_PER_CARD}`,
            pin: true,
            anticipatePin: 1,
            scrub: 0.5,
            invalidateOnRefresh: true,
          });
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className={`${PAGE_MAX_WIDTH} ${PAGE_GUTTER_X}`}>
      <div
        ref={pinRef}
        className="flex flex-col items-center overflow-hidden rounded-[28px]"
        style={{ height: BLOCK_HEIGHT }}
      >
        <div className="w-full shrink-0">
          <div className="flex h-[74px] w-full origin-top-left items-center overflow-hidden rotate-[0.335deg] bg-white p-3 dark:bg-night">
            {ARROWS.map((arrow) => (
              <span
                key={`left-${arrow.size}`}
                aria-hidden
                data-arrow-lag={arrow.lag}
                className={`js-stack-arrow shrink-0 text-center ${arrow.weight}`}
                style={{ fontSize: arrow.size, width: arrow.size }}
              >
                ↓
              </span>
            ))}

            <h2 className="flex-1 text-center text-2xl font-bold lg:text-[32px]">
              Tech Stacks
            </h2>

            {[...ARROWS].reverse().map((arrow) => (
              <span
                key={`right-${arrow.size}`}
                aria-hidden
                data-arrow-lag={arrow.lag}
                className={`js-stack-arrow shrink-0 text-center ${arrow.weight}`}
                style={{ fontSize: arrow.size, width: arrow.size }}
              >
                ↓
              </span>
            ))}
          </div>
        </div>

        <ul
          ref={deckRef}
          className="relative w-full overflow-hidden rounded-b-[28px]"
          style={{ height: STACK_HEIGHT }}
        >
          {TECH_STACKS.map((stack, index) => {
            const active = index === activeIndex;

            return (
              <li
                key={stack.title}
                // 카드의 빈 자리가 뒤 카드 탭을 덮으므로 클릭은 탭 글자만 받는다
                className="js-stack-card pointer-events-none absolute inset-x-0 flex flex-col justify-end p-6"
                style={{
                  top: 0,
                  height: "100%",
                  paddingBottom: CARD_PADDING,
                  zIndex: active ? TECH_STACKS.length : index,
                }}
              >
                <TabbedSurface
                  id={`tech-stack-${index}`}
                  color={stack.color}
                  tab={tabs[index].tab}
                  tabHeight={TAB_HEIGHT}
                  radius={CARD_RADIUS}
                  volume={SOFT_VOLUME_CARD}
                />

                <h3
                  ref={(label) => {
                    labelRefs.current[index] = label;
                  }}
                  className={`pointer-events-auto absolute whitespace-nowrap text-base font-semibold md:text-xl ${
                    stack.onDark ? "text-white" : "text-black"
                  }`}
                  style={{ left: tabs[index].labelLeft, top: TAB_LABEL_TOP }}
                >
                  <button
                    type="button"
                    aria-expanded={active}
                    onClick={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className="cursor-pointer text-left"
                  >
                    {stack.title}
                  </button>
                </h3>

                <div className="relative flex w-full flex-col gap-1">
                  {stack.items.map((item) => (
                    <span
                      key={item}
                      className={`border-b pb-px ${
                        stack.onDark
                          ? "border-white/10 text-white"
                          : "border-black/10 text-black"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </li>
            );
          })}

          <StepRing total={TECH_STACKS.length} />
        </ul>
      </div>
    </section>
  );
}
