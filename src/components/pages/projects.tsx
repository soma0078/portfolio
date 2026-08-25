import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SmoothScroll from "@components/layout/SmoothScroll";
import ProjectFilters from "@components/projects/ProjectFilters";
import ProjectRow from "@components/projects/ProjectRow";
import ProjectsClosing from "@components/projects/ProjectsClosing";
import {
  PROJECTS,
  PROJECTS_INTRO,
  type ProjectFilterKey,
} from "@constants/projects";

export default function ProjectPage() {
  const [filter, setFilter] = useState<ProjectFilterKey>("all");
  const listRef = useRef<HTMLUListElement>(null);

  const visibleProjects =
    filter === "all"
      ? PROJECTS
      : PROJECTS.filter((project) => project.tag === filter);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".js-project-row", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.06,
      });
    },
    { scope: listRef, dependencies: [filter], revertOnUpdate: true },
  );

  return (
    <SmoothScroll>
      <div className="min-h-dvh w-full overflow-x-hidden bg-white pb-30 font-sans text-base text-ink lg:pl-(--sidebar-width) dark:bg-night dark:text-white">
        <main className="flex flex-col gap-16 px-5 pt-24 lg:px-30 lg:pt-19">
          <header className="flex flex-col gap-6">
            <h1 className="text-[32px] font-extrabold tracking-[-1.2px] lg:text-[44px]">
              Projects
            </h1>
            <p className="max-w-[720px] text-base leading-7 text-muted dark:text-[#9a9aae]">
              {PROJECTS_INTRO}
            </p>
          </header>

          <ProjectFilters value={filter} onChange={setFilter} />

          <ul ref={listRef} className="flex flex-col">
            {visibleProjects.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                order={index + 1}
              />
            ))}
          </ul>

          <ProjectsClosing />
        </main>
      </div>
    </SmoothScroll>
  );
}
