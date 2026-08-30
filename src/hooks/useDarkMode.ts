import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { withViewTransition } from "src/utils/viewTransition";

function radiusToFarthestCorner(x: number, y: number) {
  return Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );
}

export default function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (!("theme" in localStorage)) setIsDarkMode(event.matches);
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const toggleDarkMode = useCallback((event?: MouseEvent<HTMLElement>) => {
    const next = !document.documentElement.classList.contains("dark");
    localStorage.theme = next ? "dark" : "light";

    const root = document.documentElement;

    const apply = () => {
      flushSync(() => setIsDarkMode(next));
      root.classList.toggle("dark", next);
    };

    const target = event?.currentTarget?.getBoundingClientRect();
    const x =
      event && event.detail > 0
        ? event.clientX
        : (target?.left ?? window.innerWidth / 2) + (target?.width ?? 0) / 2;
    const y =
      event && event.detail > 0
        ? event.clientY
        : (target?.top ?? window.innerHeight / 2) + (target?.height ?? 0) / 2;

    root.style.setProperty("--reveal-x", `${x}px`);
    root.style.setProperty("--reveal-y", `${y}px`);
    root.style.setProperty("--reveal-r", `${radiusToFarthestCorner(x, y)}px`);
    root.dataset.themeReveal = "";

    const transition = withViewTransition(apply);

    if (!transition) {
      delete root.dataset.themeReveal;
      return;
    }

    transition.finished.finally(() => {
      delete root.dataset.themeReveal;
    });
  }, []);

  return { isDarkMode, toggleDarkMode };
}
