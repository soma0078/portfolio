import type { DetailBlock as Block } from "@constants/projectDetails";
import DetailGallery from "./DetailGallery";

const ACCENT_DOT = "bg-[#b57328] dark:bg-[#d9a05b]";

const BODY_TEXT = "text-base leading-7";
const PROSE = `flex flex-col gap-4 ${BODY_TEXT}`;

// 문제 → 접근 → 결과 순서로 열을 나누고, 열마다 라벨 색을 달리한다
const CASE_COLUMNS = [
  { key: "problem", label: "문제", labelClass: "text-quiet" },
  { key: "approach", label: "접근", labelClass: "text-quiet" },
  { key: "result", label: "결과", labelClass: "text-[#b57328] dark:text-[#d9a05b]" },
] as const;

function withCode(text: string) {
  return text.split(/`([^`]+)`/).map((part, index) =>
    index % 2 === 1 ? (
      <code
        key={`${part}-${index}`}
        className="rounded bg-black/6 px-1.5 py-0.5  text-sm lg:text-base dark:bg-white/10"
      >
        {part}
      </code>
    ) : (
      part
    ),
  );
}

export default function DetailBlock({ block }: { block: Block }) {
  return (
    <section className="flex w-full flex-col gap-5.5">
      <div className="grid gap-2.5">
        <span className=" text-sm tracking-[1px] text-quiet">{block.label}</span>
        <h3 className="text-xl leading-7 font-semibold tracking-[-0.4px] lg:text-2xl lg:leading-8">
          {block.title}
        </h3>
      </div>

      {block.kind === "prose" && (
        <div className={`${PROSE} text-ink-soft dark:text-[#c7c7c7]`}>
          {block.body.map((paragraph) => (
            <p className="text-base" key={paragraph.slice(0, 16)}>{withCode(paragraph)}</p>
          ))}
        </div>
      )}

      {block.kind === "bullets" && (
        <ul className="grid w-full gap-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span
                className={`mt-2.5 size-1 shrink-0 rounded-full ${ACCENT_DOT}`}
              />
              <span className={`${BODY_TEXT} text-ink-soft dark:text-[#c7c7c7]`}>
                {withCode(item)}
              </span>
            </li>
          ))}
        </ul>
      )}

      {block.kind === "cases" && (
        <ul className="grid w-full gap-5">
          {block.items.map((item) => (
            <li
              key={item.problem.slice(0, 16)}
              className="grid gap-7 rounded-3xl bg-surface px-6 py-8 md:grid-cols-3 md:gap-10 md:px-10 md:py-10 dark:bg-white/5"
            >
              {CASE_COLUMNS.map(({ key, label, labelClass }) => (
                <div key={key} className="flex flex-col gap-3">
                  <span className={`text-sm font-semibold ${labelClass}`}>{label}</span>
                  <p className={`${BODY_TEXT} break-keep text-ink-soft dark:text-[#c7c7c7]`}>
                    {withCode(item[key])}
                  </p>
                </div>
              ))}
            </li>
          ))}
        </ul>
      )}

      {block.kind === "gallery" && <DetailGallery shots={block.shots} />}
    </section>
  );
}
