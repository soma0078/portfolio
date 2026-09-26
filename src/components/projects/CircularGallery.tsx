import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { GalleryEntry } from "@constants/publishing";
import useMediaQuery from "@hooks/useMediaQuery";
import ANALYTICS_EVENTS from "@constants/analyticsEvents";
import CLICK_LOCATIONS from "@constants/clickLocations";
import { trackEvent } from "src/utils/analytics";

const WIDE = "(min-width: 768px)";
const VISIBLE_WIDE = 5;
const VISIBLE_NARROW = 2.5;

const GAP = 24;

const DRAG_SLOP = 6;

const FLICK = 90;

const GLIDE_SECONDS = 1.15;
const GLIDE_EASE = "power4.out";

const ARC_DROP = 18;
const ARC_TILT = 3;
const ARC_SHRINK = 0.06;

const mod = (value: number, size: number) => ((value % size) + size) % size;

interface CircularGalleryProps {
  items: GalleryEntry[];
  onPick: (index: number) => void;
}

export default function CircularGallery({
  items,
  onPick,
}: CircularGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLLIElement | null)[]>([]);

  const wide = useMediaQuery(WIDE);
  const visible = wide ? VISIBLE_WIDE : VISIBLE_NARROW;

  const offset = useRef(0);
  const grab = useRef<{ x: number; from: number; at: number } | null>(null);
  const speed = useRef(0);
  const moved = useRef(0);

  const [step, setStep] = useState(0);
  const [rowHeight, setRowHeight] = useState(0);
  const [grabbing, setGrabbing] = useState(false);

  const canLoop = items.length > visible;
  const copies = canLoop
    ? Math.max(2, Math.ceil((visible + 3) / items.length))
    : 1;
  const slides = Array.from({ length: items.length * copies }, (_, i) => i);
  const count = slides.length;

  const place = useCallback(() => {
    if (!step) return;
    const span = count * step;

    const width = step * visible;
    const hold = ((visible - count) * step) / 2;

    cardsRef.current.slice(0, count).forEach((card, i) => {
      if (!card) return;
      const x = canLoop
        ? mod(i * step + offset.current + step, span) - step
        : i * step + hold;

      const away = (x + step / 2 - width / 2) / (width / 2);
      const drop = ARC_DROP * away * away;
      const scale = 1 - ARC_SHRINK * away * away;

      card.style.transform = `translate3d(${x}px, ${drop}px, 0) rotate(${
        ARC_TILT * away
      }deg) scale(${scale})`;
    });
  }, [step, count, visible, canLoop]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const measure = () => setStep(root.clientWidth / visible);

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    const card = cardsRef.current[0];
    if (!card) return;

    const observer = new ResizeObserver(() => setRowHeight(card.offsetHeight));
    observer.observe(card);
    return () => observer.disconnect();
  }, [step]);

  useEffect(() => {
    place();
  }, [place]);

  const glideTo = (target: number) => {
    gsap.killTweensOf(offset);
    gsap.to(offset, {
      current: target,
      duration: GLIDE_SECONDS,
      ease: GLIDE_EASE,
      onUpdate: place,
    });
  };

  const onPointerDown = (event: React.PointerEvent) => {
    if (!canLoop) return;

    gsap.killTweensOf(offset);
    grab.current = {
      x: event.clientX,
      from: offset.current,
      at: event.timeStamp,
    };
    speed.current = 0;
    moved.current = 0;
    setGrabbing(true);
  };

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const held = grab.current;
      if (!held) return;

      const next = held.from + (event.clientX - held.x);
      const elapsed = event.timeStamp - held.at;
      if (elapsed > 0) speed.current = (next - offset.current) / elapsed;

      moved.current = Math.max(moved.current, Math.abs(event.clientX - held.x));
      offset.current = next;
      grab.current = { ...held, at: event.timeStamp };
      place();
    };

    const onUp = () => {
      if (!grab.current) return;
      grab.current = null;
      setGrabbing(false);

      const drift = offset.current + speed.current * FLICK;
      gsap.killTweensOf(offset);
      gsap.to(offset, {
        current: Math.round(drift / step) * step,
        duration: GLIDE_SECONDS,
        ease: GLIDE_EASE,
        onUpdate: place,
      });
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [place, step]);

  const nudge = (direction: -1 | 1) =>
    glideTo(Math.round(offset.current / step) * step - direction * step);

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={rootRef}
        onPointerDown={onPointerDown}
        role="region"
        aria-label={
          canLoop
            ? "작업한 사이트 목록. 좌우로 밀어 볼 수 있습니다"
            : "작업한 사이트 목록"
        }
        className={`relative -mr-5 touch-pan-y overflow-hidden select-none lg:-mr-10 ${
          canLoop ? (grabbing ? "cursor-grabbing" : "cursor-grab") : ""
        }`}
        style={{ height: rowHeight ? rowHeight + ARC_DROP : undefined }}
      >
        <ul className="absolute inset-0">
          {slides.map((slide, i) => {
            const item = items[slide % items.length];

            return (
              <li
                key={slide}
                ref={(element) => {
                  cardsRef.current[i] = element;
                }}
                className="absolute top-0 left-0 will-change-transform"
                style={{ width: step ? step - GAP : undefined }}
                aria-hidden={i >= items.length}
              >
                <button
                  type="button"
                  tabIndex={i >= items.length ? -1 : undefined}
                  onClick={() => {
                    if (moved.current > DRAG_SLOP) return;
                    const picked = items[slide % items.length];
                    trackEvent(ANALYTICS_EVENTS.galleryCardClick, {
                      item_id: picked.id,
                      item_name: picked.shot?.name ?? String(picked.year ?? ""),
                      click_location: CLICK_LOCATIONS.projectCircularGallery,
                    });
                    onPick(slide % items.length);
                  }}
                  className="w-full"
                >
                  <WorkCard item={item} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center gap-2">
        {(["prev", "next"] as const).map((side) => (
          <button
            key={side}
            type="button"
            onClick={() => {
              trackEvent(ANALYTICS_EVENTS.galleryNavClick, {
                direction: side,
                click_location: CLICK_LOCATIONS.projectCircularGallery,
              });
              nudge(side === "prev" ? -1 : 1);
            }}
            disabled={!canLoop}
            aria-label={side === "prev" ? "이전 사이트" : "다음 사이트"}
            className="flex size-9 items-center justify-center rounded-full ring-1 ring-black/12 transition-colors duration-300 hover:bg-surface disabled:pointer-events-none disabled:opacity-35 dark:ring-white/20 dark:hover:bg-white/8"
          >
            <span aria-hidden>{side === "prev" ? "←" : "→"}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function WorkCard({ item }: { item: GalleryEntry }) {
  return (
    <span className="group flex w-full flex-col gap-2.5 text-left">
      <span className="relative block overflow-hidden rounded-[18px] bg-surface dark:bg-white/5">
        <img
          src={item.src}
          alt={item.shot?.name ?? `${item.year ?? ""}년 작업`}
          loading="lazy"
          draggable={false}
          className="aspect-5/6 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </span>
      <span className="flex flex-col gap-1">
        <span className="truncate text-sm font-bold">
          {item.shot ? (
            <span className="link-underline">{item.shot.name}</span>
          ) : (
            <span className="text-[#9a9488] dark:text-[#8a8a9a]">
              {item.year}
            </span>
          )}
        </span>
        {item.shot && (
          <span className="truncate text-xs tracking-[0.8px] text-[#9a9488] dark:text-[#8a8a9a]">
            {item.shot.note}
          </span>
        )}
      </span>
    </span>
  );
}
