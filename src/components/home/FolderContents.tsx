import type { ReactNode } from "react";
import { LuMail, LuMapPin } from "react-icons/lu";
import { MY_EMAIL } from "@constants/urls";
import { CAREER_ROLES } from "@constants/about";
import { PROJECTS, projectsIn } from "@constants/projects";
import ANALYTICS_EVENTS from "@constants/analyticsEvents";
import CLICK_LOCATIONS from "@constants/clickLocations";
import { trackEvent } from "src/utils/analytics";
import type { FolderId } from "./folders";

interface ContentProps {
  header: ReactNode;
}

function techLine(project: (typeof PROJECTS)[number]) {
  return project.stack.split(" · ").slice(0, 2).join(" · ");
}

function shortTitle(title: string) {
  return title.split(/\s[—-]\s/)[0].trim();
}

const CARD_LAYOUT = [
  { rotate: -20, left: -16, top: 50 },
  { rotate: 18, left: 136, top: 0 },
  { rotate: -24, left: 200, top: 50 },
];

const FOLDER_PROJECT_IDS = [6, 7, 1];

const FOLDER_PROJECTS = FOLDER_PROJECT_IDS.flatMap(
  (id) => PROJECTS.find((project) => project.id === id) ?? [],
);

const PROJECT_SUMMARY = [
  { label: "Work", count: projectsIn("work").length },
  { label: "Side", count: projectsIn("side").length },
]
  .filter((entry) => entry.count > 0)
  .map((entry) => `${entry.label} ${entry.count}`)
  .join(" · ");

function ProjectsContent({ header }: ContentProps) {
  const projects = FOLDER_PROJECTS;

  return (
    <>
      <div className="relative h-42 w-full shrink-0 overflow-hidden bg-white rounded-xl">
        {projects.map((project, index) => {
          const layout = CARD_LAYOUT[index];

          return (
            <div
              key={project.id}
              className="absolute w-32.5 origin-top-left rounded-lg bg-white p-2 shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
              style={{
                left: layout.left,
                top: layout.top,
                transform: `rotate(${layout.rotate}deg)`,
              }}
            >
              <img
                src={project.thumb}
                alt="프로젝트 썸네일"
                className="h-21 w-full rounded-md object-cover"
              />
              <p className="mt-2.5 truncate text-[10px] font-bold text-ink">
                {shortTitle(project.title)}
              </p>
              <p className="truncate  text-[8.5px] tracking-[0.8px] text-[#9a9488]">
                {techLine(project)}
              </p>
            </div>
          );
        })}
      </div>

      {header}

      <p className="text-[10px] text-[#8a8a94]">{PROJECT_SUMMARY}</p>
    </>
  );
}

const ABOUT_TAGS = ["Focused", "Proactive", "Collaborative"];

