import { useCallback, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import type { ProjectSummary } from "@constants/projects";
import TransitionLink from "@components/common/TransitionLink";
import ANALYTICS_EVENTS from "@constants/analyticsEvents";
import CLICK_LOCATIONS from "@constants/clickLocations";
import { trackEvent } from "src/utils/analytics";
import TechTags from "@components/projects/TechTags";
import FolderPaper, { type PaperState } from "@components/projects/FolderPaper";

interface ProjectCardProps {
  project: ProjectSummary;
  paperState: PaperState;
  onPaperStateChange: (next: PaperState) => void;
}

export default function ProjectCard({
  project,
  paperState,
  onPaperStateChange,
}: ProjectCardProps) {
  const detailPath = `/projects/${project.detailId ?? project.id}`;
  const isFolder = Boolean(project.workSrc);

  const cardRef = useRef<HTMLLIElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);

  useLayoutEffect(() => {
    if (!isFolder) return;
    const info = infoRef.current;
    if (!info) return;

    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.killTweensOf(info);
    if (paperState === "closed") {
      gsap.to(info, { yPercent: 0, rotateX: 0, duration: 0.45, ease: "power2.out" });
    } else {
      gsap.to(info, {
        yPercent: 8,
        rotateX: -22,
        transformOrigin: "50% 0%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [paperState, isFolder]);

  const closePaper = useCallback(() => onPaperStateChange("closed"), [onPaperStateChange]);
  const handlePaperClick = useCallback(
    () => onPaperStateChange(paperState === "out" ? "center" : "out"),
    [onPaperStateChange, paperState],
  );

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
    <li
      ref={cardRef}
      className={`js-project-card js-project-item relative h-full ${paperState !== "closed" ? "z-30" : ""}`}
    >
      <TransitionLink
        to={detailPath}
        aria-label={project.title}
        onClick={(event) => {
          if (isFolder) {
            event.preventDefault();
            onPaperStateChange(paperState === "closed" ? "out" : "closed");
            return;
          }
          trackItemClick();
        }}
        className={`group relative flex h-full flex-col rounded-[18px] bg-white border border-black/8 dark:border-white/10 dark:bg-[#2a2420] ${isFolder ? "" : "overflow-hidden"}`}
      >
        <div className="block px-6 pt-6">
          <img
            src={project.thumb}
            alt={`${project.title} 썸네일 이미지`}
            loading="lazy"
            className={`aspect-3/2 w-full object-cover object-top transition-all duration-500 group-hover:translate-y-0 translate-y-4 rounded-t-xl ${
              paperState === "closed" ? "brightness-100" : "brightness-60"
            }`}
          />
        </div>

        <div
          ref={infoRef}
          className="relative z-20 bg-white dark:bg-[#2a2420] flex flex-1 flex-col items-start gap-3 p-6 rounded-t-3xl rounded-b-2xl border-b border-black/8 dark:border-white/10 shadow-[0_-15px_15px_rgb(0_0_0/0.05)] dark:shadow-[0_-15px_15px_rgb(0_0_0/0.2)]"
        >
          <p className="text-sm tracking-[1px] text-quiet">
            {[project.year, ...project.workTypes].join(" · ")}
          </p>

          <h3 className="text-lg leading-6 font-semibold tracking-[-0.2px] lg:text-xl lg:leading-7">
            {project.title}
          </h3>

          <p className="text-base text-[#6b6b78] dark:text-[#c7c7c7]">
            {project.summary}
          </p>

          <TechTags stack={project.stack} className="mt-auto pt-2" />
        </div>
      </TransitionLink>

      {isFolder && project.workSrc && (
        <FolderPaper
          src={project.workSrc}
          alt={`${project.title} 작업 화면`}
          state={paperState}
          cardRef={cardRef}
          boundaryRef={infoRef}
          onPaperClick={handlePaperClick}
          onBackdropClick={closePaper}
        />
      )}

      {project.href && (
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer noopener"
          onClick={trackSiteClick}
          className="absolute top-9 right-9 z-30 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-ink shadow-sm backdrop-blur transition-colors hover:bg-white dark:bg-night/80 dark:text-white"
        >
          사이트 보기 ↗
        </a>
      )}
    </li>
  );
}
