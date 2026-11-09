import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

interface WorkOverlayProps {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}

// 상세 이미지를 화면 가운데에 확대해 띄운다. 세로가 넘치면 이미지 안에서 스크롤한다
export default function WorkOverlay({ src, alt, open, onClose }: WorkOverlayProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  // 닫힘 애니메이션이 끝날 때까지 유지한다
  const [mounted, setMounted] = useState(false);

  if (open && !mounted) setMounted(true);

  useEffect(() => {
    const root = rootRef.current;
    const paper = paperRef.current;
    if (!mounted || !root || !paper) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf([root, paper]);

    if (open) {
      if (reduce) return;
      gsap.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
      gsap.fromTo(
        paper,
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" },
      );
      return;
    }

    if (reduce) {
      setMounted(false);
      return;
    }
    gsap.to(paper, { opacity: 0, y: 14, scale: 0.98, duration: 0.24, ease: "power2.in" });
    gsap.to(root, {
      opacity: 0,
      duration: 0.24,
      ease: "power2.in",
      onComplete: () => setMounted(false),
    });
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={rootRef}
      role="dialog"
      aria-modal
      aria-label={`${alt} 크게 보기`}
      onClick={onClose}
      className="fixed inset-0 z-1000 flex cursor-pointer items-center justify-center bg-black/55 p-6"
      style={{ pointerEvents: open ? "auto" : "none" }}
    >
      <div
        ref={paperRef}
        className="max-h-[90vh] w-full max-w-[800px] overflow-y-auto overscroll-contain bg-white shadow-xl"
      >
        <img src={src} alt={alt} draggable={false} className="block h-auto w-full" />
      </div>
    </div>,
    document.body,
  );
}
