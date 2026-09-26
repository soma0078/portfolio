import { useRef, useState } from "react";
import type { ShotItem } from "@constants/projectDetails";
import GalleryLightbox from "./GalleryLightbox";
import HoverEye from "./HoverEye";
import ANALYTICS_EVENTS from "@constants/analyticsEvents";
import CLICK_LOCATIONS from "@constants/clickLocations";
import { trackEvent } from "src/utils/analytics";

const ARROW = [
  "absolute top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full",
  "bg-ink/55 text-white backdrop-blur-sm transition-all duration-300",
  "hover:bg-ink/75 disabled:pointer-events-none disabled:opacity-0",
  "opacity-0 group-hover:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100",
].join(" ");

const SWIPE_THRESHOLD = 50;

interface HeroSliderProps {
  shots: ShotItem[];
}

export default function HeroSlider({ shots }: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const [popover, setPopover] = useState<number | null>(null);
  const dragFrom = useRef<number | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const clamp = (next: number) => Math.min(Math.max(next, 0), shots.length - 1);
  const move = (step: number) => setIndex((current) => clamp(current + step));

  const handleDragEnd = (clientX: number) => {
    if (dragFrom.current === null) return;

    const moved = clientX - dragFrom.current;
    dragFrom.current = null;
    if (Math.abs(moved) < SWIPE_THRESHOLD) return;

    move(moved < 0 ? 1 : -1);
  };

  return (
    <div className="w-full">
      <div
        ref={frameRef}
        className="group relative overflow-hidden rounded-xl bg-surface dark:bg-white/5"
        onPointerDown={(event) => {
          dragFrom.current = event.clientX;
        }}
        onPointerUp={(event) => handleDragEnd(event.clientX)}
        onPointerCancel={() => {
          dragFrom.current = null;
        }}
      >
        <div
          className="flex transition-transform duration-400 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {shots.map((shot, order) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => {
                trackEvent(ANALYTICS_EVENTS.galleryCardClick, {
                  item_id: shot.src,
                  item_name: shot.name,
                  click_location: CLICK_LOCATIONS.projectHeroSlider,
                });
                setPopover(order);
              }}
              tabIndex={order === index ? 0 : -1}
              aria-label={`${shot.name} 화면 크게 보기`}
              className="w-full shrink-0 cursor-pointer"
            >
              <img
                src={shot.src}
                alt={`${shot.name} 화면`}
                loading={order === 0 ? "eager" : "lazy"}
                draggable={false}
                className="aspect-video w-full object-cover object-top"
              />
            </button>
          ))}
        </div>

        <HoverEye areaRef={frameRef} />

        {shots.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => {
                trackEvent(ANALYTICS_EVENTS.galleryNavClick, {
                  direction: "prev",
                  click_location: CLICK_LOCATIONS.projectHeroSlider,
                });
                move(-1);
              }}
              disabled={index === 0}
              aria-label="이전 화면"
              className={`${ARROW} left-3`}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => {
                trackEvent(ANALYTICS_EVENTS.galleryNavClick, {
                  direction: "next",
                  click_location: CLICK_LOCATIONS.projectHeroSlider,
                });
                move(1);
              }}
              disabled={index === shots.length - 1}
              aria-label="다음 화면"
              className={`${ARROW} right-3`}
            >
              →
            </button>

            <span className="absolute right-3 bottom-3 rounded-full bg-ink/55 px-2.5 py-1 text-xs tracking-[1px] text-white backdrop-blur-sm">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(shots.length).padStart(2, "0")}
            </span>
          </>
        )}
      </div>

      <div className="flex flex-wrap items-baseline gap-2.5 px-1 pt-3">
        <span className="text-sm font-bold">{shots[index].name}</span>
        <span className="text-xs tracking-[0.8px] text-[#9a9488] dark:text-[#8a8a9a]">
          {shots[index].note}
        </span>
      </div>

      {popover !== null && (
        <GalleryLightbox
          items={shots.map((shot) => ({ id: shot.src, src: shot.src, shot }))}
          index={popover}
          onMove={(step) =>
            setPopover((current) =>
              current === null ? current : clamp(current + step),
            )
          }
          onClose={() => setPopover(null)}
        />
      )}
    </div>
  );
}
