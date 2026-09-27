import { useRef, useState } from "react";
import gsap, { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { STACK_HEIGHT, STACK_OFFSET, TECH_STACKS } from "@constants/about";
import { PAGE_GUTTER_X, PAGE_MAX_WIDTH } from "@constants/layout";

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

function StepRing({ total }: { total: number }) {
  const center = RING_SIZE / 2;

  return (
    <div
      aria-hidden
      className="js-stack-ring-root absolute z-10 text-black"
      style={{
        top: LAST_INDEX * STACK_OFFSET + 24,
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

      <span className="absolute inset-0 flex items-center justify-center  text-xs font-medium">
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
          className="relative w-full overflow-hidden rounded-[28px]"
          style={{ height: STACK_HEIGHT }}
        >
          {TECH_STACKS.map((stack, index) => {
            const active = index === activeIndex;

            return (
              <li
                key={stack.title}
                className="js-stack-card absolute inset-x-0 flex flex-col justify-between overflow-hidden rounded-[28px] p-6"
                style={{
                  top: index * STACK_OFFSET,
                  height: "100%",
                  paddingBottom: CARD_PADDING + index * STACK_OFFSET,
                  backgroundColor: stack.color,
                  zIndex: active ? TECH_STACKS.length : index,
                }}
              >
                <h3
                  className={`w-full text-xl font-semibold ${
                    stack.onDark ? "text-white" : "text-black"
                  }`}
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

                <div className="flex w-full flex-col gap-1">
                  {stack.items.map((item) => (
                    <span
                      key={item}
                      className={`border-b pb-px text-sm ${
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
