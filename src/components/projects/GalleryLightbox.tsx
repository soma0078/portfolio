import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/all";
import type { GalleryEntry } from "@constants/publishing";
import CaseSheet from "./CaseSheet";

const ARROW = [
  "pointer-events-auto absolute top-1/2 z-1 flex size-11 -translate-y-1/2 items-center justify-center",
  "rounded-full bg-white/12 text-xl text-white backdrop-blur-sm",
  "transition-colors duration-300 hover:bg-white/24",
  "disabled:pointer-events-none disabled:opacity-0",
].join(" ");


const SWIPE_THRESHOLD = 60;

interface GalleryLightboxProps {
  items: GalleryEntry[];
  index: number;
  onMove: (step: number) => void;
  onClose: () => void;
}

export default function GalleryLightbox({
  items,
  index,
  onMove,
  onClose,
}: GalleryLightboxProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dragFrom = useRef<number | null>(null);
  const frames = useRef<(HTMLDivElement | null)[]>([]);
  const [overflows, setOverflows] = useState(false);
  const [nudged, setNudged] = useState(false);

  const item = items[index];
  const first = index === 0;
  const last = index === items.length - 1;

  const measure = useCallback(() => {
    const frame = frames.current[index];
    setOverflows(!!frame && frame.scrollHeight - frame.clientHeight > 8);
  }, [index]);

  useEffect(() => {
    measure();
    setNudged(false);

    const frame = frames.current[index];
    if (!frame) return;

    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    if (frame.firstElementChild) observer.observe(frame.firstElementChild);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, index]);

  const requestClose = useCallback(() => {
    if (closing.current) return;
    closing.current = true;

    const root = rootRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!root || reduced.matches) {
      onClose();
      return;
    }

    gsap
      .timeline({ onComplete: onClose })
      .to(
        root.querySelector(".js-lb-body"),
        { opacity: 0, y: 14, scale: 0.99, duration: 0.24, ease: "power2.in" },
        0,
      )
      .to(
        root.querySelector(".js-lb-top"),
        { opacity: 0, y: -8, duration: 0.2, ease: "power2.in" },
        0,
      )
      .to(root, { opacity: 0, duration: 0.22, ease: "power2.in" }, 0.08);
  }, [onClose]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
      if (event.key === "ArrowLeft") onMove(-1);
      if (event.key === "ArrowRight") onMove(1);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [requestClose, onMove]);

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


  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline();

        timeline
          .from(
            rootRef.current,
            { opacity: 0, duration: 0.22, ease: "power2.out" },
            0,
          )
          .from(
            ".js-lb-body",
            {
              opacity: 0,
              y: 20,
              scale: 0.985,
              transformOrigin: "center center",
              duration: 0.52,
              ease: "power3.out",
            },
            0.05,
          )
          .from(
            ".js-lb-top",
            { opacity: 0, y: -10, duration: 0.34, ease: "power2.out" },
            0.14,
          );

        return () => timeline.kill();
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const handleDragEnd = (clientX: number) => {
    if (dragFrom.current === null) return;

    const moved = clientX - dragFrom.current;
    dragFrom.current = null;
    if (Math.abs(moved) < SWIPE_THRESHOLD) return;

    onMove(moved < 0 ? 1 : -1);
  };

  return createPortal(
    <div
      ref={rootRef}
      role="dialog"
      aria-modal
      aria-label={`${item.shot?.name ?? `${item.year}년 작업`} 화면`}
      className="fixed inset-0 z-999 flex flex-col bg-ink/95 backdrop-blur-sm"
    >
      <button
        type="button"
        aria-label="닫기"
        onClick={requestClose}
        className="absolute inset-0 cursor-pointer"
      />
      <div className="js-lb-top pointer-events-none relative z-1 flex items-center justify-between px-5 py-4 text-white lg:px-8">
        <span className="text-xs tracking-[1.4px] text-white/60">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={requestClose}
          aria-label="닫기"
          className="pointer-events-auto flex size-9 items-center justify-center rounded-full bg-white/12 text-lg transition-colors duration-300 hover:bg-white/24"
        >
          ✕
        </button>
      </div>

      <div className="js-lb-body pointer-events-none relative z-1 flex min-h-0 flex-1 items-stretch">
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
            {items.map((entry, order) => (
              <div
                key={entry.id}
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
                  className="pointer-events-auto max-h-full w-full max-w-[980px] overflow-y-auto"
                >
                  <CaseSheet item={entry} />

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
    </div>,
    document.body,
  );
}
