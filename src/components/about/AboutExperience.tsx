import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  EXPERIENCE_COLUMNS,
  EXPERIENCE_NOTE,
  EXP_COLUMN_HEIGHT,
  EXP_MOBILE_NOTE_HEIGHT,
  EXP_MOBILE_SHOT_HEIGHT,
  EXP_MOBILE_TEXT_HEIGHT,
  EXP_SHOT_HEIGHT,
  EXP_TEXT_HEIGHT,
  type ExperienceItem,
  type NoteItem,
  type RoleItem,
  type ShotItem,
} from "@constants/about";
import useMediaQuery from "@hooks/useMediaQuery";
import SectionHeader from "./SectionHeader";
import { PAGE_GUTTER_X, PAGE_MAX_WIDTH } from "@constants/layout";

const TRACK_LAYOUT = "(min-width: 768px)";

const COLUMN_WIDTH = [
  "w-[max(200px,calc((100%_-_42px)*2/5))]",
  "xl:w-[max(200px,calc((100%_-_56px)*2/7))]",
].join(" ");

function Shot({ item, mobile }: { item: ShotItem; mobile?: boolean }) {
  return (
    <div
      className="flex w-full shrink-0 items-center justify-center overflow-hidden rounded-[28px]"
      style={{
        backgroundColor: item.tone ?? "#efece4",
        height: mobile ? EXP_MOBILE_SHOT_HEIGHT : EXP_SHOT_HEIGHT,
      }}
    >
      {item.src ? (
        <img
          src={item.src}
          alt={item.label}
          loading="lazy"
          className="size-full rounded-[22px] object-cover"
        />
      ) : (
        <span className="text-center text-xs text-[#7d7869]">
          [ {item.label} ]
        </span>
      )}
    </div>
  );
}

function Note({ item, mobile }: { item: NoteItem; mobile?: boolean }) {
  return (
    <div
      className={`flex w-full shrink-0 flex-col justify-end gap-1.5 overflow-hidden rounded-[28px] px-6 py-5 ${
        mobile ? "" : "flex-1"
      }`}
      style={{
        backgroundColor: item.color,
        height: mobile ? EXP_MOBILE_NOTE_HEIGHT : undefined,
        minHeight: mobile ? undefined : EXP_COLUMN_HEIGHT,
      }}
    >
      <h3 className="text-2xl leading-8 font-bold tracking-[-0.3px] text-white">
        {item.title}
      </h3>
      <p className="text-base leading-7 text-white/80">{item.body}</p>
    </div>
  );
}

