import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ScrollSmoother } from "gsap/all";
import SmoothScroll from "@components/layout/SmoothScroll";
import DetailBlock from "@components/projects/DetailBlock";
import DetailNav from "@components/projects/DetailNav";
import DetailSpec from "@components/projects/DetailSpec";
import HeroSlider from "@components/projects/HeroSlider";
import { PAGE_GUTTER_X, PAGE_MAX_WIDTH } from "@constants/layout";
import { PROJECTS, groupLabel } from "@constants/projects";
import { PROJECT_DETAILS } from "@constants/projectDetails";
import type { DetailBlock as Block } from "@constants/projectDetails";
import TransitionLink from "@components/common/TransitionLink";

const ACCENT = "text-[#b57328] dark:text-[#d9a05b]";

const PAGE =
  "min-h-dvh w-full overflow-x-hidden bg-white pb-30  text-base text-ink lg:pl-(--sidebar-width) dark:bg-night dark:text-white";

const BACK =
  " text-xs tracking-[1.2px] text-quiet transition-colors duration-300 hover:text-ink dark:hover:text-white";

export default function ProjectDetailPage() {
  const { projectId } = useParams();

  const index = PROJECTS.findIndex((item) => String(item.id) === projectId);
  const project = index >= 0 ? PROJECTS[index] : undefined;
  const detail = project ? PROJECT_DETAILS[project.id] : undefined;

  useEffect(() => {
    ScrollSmoother.get()?.scrollTo(0);
    window.scrollTo(0, 0);
  }, [projectId]);

  const gallery = detail?.galleryInHero
    ? detail.blocks.find(
        (block): block is Extract<Block, { kind: "gallery" }> =>
          block.kind === "gallery",
      )
    : undefined;

  const heroShots =
    project && detail && gallery
      ? [
          { src: detail.hero, name: project.title, note: "대표 이미지" },
          ...gallery.shots,
        ]
      : undefined;

  if (!project || !detail) {
    return (
      <div className={PAGE}>
        <main
          className={`${PAGE_MAX_WIDTH} ${PAGE_GUTTER_X} flex flex-col items-start gap-5.5 pt-24 lg:pt-19`}
        >
          <h1 className="text-2xl font-extrabold tracking-[-0.6px]">
            없는 프로젝트입니다
          </h1>
          <p className="text-base leading-7 text-muted dark:text-[#9a9aae]">
            주소가 바뀌었거나 목록에서 내린 프로젝트일 수 있습니다.
          </p>
          <TransitionLink
            to="/projects"
            className={`text-sm font-semibold ${ACCENT}`}
          >
            목록으로 돌아가기 →
          </TransitionLink>
        </main>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <div className={PAGE}>
        <main
          className={`${PAGE_MAX_WIDTH} ${PAGE_GUTTER_X} flex flex-col gap-18 pt-24 lg:pt-16`}
        >
          <TransitionLink to="/projects" className={BACK}>
            ← Projects
          </TransitionLink>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-14">
            <div className="flex w-full flex-col items-start gap-5 lg:w-[47%]">
              <div className="flex flex-wrap items-center gap-3.5  text-xs">
                <span
                  className={`font-medium tracking-[1.4px] uppercase ${ACCENT}`}
                >
                  {groupLabel(project.group)}
                </span>
                <span className="tracking-[1px] text-[#b0b0a8]">
                  {detail.period}
                </span>
                <span className="tracking-[1px] text-[#b0b0a8]">
                  {detail.org}
                </span>
              </div>

              <h1 className="text-[32px] leading-11 font-extrabold tracking-[-1.2px] lg:text-[44px] lg:leading-[57px]">
                {project.title}
              </h1>

              <p className="max-w-[800px] text-xl leading-8 text-ink-soft dark:text-[#c7c7c7]">
                {detail.lead}
              </p>

              {detail.links.length > 0 && (
                <div className="flex flex-wrap items-center gap-2.5 pt-1.5">
                  {detail.links.map(({ label, href }, order) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={`rounded-full px-5 py-3 text-sm font-bold transition-colors duration-300 ${
                        order === 0
                          ? "bg-ink text-white hover:bg-ink-soft dark:bg-white dark:text-ink dark:hover:bg-[#e2e2ea]"
                          : "ring-1 ring-black/12 hover:bg-surface dark:ring-white/20 dark:hover:bg-white/8"
                      }`}
                    >
                      {label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full lg:w-[48%]">
              {heroShots ? (
                <HeroSlider key={project.id} shots={heroShots} />
              ) : (
                <div className="overflow-hidden rounded-xl bg-surface dark:bg-white/5">
                  <img
                    src={detail.hero}
                    alt={`${project.title} 대표 이미지`}
                    className="aspect-video w-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <DetailSpec spec={detail.spec} />

          {detail.blocks
            .filter((block) => block !== gallery)
            .map((block) => (
              <DetailBlock key={block.label} block={block} />
            ))}

          <DetailNav prev={PROJECTS[index - 1]} next={PROJECTS[index + 1]} />
        </main>
      </div>
    </SmoothScroll>
  );
}
