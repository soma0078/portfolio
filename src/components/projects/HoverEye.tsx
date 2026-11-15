import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LuEye } from "react-icons/lu";

const SIZE = 40;

const OFFSET = 26;

const FOLLOW = 0.45;

// 감지 영역은 부모 요소다. 부모의 ref는 자식 effect보다 늦게 붙어 첫 마운트에 null이므로 받지 않는다
export default function HoverEye() {
  const eyeRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const eye = eyeRef.current;
      const area = eye?.parentElement;
      if (!eye || !area) return;
      if (window.matchMedia("(hover: none)").matches) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const follow = reduced ? 0 : FOLLOW;

      gsap.set(eye, { xPercent: -50, yPercent: -50, scale: 0 });

      const toX = gsap.quickTo(eye, "x", { duration: follow, ease: "power3" });
      const toY = gsap.quickTo(eye, "y", { duration: follow, ease: "power3" });

      const spot = (event: PointerEvent) => {
        const bounds = area.getBoundingClientRect();
        return {
          x: event.clientX - bounds.left + OFFSET,
          y: event.clientY - bounds.top + OFFSET,
        };
      };

      const enter = (event: PointerEvent) => {
        const { x, y } = spot(event);
        gsap.set(eye, { x, y });
        gsap.to(eye, {
          scale: 1,
          duration: reduced ? 0 : 0.34,
          ease: "back.out(1.7)",
        });
      };

      const move = (event: PointerEvent) => {
        const { x, y } = spot(event);
        toX(x);
        toY(y);
      };

      const leave = () => {
        gsap.to(eye, {
          scale: 0,
          duration: reduced ? 0 : 0.26,
          ease: "power2.in",
        });
      };

      area.addEventListener("pointerenter", enter);
      area.addEventListener("pointermove", move);
      area.addEventListener("pointerleave", leave);

      return () => {
        area.removeEventListener("pointerenter", enter);
        area.removeEventListener("pointermove", move);
        area.removeEventListener("pointerleave", leave);
      };
    },
    { scope: eyeRef },
  );

  return (
    <span
      ref={eyeRef}
      aria-hidden
      // effect가 돌기 전이나 호버가 없는 기기에서도 보이지 않도록 처음부터 접어 둔다
      style={{ width: SIZE, height: SIZE, transform: "scale(0)" }}
      className="pointer-events-none absolute top-0 left-0 z-1 flex items-center justify-center rounded-full bg-ink/85 text-white ring-1 ring-white/20 backdrop-blur-sm"
    >
      <LuEye size={18} />
    </span>
  );
}
