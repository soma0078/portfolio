import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, select, textarea, summary";

function isDarkBackground(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  const contrast = target
    .closest("[data-cursor-zone]")
    ?.getAttribute("data-cursor-zone");

  if (contrast) {
    return contrast === "light";
  }

  if (target.closest("img, picture, video")) {
    return document.documentElement.classList.contains("dark");
  }

  let element: Element | null = target;
  while (element) {
    const className = element.getAttribute("class") ?? "";
    if (/(?:^|\s)bg-(?:ink|black|night)(?:[\s/]|$)/.test(className)) {
      return true;
    }

    const backgroundColor = getComputedStyle(element).backgroundColor;
    const match = backgroundColor.match(
      /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:\s*[,/]\s*([\d.]+))?\s*\)/,
    );

    if (match && Number(match[4] ?? 1) > 0) {
      const [red, green, blue] = match.slice(1, 4).map(Number);
      const luminance = (red * 299 + green * 587 + blue * 114) / 255000;
      return luminance < 0.5;
    }

    element = element.parentElement;
  }

  return false;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLSpanElement>(null);
  const followerRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const followerPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const updateCursorPosition = () => {
      const { x, y } = positionRef.current;
      const followerPosition = followerPositionRef.current;

      followerPosition.x += (x - followerPosition.x) * 0.14;
      followerPosition.y += (y - followerPosition.y) * 0.14;

      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      follower.style.setProperty("--follower-x", `${followerPosition.x}px`);
      follower.style.setProperty("--follower-y", `${followerPosition.y}px`);

      if (
        Math.abs(x - followerPosition.x) > 0.1 ||
        Math.abs(y - followerPosition.y) > 0.1
      ) {
        frameRef.current = requestAnimationFrame(updateCursorPosition);
      } else {
        frameRef.current = null;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      positionRef.current = { x: event.clientX, y: event.clientY };
      cursor.classList.add("is-visible");
      follower.classList.add("is-visible");

      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(updateCursorPosition);
      }

      const target = event.target;
      const isInteractive =
        target instanceof Element && target.closest(INTERACTIVE_SELECTOR);
      const isOnDarkBackground = isDarkBackground(target);
      cursor.classList.toggle("is-hovering", Boolean(isInteractive));
      cursor.classList.toggle("is-on-dark", isOnDarkBackground);
      follower.classList.toggle("is-hovering", Boolean(isInteractive));
      follower.classList.toggle("is-on-dark", isOnDarkBackground);
    };

    const handlePointerLeave = () => {
      cursor.classList.remove("is-visible", "is-hovering", "is-on-dark");
      follower.classList.remove("is-visible", "is-hovering", "is-on-dark");
    };

    const handlePointerEnter = () => {
      cursor.classList.add("is-visible");
      follower.classList.add("is-visible");
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("pointerenter", handlePointerEnter);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("pointerenter", handlePointerEnter);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <>
      <span ref={followerRef} className="mouse-follower" aria-hidden="true" />
      <span ref={cursorRef} className="custom-cursor" aria-hidden="true" />
    </>
  );
}
