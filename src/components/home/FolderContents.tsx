import type { ReactNode } from "react";
import { LuMail, LuMapPin } from "react-icons/lu";
import { data } from "src/assets/data";
import { MY_EMAIL } from "@constants/urls";
import type { FolderId } from "./folders";

interface ContentProps {
  header: ReactNode;
}

function techLine(project: (typeof data.projects)[number]) {
  const skills = project.details.find((detail) => detail.title === "SKILLS");
  const icons = Array.isArray(skills?.desc) ? skills.desc : [];

  return icons
    .slice(0, 2)
    .map((icon) => icon.replace("icon-", "").toUpperCase())
    .join(" · ");
}

const CARD_LAYOUT = [
  { rotate: -20.9, left: 0, top: 46 },
  { rotate: 17.2, left: 137, top: 0 },
  { rotate: -22.6, left: 244, top: 50 },
];

function ProjectsContent({ header }: ContentProps) {
  const projects = data.projects.slice(0, 3);
  const works = data.projects.filter((project) => project.category === "work");

  return (
    <>
      <div className="relative h-42 w-full shrink-0 overflow-hidden">
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
                src={`/images/sections/04/${project.imgSrc}.png`}
                alt=""
                className="h-21 w-full rounded-md object-cover"
              />
              <p className="mt-2.5 truncate text-[10px] font-bold text-ink">
                {project.title}
              </p>
              <p className="truncate font-mono text-[8.5px] tracking-[0.8px] text-[#9a9488]">
                {techLine(project)}
              </p>
            </div>
          );
        })}
      </div>

      {header}

      <p className="text-[10px] text-[#8a8a94]">
        {works.length} Works | {data.projects.length - works.length} Side
        Projects
      </p>
    </>
  );
}

const ABOUT_TAGS = ["React", "Next.js", "TypeScript"];

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
        React와 Next.js로 서비스를 만듭니다. 화면 뒤의 데이터 구조를 함께
        설계하고, 배포 후 실사용자 지표로 확인하며 다듬습니다.
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
    .split("-")
    .map((part) => part.trim().slice(2))
    .join("—");

const endOf = (date: string) => date.split("-").pop()?.trim() ?? "";

const CAREER = [...data.experience]
  .sort((a, b) => endOf(b.date).localeCompare(endOf(a.date)))
  .slice(0, 3);

function ExperienceContent({ header }: ContentProps) {
  return (
    <>
      {header}

      <div className="flex flex-col gap-2">
        {CAREER.map((item, index) => (
          <div
            key={item.id}
            className="flex items-start gap-3 rounded-xl bg-white p-4"
          >
            <span
              className={`w-20 shrink-0 font-mono text-xs font-medium ${
                index === 0 ? "text-[#c4573a]" : "text-ink"
              }`}
            >
              {shortenPeriod(item.date)}
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
              <span className="truncate text-[12.5px] font-bold text-ink">
                {item.title}
              </span>
              <span className="truncate text-[10px] text-[#8a8a94]">
                {item.name}
              </span>
            </span>
            <span className="font-mono text-[8.5px] tracking-[1px] text-[#b8b8b0]">
              {item.category === "education" ? "EDU" : "WORK"}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

const LOGS = [
  {
    year: "2026",
    date: "07.16",
    title: "Next.js 앱 성능 최적화기 (2편) — 실사용자는 어디서 느렸을까",
    tag: "Core Web Vitals",
    url: "https://allotherthings.tistory.com/34",
  },
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
    title: "무엇을 테스트하느냐가 먼저였다",
    tag: "테스트",
    url: "https://allotherthings.tistory.com/35",
  },
];

function PersonalContent({ header }: ContentProps) {
  return (
    <>
      {header}

      <div className="flex flex-col gap-[11px]">
        {LOGS.map((log) => (
          <a
            key={log.url}
            href={log.url}
            target="_blank"
            rel="noreferrer noopener"
            onClick={(event) => event.stopPropagation()}
            className="group flex items-center gap-3"
          >
            <span className="flex h-[58px] w-[50px] shrink-0 flex-col items-center justify-center rounded-xl bg-white text-center font-mono text-[10px] leading-tight text-[#8a8a94]">
              {log.year}
              <br />
              {log.date}
            </span>
            <span className="flex min-w-0 flex-col gap-1">
              <span className="line-clamp-2 text-sm font-medium text-white underline decoration-transparent underline-offset-4 transition-colors duration-300 group-hover:decoration-white/60">
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
