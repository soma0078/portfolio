import { useEffect, useId, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";
import useIsDarkMode from "@hooks/useIsDarkMode";

const FONT = "'Intel One Mono', 'Pretendard', sans-serif";

const LIGHT = {
  primaryColor: "#ffffff",
  primaryBorderColor: "#d7d2ca",
  primaryTextColor: "#17171c",
  secondaryColor: "#fafafa",
  tertiaryColor: "#fafafa",
  lineColor: "#a3a39a",
  clusterBkg: "#fafafa",
  clusterBorder: "#e5e7eb",
  titleColor: "#75758a",
  nodeTextColor: "#17171c",
  edgeLabelBackground: "#ffffff",
};

const DARK = {
  primaryColor: "#262019",
  primaryBorderColor: "#4a4037",
  primaryTextColor: "#f0ece6",
  secondaryColor: "#221d18",
  tertiaryColor: "#221d18",
  lineColor: "#7d7166",
  clusterBkg: "#201b16",
  clusterBorder: "#3a332c",
  titleColor: "#b4a99c",
  nodeTextColor: "#f0ece6",
  edgeLabelBackground: "#1a1613",
};

interface DetailFlowProps {
  chart: string;
  caption?: string;
}

export default function DetailFlow({ chart, caption }: DetailFlowProps) {
  const holder = useRef<HTMLDivElement>(null);
  const isDarkMode = useIsDarkMode();
  const [failed, setFailed] = useState(false);
  const id = `flow-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          fontFamily: FONT,
          themeVariables: {
            fontFamily: FONT,
            fontSize: "14px",
            background: "transparent",
            ...(isDarkMode ? DARK : LIGHT),
          },
          flowchart: {
            curve: "basis",
            padding: 16,
            useMaxWidth: true,
            wrappingWidth: 200,
            nodeSpacing: 40,
            rankSpacing: 48,
          },
        });

        const { svg } = await mermaid.render(id, chart);
        if (!alive || !holder.current) return;

        holder.current.innerHTML = svg;
        ScrollTrigger.refresh();
      } catch {
        if (alive) setFailed(true);
      }
    })();

    return () => {
      alive = false;
    };
  }, [chart, id, isDarkMode]);

  if (failed) return null;

  return (
    <figure className="flex w-full flex-col gap-3">
      <div className="w-full overflow-x-auto rounded-xl border border-black/8 bg-surface px-4 py-6 lg:px-6 dark:border-white/10 dark:bg-white/4">
        <div
          ref={holder}
          className="mx-auto min-h-56 w-full [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
        />
      </div>

      {caption && (
        <figcaption className="text-sm leading-6 text-[#6b6b78] dark:text-[#9a9aae]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
