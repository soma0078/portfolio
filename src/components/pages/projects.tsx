import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SmoothScroll from "@components/layout/SmoothScroll";
import ProjectRow from "@components/projects/ProjectRow";
import ContactClosing from "@components/common/ContactClosing";
import { PAGE_GUTTER_X, PAGE_MAX_WIDTH } from "@constants/layout";
import { PROJECT_SECTIONS, projectsIn } from "@constants/projects";

export default function ProjectPage() {
  const mainRef = useRef<HTMLElement>(null);

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
    { scope: mainRef },
  );

  return (
    <SmoothScroll>
      <div className="min-h-dvh w-full overflow-x-hidden bg-white pb-30  text-base text-ink lg:pl-(--sidebar-width) dark:bg-night dark:text-white">
        <main
          ref={mainRef}
          className={`${PAGE_MAX_WIDTH} ${PAGE_GUTTER_X} flex flex-col gap-16 pt-24 lg:pt-19`}
        >
          <h1 className="text-2xl font-extrabold tracking-[-0.6px] lg:text-[32px]">
            Projects
          </h1>

          {PROJECT_SECTIONS.map(({ key, label }) => {
            const projects = projectsIn(key);
            if (!projects.length) return null;

            return (
              <section key={key} className="flex flex-col gap-7">
                <h2 className="text-2xl font-extrabold tracking-[-0.6px]">
                  {label}
                </h2>

                <ul className="flex flex-col">
                  {projects.map((project, index) => (
                    <ProjectRow
                      key={project.id}
                      project={project}
                      order={index + 1}
                    />
                  ))}
                </ul>
              </section>
            );
          })}

          <ContactClosing />
        </main>
      </div>
    </SmoothScroll>
  );
}
