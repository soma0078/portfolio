import type { DetailBlock as Block } from "@constants/projectDetails";
import DetailFlow from "./DetailFlow";
import DetailGallery from "./DetailGallery";
import DetailTrouble from "./DetailTrouble";

const ACCENT_DOT = "bg-[#b57328] dark:bg-[#d9a05b]";

const PROSE = "flex flex-col gap-4 text-base leading-7";

function withCode(text: string) {
  return text.split(/`([^`]+)`/).map((part, index) =>
    index % 2 === 1 ? (
      <code
        key={`${part}-${index}`}
        className="rounded bg-black/6 px-1.5 py-0.5  text-sm dark:bg-white/10"
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
      <span className=" text-xs tracking-[2px] text-quiet">{block.label}</span>
      <h2 className="text-2xl leading-9 font-bold tracking-[-0.5px]">
        {block.title}
      </h2>

      {block.kind === "prose" && (
        <div className={`${PROSE} text-ink-soft dark:text-[#c7c7c7]`}>
          {block.body.map((paragraph) => (
            <p key={paragraph.slice(0, 16)}>{withCode(paragraph)}</p>
          ))}
        </div>
      )}

      {block.kind === "bullets" && (
        <ul className="grid w-full gap-2.5 lg:grid-cols-2 lg:gap-x-12">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span
                className={`mt-2.5 size-1 shrink-0 rounded-full ${ACCENT_DOT}`}
              />
              <span className="text-sm leading-6 text-ink-soft dark:text-[#c7c7c7]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}

      {block.kind === "steps" && (
        <ul className="flex w-full flex-col">
          {block.steps.map((step) => (
            <li
              key={step.title}
              className="flex flex-col gap-3 not-last:border-b border-black/8 py-6.5 dark:border-white/10"
            >
              <h3 className="text-lg font-bold tracking-[-0.2px]">
                {step.title}
              </h3>
              <div
                className={`${PROSE} gap-2.5 text-[#6b6b78] dark:text-[#9a9aae]`}
              >
                {step.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 16)}>{withCode(paragraph)}</p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}

      {block.kind === "trouble" && (
        <DetailTrouble cases={block.cases} format={withCode} />
      )}

      {block.kind === "flow" && (
        <DetailFlow chart={block.chart} caption={block.caption} />
      )}

      {block.kind === "gallery" && <DetailGallery shots={block.shots} />}
    </section>
  );
}