function AboutContent({ header }: ContentProps) {
  return (
    <>
      {header}

      <div className="flex flex-col gap-0.5">
        <p className="text-base font-bold text-white">이송아</p>
        <p className="text-[11px] font-medium tracking-[0.3px] text-[#c7c7c7]">
          프론트엔드 개발자
        </p>
      </div>

      <p className="text-[11.5px] leading-4.25 text-[#c7c7c7]">
        QA 시나리오와 성능 지표 분석·실사용자 성능 데이터를 바탕으로, 구현을
        넘어 실제 프로덕트의 품질과 병목을 개선합니다.
      </p>

      <span className="block h-px w-full shrink-0 bg-black/10" />

      <div className="flex gap-1.5">
        {ABOUT_TAGS.map((tag) => (
          <span
            key={tag}
            className="rounded-[20px] bg-[#9ca894] px-2.5 py-1 text-[10px] font-semibold text-[#1f261c]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3.5 text-[10.5px] text-[#c7c7c7]">
        <span className="flex items-center gap-1">
          <LuMapPin className="size-2.75" aria-hidden />
          Seoul, KR
        </span>
        <span className="flex items-center gap-1">
          <LuMail className="size-2.75" aria-hidden />
          {MY_EMAIL}
        </span>
      </div>
    </>
  );
}

const shortenPeriod = (date: string) =>
  date
    .split("—")
    .map((part) => part.trim().slice(2))
    .join("—");

function ExperienceContent({ header }: ContentProps) {
  return (
    <>
      {header}

      <div className="relative min-h-0 flex-1">
        <div className="flex h-full flex-col gap-2 overflow-y-auto pb-7 scrollbar-none [&::-webkit-scrollbar]:hidden">
          {CAREER_ROLES.map((item, index) => (
            <div
              key={`${item.org}-${item.date}`}
              className="flex shrink-0 items-start gap-3 rounded-xl bg-white p-5"
            >
              <span
                className={`w-20 shrink-0  text-[10px] font-medium ${
                  index === 0 ? "text-[#c4573a]" : "text-ink"
                }`}
              >
                {shortenPeriod(item.date)}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.75">
                <span className="truncate text-xs font-bold text-ink">
                  {item.title}
                </span>
                <span className="truncate text-[10px] text-[#8a8a94]">
                  {item.org}
                </span>
              </span>
              <span className=" text-[8.5px] tracking-[1px] text-[#b8b8b0]">
                {item.tag}
              </span>
            </div>
          ))}
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute right-1 bottom-0 animate-bounce text-sm leading-none text-ink motion-reduce:animate-none"
        >
          ↓
        </span>
      </div>
    </>
  );
}

const LOGS = [
  {
    year: "2026",
    date: "07.07",
    title: "Next.js 앱 성능 최적화기 (1편) — 기준선 측정",
    tag: "성능",
    url: "https://allotherthings.tistory.com/33",
  },
  {
    year: "2026",
    date: "07.16",
    title: "Next.js 앱 성능 최적화기 (2편) — 실사용자는 어디서 느렸을까",
    tag: "Core Web Vitals",
    url: "https://allotherthings.tistory.com/34",
  },
  {
    year: "2026",
    date: "07.16",
    title: "무엇을 테스트하느냐가 먼저였다",
    tag: "테스트",
    url: "https://allotherthings.tistory.com/35",
  },
];

function PersonalContent({ header }: ContentProps) {
  return (
    <>
      {header}

      <div className="flex flex-col gap-2.75">
        {LOGS.map((log) => (
          <a
            key={log.url}
            href={log.url}
            target="_blank"
            rel="noreferrer noopener"
            onClick={(event) => {
              event.stopPropagation();
              trackEvent(ANALYTICS_EVENTS.blogLinkClick, {
                title: log.title,
                url: log.url,
                click_location: CLICK_LOCATIONS.homeFolder,
              });
            }}
            className="group flex items-center gap-3"
          >
            <span className="flex h-14.5 w-12.5 shrink-0 flex-col items-center justify-center rounded-xl bg-white text-center  text-[10px] leading-tight text-[#8a8a94]">
              {log.year}
              <br />
              {log.date}
            </span>
            <span className="flex min-w-0 flex-col gap-1">
              <span className="line-clamp-2 text-xs font-medium text-white underline decoration-transparent underline-offset-4 transition-colors duration-300 group-hover:decoration-white/60">
                {log.title}
              </span>
              <span className="w-fit rounded bg-[#c5e5fc] px-1.5 py-0.5 text-[8px] text-[#3d91cc]">
                {log.tag}
              </span>
            </span>
          </a>
        ))}
      </div>
    </>
  );
}

const BY_ID: Record<FolderId, (props: ContentProps) => ReactNode> = {
  about: AboutContent,
  experience: ExperienceContent,
  projects: ProjectsContent,
  personal: PersonalContent,
};

export default function FolderContent({
  id,
  header,
}: ContentProps & { id: FolderId }) {
  const Content = BY_ID[id];

  return <Content header={header} />;
}
