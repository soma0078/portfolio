import type { ProjectSummary } from "@constants/projects";
import TransitionLink from "@components/common/TransitionLink";

interface DetailNavProps {
  prev?: ProjectSummary;
  next?: ProjectSummary;
}

const LABEL = " text-xs tracking-[1.4px] text-[#c9c9c0]";
const TITLE = "text-base font-bold tracking-[-0.2px]";

export default function DetailNav({ prev, next }: DetailNavProps) {
  return (
    <nav className="flex w-full gap-6 border-t border-black/8 pt-10 dark:border-white/10">
      <div className="flex flex-1 flex-col items-start gap-2.5">
        {prev && (
          <>
            <span className={LABEL}>PREV</span>
            <TransitionLink
              to={`/projects/${prev.id}`}
              className={`group ${TITLE}`}
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>{" "}
              {prev.title}
            </TransitionLink>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col items-end gap-2.5 text-right">
        {next && (
          <>
            <span className={LABEL}>NEXT</span>
            <TransitionLink
              to={`/projects/${next.id}`}
              className={`group ${TITLE}`}
            >
              {next.title}{" "}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </TransitionLink>
          </>
        )}
      </div>
    </nav>
  );
}
