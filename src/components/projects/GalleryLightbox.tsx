import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ScrollSmoother } from "gsap/all";
import type { ShotItem } from "@constants/projectDetails";

const ARROW = [
  "pointer-events-auto absolute top-1/2 z-1 flex size-11 -translate-y-1/2 items-center justify-center",
  "rounded-full bg-white/12 text-xl text-white backdrop-blur-sm",
  "transition-colors duration-300 hover:bg-white/24",
  "disabled:pointer-events-none disabled:opacity-0",
].join(" ");

const SWIPE_THRESHOLD = 60;

interface GalleryLightboxProps {
  shots: ShotItem[];
  index: number;
  onMove: (step: number) => void;
  onClose: () => void;
}

export default function GalleryLightbox({
  shots,
  index,
  onMove,
  onClose,
}: GalleryLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dragFrom = useRef<number | null>(null);
  const frames = useRef<(HTMLDivElement | null)[]>([]);

  const [overflows, setOverflows] = useState(false);
  const [nudged, setNudged] = useState(false);

  const shot = shots[index];
  const first = index === 0;
  const last = index === shots.length - 1;

  const measure = useCallback(() => {
    const frame = frames.current[index];
    setOverflows(!!frame && frame.scrollHeight - frame.clientHeight > 8);
  }, [index]);

  useEffect(() => {
    measure();
    setNudged(false);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onMove(-1);
      if (event.key === "ArrowRight") onMove(1);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onMove]);

  useEffect(() => {
    closeRef.current?.focus();

    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.paused(true);
      return () => smoother.paused(false);
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const handleDragEnd = (clientX: number) => {
    if (dragFrom.current === null) return;

    const moved = clientX - dragFrom.current;
    dragFrom.current = null;
    if (Math.abs(moved) < SWIPE_THRESHOLD) return;

    onMove(moved < 0 ? 1 : -1);
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal
      aria-label={`${shot.name} 화면`}
      className="fixed inset-0 z-999 flex flex-col bg-ink/95 backdrop-blur-sm"
    >
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer"
      />

      <div className="pointer-events-none relative z-1 flex items-center justify-between px-5 py-4 text-white lg:px-8">
        <span className="text-xs tracking-[1.4px] text-white/60">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(shots.length).padStart(2, "0")}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="pointer-events-auto flex size-9 items-center justify-center rounded-full bg-white/12 text-lg transition-colors duration-300 hover:bg-white/24"
        >
          ✕
        </button>
      </div>

      <div className="pointer-events-none relative z-1 flex min-h-0 flex-1 items-stretch">
        <button
          type="button"
          onClick={() => onMove(-1)}
          disabled={first}
          aria-label="이전 화면"
          className={`${ARROW} left-3 lg:left-6`}
        >
          ←
        </button>

        <div
          className="w-full overflow-hidden"
          onPointerDown={(event) => {
            dragFrom.current = event.clientX;
          }}
          onPointerUp={(event) => handleDragEnd(event.clientX)}
          onPointerCancel={() => {
            dragFrom.current = null;
          }}
        >
          <div
            className="flex h-full transition-transform duration-400 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {shots.map((item, order) => (
              <div
                key={item.src}
                className="flex h-full w-full shrink-0 items-center justify-center px-4 lg:px-20"
              >
                <div
                  ref={(element) => {
                    frames.current[order] = element;
                  }}
                  onScroll={(event) => {
                    if (order === index && event.currentTarget.scrollTop > 24) {
                      setNudged(true);
                    }
                  }}
                  className="pointer-events-auto max-h-full w-full max-w-[980px] overflow-y-auto rounded-xl bg-white/6"
                >
                  <img
                    src={item.src}
                    alt={`${item.name} 화면`}
                    className="block w-full"
                    draggable={false}
                    onLoad={measure}
                  />

                  {order === index && overflows && (
                    <div className="sticky bottom-0 z-1 h-0">
                      <span
                        className={`absolute bottom-4 left-1/2 flex size-9 -translate-x-1/2 items-center justify-center rounded-full bg-ink/70 text-white ring-1 ring-white/20 backdrop-blur-sm transition-opacity duration-300 ${
                          nudged
                            ? "opacity-0"
                            : "animate-bounce opacity-100 motion-reduce:animate-none"
                        }`}
                      >
                        ↓
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onMove(1)}
          disabled={last}
          aria-label="다음 화면"
          className={`${ARROW} right-3 lg:right-6`}
        >
          →
        </button>
      </div>

      <div className="pointer-events-none relative z-1 flex flex-col items-start gap-2 px-5 py-5 text-white lg:px-20 lg:py-6">
        <div className="pointer-events-auto flex flex-wrap items-baseline gap-3">
          <span className="text-base font-bold">{shot.name}</span>
          <span className="text-xs tracking-[0.8px] text-white/50">
            {shot.note}
          </span>
        </div>

        {shot.summary && (
          <p className="pointer-events-auto max-w-[820px] text-sm leading-6 text-white/75">
            {shot.summary}
          </p>
        )}

        {shot.href && (
          <a
            href={shot.href}
            target="_blank"
            rel="noreferrer noopener"
            className="pointer-events-auto mt-1 rounded-full bg-white px-4 py-2 text-sm font-bold text-ink transition-colors duration-300 hover:bg-[#e2e2ea]"
          >
            사이트 보기 ↗
          </a>
        )}
      </div>
    </div>,
    document.body,
  );
}
