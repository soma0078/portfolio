import type { ReactNode } from "react";
import type { TroubleCase } from "@constants/projectDetails";

const PARTS = [
  { key: "problem", label: "문제", accent: false },
  { key: "cause", label: "원인", accent: false },
  { key: "fix", label: "해결", accent: true },
] as const;

const QUOTE = "border-l-2 pl-4";
const QUOTE_LINE = "border-black/12 dark:border-white/15";
const QUOTE_ACCENT = "border-[#b57328] dark:border-[#d9a05b]";

interface DetailTroubleProps {
  cases: TroubleCase[];
  format: (text: string) => ReactNode;
}

export default function DetailTrouble({ cases, format }: DetailTroubleProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      {cases.map((item) => (
        <article
          key={item.title}
          className="flex flex-col gap-5 rounded-xl border border-black/8 bg-surface p-5 lg:p-6 dark:border-white/10 dark:bg-white/4"
        >
          <h3 className="flex gap-2 text-lg leading-7 font-bold tracking-[-0.2px]">
            <span className="shrink-0 text-quiet select-none">##</span>
            <span>{item.title}</span>
          </h3>

          {PARTS.map(({ key, label, accent }) => (
            <div key={key} className="flex flex-col gap-2">
              <span className="text-xs tracking-[1.4px] text-quiet">
                {label}
              </span>
              <div className={`${QUOTE} ${accent ? QUOTE_ACCENT : QUOTE_LINE}`}>
                <p className="max-w-[820px] text-base leading-7 text-[#6b6b78] dark:text-[#9a9aae]">
                  {format(item[key])}
                </p>
              </div>
            </div>
          ))}
        </article>
      ))}
    </div>
  );
}
