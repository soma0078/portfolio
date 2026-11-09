import { useRef } from "react";
import type { ProjectSummary } from "@constants/projects";
import TransitionLink from "@components/common/TransitionLink";
import ANALYTICS_EVENTS from "@constants/analyticsEvents";
import CLICK_LOCATIONS from "@constants/clickLocations";
import { trackEvent } from "src/utils/analytics";
import TechTags from "@components/projects/TechTags";
import HoverEye from "@components/projects/HoverEye";
import WorkOverlay from "@components/projects/WorkOverlay";
import { LuArrowRight } from "react-icons/lu";

const ACCENT_DOT = "bg-[#b57328] dark:bg-[#d9a05b]";

interface ProjectRowProps {
  project: ProjectSummary;
  open: boolean;
  onOpenChange: (next: boolean) => void;
}

export default function ProjectRow({
  project,
  open,
  onOpenChange,
}: ProjectRowProps) {
  const detailPath = `/projects/${project.detailId ?? project.id}`;
  const isFolder = Boolean(project.workSrc);
  const thumbRef = useRef<HTMLDivElement>(null);

  const trackItemClick = () =>
    trackEvent(ANALYTICS_EVENTS.projectCardClick, {
      project_id: project.id,
      project_title: project.title,
      click_target: "item",
      click_location: CLICK_LOCATIONS.projectList,
    });

  const trackSiteClick = () =>
    trackEvent(ANALYTICS_EVENTS.projectCardClick, {
      project_id: project.id,
      project_title: project.title,
      click_target: "site_link",
      click_location: CLICK_LOCATIONS.projectList,
    });

  return (
    <li className="js-project-row js-project-item group relative border-b border-black/8 dark:border-white/10">
      <TransitionLink
        to={detailPath}
        aria-label={project.title}
        onClick={(event) => {
          if (isFolder) {
            event.preventDefault();
            onOpenChange(true);
            return;
          }
          trackItemClick();
        }}
        className="flex flex-col gap-7 py-9 pr-14 xl:flex-row xl:items-center xl:gap-14 xl:py-12"
      >
        <div
          ref={thumbRef}
          className="relative block w-full shrink-0 overflow-hidden rounded-[10px] bg-surface xl:w-[420px] dark:bg-white/5"
        >
          <img
            src={project.thumb}
            alt={`${project.title} 썸네일 이미지`}
            loading="lazy"
            className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {isFolder && <HoverEye areaRef={thumbRef} />}
        </div>

        <div className="flex flex-1 flex-col items-start gap-4.5">
          <div className="flex items-center gap-3.5 text-sm">
            <span className="tracking-[1px] text-[#b0b0a8]">
              {[project.year, ...project.workTypes].join(" · ")}
            </span>
          </div>

          <h3 className="text-lg leading-6 font-semibold tracking-[-0.2px] lg:text-xl lg:leading-7">
            {project.title} 웹사이트
          </h3>

          <p className="text-base leading-7 text-[#6b6b78] dark:text-[#c7c7c7]">
            {project.summary}
          </p>

          <ul className="flex flex-col gap-2">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2.5">
                <span
                  className={`mt-2.5 size-1 shrink-0 rounded-full ${ACCENT_DOT}`}
                />
                <span className="text-sm leading-6 text-[#3a3a44] dark:text-[#d2d2dc]">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>

          <TechTags stack={project.stack} />
        </div>
      </TransitionLink>

      {isFolder && project.workSrc && (
        <WorkOverlay
          src={project.workSrc}
          alt={`${project.title} 작업 화면`}
          open={open}
          onClose={() => onOpenChange(false)}
        />
      )}

      {project.href && (
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer noopener"
          onClick={trackSiteClick}
          className="absolute top-9 right-14 z-10 rounded-full border border-black/12 bg-white px-3.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-surface dark:border-white/15 dark:bg-night dark:text-white"
        >
          사이트 보기 ↗
        </a>
      )}

      {!isFolder && (
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-0 flex -translate-x-6 -translate-y-1/2 items-center justify-center text-ink opacity-0 transition-[opacity,translate] duration-300 group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100 dark:text-white"
        >
          <LuArrowRight className="size-18" strokeWidth={1} aria-hidden />
        </span>
      )}
    </li>
  );
}