function Role({ item, mobile }: { item: RoleItem; mobile?: boolean }) {
  return (
    <div
      className="flex w-full shrink-0 flex-1 flex-col gap-[9px] rounded-[28px] px-6 py-5"
      style={{
        backgroundColor: item.color,
        minHeight: mobile ? EXP_MOBILE_TEXT_HEIGHT : EXP_TEXT_HEIGHT,
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-white">{item.date}</span>
        <span className="text-sm tracking-[1.2px] text-white/55">
          {item.tag}
        </span>
      </div>

      <h3 className="text-lg leading-7 font-bold tracking-[-0.2px] text-white">
        {item.title}
      </h3>
      <p className="text-base font-medium text-white/72">{item.org}</p>

      {item.role && (
        <p className="text-base leading-6.5 text-white/82">{item.role}</p>
      )}

      {item.stack && (
        <p className="mt-auto text-xs leading-[18px] tracking-[0.6px] text-white/60">
          {item.stack}
        </p>
      )}
    </div>
  );
}

function Item({ item, mobile }: { item: ExperienceItem; mobile?: boolean }) {
  if (item.kind === "shot") return <Shot item={item} mobile={mobile} />;
  if (item.kind === "note") return <Note item={item} mobile={mobile} />;
  return <Role item={item} mobile={mobile} />;
}

const VISIBLE_COLUMNS = 4;
const EDGE_SLACK = 1;

function wheelPixels(event: WheelEvent, viewport: number) {
  if (event.deltaMode === 1) return event.deltaY * 16;
  if (event.deltaMode === 2) return event.deltaY * viewport;
  return event.deltaY;
}

function pinTrack(
  block: HTMLElement,
  viewport: HTMLElement,
  track: HTMLElement,
) {
  const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

  viewport.scrollLeft = 0;
  viewport.style.overflowX = "hidden";

  const extras = gsap.utils
    .toArray<HTMLElement>(".js-exp-col", track)
    .slice(VISIBLE_COLUMNS);

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: block,
      start: () =>
        `top ${Math.max(0, (window.innerHeight - block.offsetHeight) / 2)}px`,
      end: () => `+=${Math.max(1, distance())}`,
      pin: true,
      anticipatePin: 1,
      // 스크롤을 조금 늦게 따라오게 해서 휠 한 칸이 툭 끊기지 않는다
      scrub: 0.6,
      // 창 크기가 바뀌면 위 함수들을 다시 재도록 한다
      invalidateOnRefresh: true,
    },
  });

  timeline.to(track, { x: () => -distance(), ease: "none" }, 0);
  timeline.fromTo(extras, { opacity: 0.35 }, { opacity: 1, ease: "none" }, 0);

  return () => {
    timeline.scrollTrigger?.kill();
    timeline.kill();
    viewport.style.overflowX = "";
    gsap.set([track, ...extras], { clearProps: "opacity,transform" });
  };
}

function bindWheel(viewport: HTMLElement, smooth: boolean) {
  const extras = gsap.utils
    .toArray<HTMLElement>(".js-exp-col", viewport)
    .slice(VISIBLE_COLUMNS);

  const state = { x: viewport.scrollLeft };

  const glide = gsap.quickTo(state, "x", {
    duration: 0.65,
    ease: "power3.out",
    onUpdate: () => {
      viewport.scrollLeft = state.x;
    },
  });

  const onWheel = (event: WheelEvent) => {
    const max = viewport.scrollWidth - viewport.clientWidth;

    // 밀 여지가 없거나(열이 다 보임) 트랙패드 가로 제스처면 브라우저에 맡긴다
    if (max <= 0 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

    // 굴러가는 중이면 그 목표에서, 아니면 사용자가 놔둔 자리에서 이어 간다
    const from = glide.tween?.isActive() ? state.x : viewport.scrollLeft;
    const next = gsap.utils.clamp(
      0,
      max,
      from + wheelPixels(event, viewport.clientWidth),
    );

    if (Math.abs(next - from) < EDGE_SLACK) return;

    event.preventDefault();

    if (!smooth) {
      state.x = next;
      viewport.scrollLeft = next;
      return;
    }

    state.x = from;
    glide(next);
  };

  const setters = extras.map((column) => gsap.quickSetter(column, "opacity"));
  let frame = 0;

  const paint = () => {
    frame = 0;
    const max = viewport.scrollWidth - viewport.clientWidth;
    const progress = max > 0 ? Math.min(1, viewport.scrollLeft / max) : 1;
    setters.forEach((set) => set(0.35 + 0.65 * progress));
  };

  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(paint);
  };

  paint();
  viewport.addEventListener("wheel", onWheel, { passive: false });
  viewport.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  return () => {
    if (frame) cancelAnimationFrame(frame);
    viewport.removeEventListener("wheel", onWheel);
    viewport.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    glide.tween?.kill();
    gsap.set(extras, { clearProps: "opacity" });
  };
}

