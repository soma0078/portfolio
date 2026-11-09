import type { ProjectSummary } from "@constants/projects";
import TransitionLink from "@components/common/TransitionLink";

interface DetailNavProps {
  prev?: ProjectSummary;
  next?: ProjectSummary;
}

const CARD =
  "group flex w-full flex-col gap-2.5 rounded-2xl px-6 py-6 transition-colors duration-300 lg:px-7 lg:py-7";
const LABEL = "text-sm tracking-[0.5px] text-quiet";
const TITLE = "text-lg font-medium tracking-[-0.2px] transition-colors text-ink lg:text-xl dark:text-white group-hover:text-[#b57328] dark:group-hover:text-[#d9a05b]";
const META = "text-sm text-quiet";

export default function DetailNav({ prev, next }: DetailNavProps) {
  return (
    <nav className="grid w-full grid-cols-1 gap-4 pt-10 md:grid-cols-2">
      {prev ? (
        <TransitionLink
          to={`/projects/${prev.id}`}
          className={`${CARD} items-start bg-surface text-left hover:bg-surface-hover dark:bg-white/5 dark:hover:bg-white/10`}
        >
          <span className={LABEL}>
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>{" "}
            PREV
          </span>
          <span className={TITLE}>{prev.title}</span>
          <span className={META}>{prev.workTypes.join(" · ")}</span>
        </TransitionLink>
      ) : (
        <div />
      )}

      {next ? (
        <TransitionLink
          to={`/projects/${next.id}`}
          className={`${CARD} items-end bg-surface text-right hover:bg-surface-hover dark:bg-white/5 dark:hover:bg-white/10`}
        >
          <span className={LABEL}>
            NEXT{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
          <span className={TITLE} >
            {next.title}
          </span>
          <span className={META}>{next.workTypes.join(" · ")}</span>
        </TransitionLink>
      ) : (
        <div />
      )}
    </nav>
  );
}
