import type { ProjectSummary } from "@constants/projects";
import TransitionLink from "@components/common/TransitionLink";

const ACCENT_TEXT = "text-[#b57328] dark:text-[#d9a05b]";
const ACCENT_DOT = "bg-[#b57328] dark:bg-[#d9a05b]";

interface ProjectRowProps {
  project: ProjectSummary;
  order: number;
}

export default function ProjectRow({ project, order }: ProjectRowProps) {
  const detailPath = `/projects/${project.id}`;
  const flipped = order % 2 === 0;

  return (
    <li className="js-project-row border-b border-black/8 dark:border-white/10">
      <article
        className={`flex flex-col gap-7 py-9 lg:items-start lg:gap-14 lg:py-11 ${
          flipped ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <TransitionLink
          to={detailPath}
          tabIndex={-1}
          aria-hidden
          className="group block w-full shrink-0 overflow-hidden rounded-[10px] bg-surface lg:w-[420px] dark:bg-white/5"
        >
          <img
            src={`/images/sections/04/${project.thumb}.png`}
            alt=""
            loading="lazy"
            className="aspect-[2/1] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </TransitionLink>

        <div className="flex flex-1 flex-col items-start gap-4.5">
          <div className="flex items-center gap-3.5  text-xs">
            <span className="text-quiet">{String(order).padStart(2, "0")}</span>
            <span className="font-medium tracking-[1.4px] text-muted dark:text-[#9a9ab0]">
              {project.tag}
            </span>
            <span className="tracking-[1px] text-[#b0b0a8]">
              {project.year}
            </span>
          </div>

          <h3 className="text-2xl leading-8 font-bold tracking-[-0.5px] lg:text-[28px] lg:leading-9">
            <TransitionLink to={detailPath} className="group">
              <span className="link-underline">{project.title}</span>
            </TransitionLink>
          </h3>

          <p className="max-w-[620px] text-base leading-7 text-[#6b6b78] dark:text-[#9a9aae]">
            {project.summary}
          </p>

          <ul className="flex flex-col gap-2">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2.5">
                <span
                  className={`mt-2.5 size-1 shrink-0 rounded-full ${ACCENT_DOT}`}
                />
                <span className="text-sm leading-6 font-semibold text-[#3a3a44] dark:text-[#d2d2dc]">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>

          <p className=" text-xs tracking-[0.8px] text-[#9a9488] dark:text-[#8a8a9a]">
            {project.stack}
          </p>

          <TransitionLink
            to={detailPath}
            className={`group text-sm font-semibold ${ACCENT_TEXT}`}
          >
            <span className="link-underline">자세히 보기</span>
          </TransitionLink>
        </div>
      </article>
    </li>
  );
}