function DesktopTrack() {
  const blockRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const block = blockRef.current;
      const scroller = scrollerRef.current;
      const track = trackRef.current;
      if (!block || !scroller || !track) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          pinned: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (context.conditions?.pinned)
            return pinTrack(block, scroller, track);
          return bindWheel(scroller, false);
        },
      );

      return () => mm.revert();
    },
    { scope: blockRef },
  );

  return (
    <div ref={blockRef} className="flex flex-col gap-9">
      <div className={`${PAGE_MAX_WIDTH} ${PAGE_GUTTER_X}`}>
        <SectionHeader title="Career Details" />
      </div>
      <div
        ref={scrollerRef}
        tabIndex={0}
        role="region"
        aria-label="경력·학력 카드 목록. 좌우로 스크롤할 수 있습니다"
        className="overflow-x-auto overscroll-x-contain outline-none"
      >
        <ul
          ref={trackRef}
          className="flex w-full items-stretch gap-3.5 py-7 pl-5 lg:pl-[max(2.5rem,calc((100%-var(--page-max-width))/2+2.5rem))]"
        >
          <li
            className={`js-exp-col flex shrink-0 flex-col items-start gap-2 ${COLUMN_WIDTH}`}
          >
            <Item item={EXPERIENCE_NOTE} />
          </li>

          {EXPERIENCE_COLUMNS.map((column, index) => (
            <li
              key={index}
              className={`js-exp-col flex shrink-0 flex-col items-start gap-2 ${COLUMN_WIDTH}`}
            >
              {column.map((item) => (
                <Item
                  key={item.kind === "shot" ? item.label : item.title}
                  item={item}
                />
              ))}
            </li>
          ))}

          <li aria-hidden className="-ml-3.5 w-5 shrink-0 lg:w-10">
            <span className="block h-px w-full" />
          </li>
        </ul>
      </div>
    </div>
  );
}

function SlideButton({
  side,
  disabled,
  onClick,
}: {
  side: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const prev = side === "prev";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={prev ? "이전 경력" : "다음 경력"}
      className="absolute z-10 -translate-y-1/2 text-2xl leading-none text-ink transition-opacity disabled:opacity-25 dark:text-white"
      style={{ top: EXP_MOBILE_TEXT_HEIGHT, [prev ? "left" : "right"]: 4 }}
    >
      <span aria-hidden>{prev ? "←" : "→"}</span>
    </button>
  );
}

function MobileSlider() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const last = EXPERIENCE_COLUMNS.length - 1;

  const goTo = (next: number) => {
    const track = trackRef.current;
    if (!track) return;

    const clamped = Math.max(0, Math.min(last, next));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
    setIndex(clamped);
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="px-5">
        <SectionHeader title="Experience" />
      </div>

      <div className="flex flex-col gap-3.5 px-5">
        <Item item={EXPERIENCE_NOTE} mobile />
      </div>

      <div className="relative pb-7">
        <ul
          ref={trackRef}
          onScroll={onScroll}
          tabIndex={0}
          role="region"
          aria-label="경력·학력 카드 목록. 좌우로 넘겨 볼 수 있습니다"
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {EXPERIENCE_COLUMNS.map((column, columnIndex) => (
            <li
              key={columnIndex}
              aria-label={`${columnIndex + 1} / ${EXPERIENCE_COLUMNS.length}`}
              className="flex w-full shrink-0 snap-center flex-col items-start gap-3.5 px-5"
            >
              {[...column]
                .sort(
                  (a, b) =>
                    Number(a.kind === "shot") - Number(b.kind === "shot"),
                )
                .map((item) => (
                  <Item
                    key={item.kind === "shot" ? item.label : item.title}
                    item={item}
                    mobile
                  />
                ))}
            </li>
          ))}
        </ul>

        <SlideButton
          side="prev"
          disabled={index === 0}
          onClick={() => goTo(index - 1)}
        />
        <SlideButton
          side="next"
          disabled={index === last}
          onClick={() => goTo(index + 1)}
        />
      </div>
    </div>
  );
}

export default function AboutExperience() {
  const isTrackLayout = useMediaQuery(TRACK_LAYOUT);

  return (
    <section id="experience">
      {isTrackLayout ? <DesktopTrack /> : <MobileSlider />}
    </section>
  );
}
