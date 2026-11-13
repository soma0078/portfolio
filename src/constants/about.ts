import posts from "./posts.generated.json";

/* ─────────────────────────── 01 About ─────────────────────────── */

export const ABOUT_HERO = ["무엇을 만들지보다", "왜 필요한지를 고민합니다."];

export const ABOUT_BIO = [
"화면뿐 아니라 데이터와 흐름까지 고려합니다. 기획·디자인 단계부터 백엔드 개발자, 디자이너와 적극적으로 소통하며 예외 케이스와 API 스펙을 제안하고, 구현 방향을 주도적으로 조율합니다.",
"구현한 기능은 운영 환경에서 거듭 검증합니다. 시각적·기술적 완성도가 비즈니스 가치로 직결된다는 책임감을 느끼며, QA를 통한 세부적인 UI 일관성 및 사용성 개선으로 제품의 신뢰도를 높입니다.",
"실제 사용자 환경의 성능까지 책임집니다. RUM(CWV)으로 유저가 겪는 성능 '현상'을 발견하고, Lighthouse로 구체적인 '원인'을 도출해 렌더링 속도와 사용자 경험에 직결되는 요소를 우선순위에 두고 개선합니다."
];

/* ───────────────────── 03 Experience ───────────────────── */

export interface ShotItem {
  kind: "shot";
  label: string;
  tone?: string;
  src?: string;
}

export interface NoteItem {
  kind: "note";
  title: string;
  body: string;
  color: string;
}

export interface RoleItem {
  kind: "role";
  date: string;
  tag: "WORK" | "EDU";
  title: string;
  org: string;
  role?: string;
  stack?: string;
  color: string;
}

export type ExperienceItem = ShotItem | NoteItem | RoleItem;

export const EXP_SHOT_HEIGHT = 427;
export const EXP_TEXT_HEIGHT = 178;
const EXP_CARD_GAP = 8;
export const EXP_MOBILE_NOTE_HEIGHT = 250;
export const EXP_MOBILE_TEXT_HEIGHT = 152;
export const EXP_MOBILE_SHOT_HEIGHT = 160;

export const EXP_COLUMN_HEIGHT =
  EXP_SHOT_HEIGHT + EXP_CARD_GAP + EXP_TEXT_HEIGHT;
export const EXPERIENCE_NOTE: NoteItem = {
  kind: "note",
  title: "Work & Education",
  body: "일 경험과 교육 과정을 시간순으로 정리했습니다",
  color: "#1f271b",
};

export const EXPERIENCE_COLUMNS: ExperienceItem[][] = [
  [
    {
      kind: "shot",
      label: "(주)퍼플페퍼 썸네일",
      tone: "#f1e9df",
      src: "/images/career-bg-purplepepper.svg",
    },
    {
      kind: "role",
      date: "2025.06 — 2026.07",
      tag: "WORK",
      title: "프론트엔드 개발자",
      org: "(주)퍼플페퍼",
      role: "마케팅 플랫폼 웹 프론트엔드 개발",
      stack: "Next.js · shadcn UI · Stroybook · CWV",
      color: "#8a5418",
    },
  ],
  [
    {
      kind: "role",
      date: "2025.04 — 2025.05",
      tag: "WORK",
      title: "프론트엔드 개발자 - 인턴",
      org: "(주)나두모두",
      role: "신규 AI Agent Web UI 구현 및 리디자인 UI 퍼블리싱",
      stack: "Next.js · Ant Design",
      color: "#2a5f86",
    },
    {
      kind: "shot",
      label: "나두모두 썸네일",
      tone: "#eceee9",
      src: "/images/career-bg-nadumodu.svg",
    },
  ],
  [
    {
      kind: "shot",
      label: "협업 프로젝트 썸네일",
      tone: "#e6e1d6",
      src: "/images/career-bg-03.png",
    },
    {
      kind: "role",
      date: "2024.03 — 2024.09",
      tag: "EDU",
      title: "프론트엔드 엔지니어 부트캠프",
      org: "코드잇 평생교육원",
      role: "MVP부터 런칭까지 팀으로 함께 협업하는 과정 경험",
      stack: "React · TypeScript · Tailwind CSS · Figma",
      color: "#2c5a55",
    },
  ],
  [
    {
      kind: "role",
      date: "2022.09 — 2024.02",
      tag: "WORK",
      title: "웹 퍼블리셔 · 웹 디자이너",
      org: "솔라디자인",
      role: "UI/UX 웹 디자인 · 웹 콘텐츠 기획, 반응형 웹 퍼블리싱",
      stack: "Semantic Markup · Cross Browsing  · Responsive UI",
      color: "#a8482c",
    },
    {
      kind: "shot",
      label: "솔라디자인 썸네일",
      src: "/images/career-bg-04.png",
    },
  ],
  [
    {
      kind: "shot",
      label: "웹사이트 리뉴얼 썸네일",
      src: "/images/career-bg-05.png",
    },
    {
      kind: "role",
      date: "2022.01 — 2022.07",
      tag: "EDU",
      title: "UI/UX 웹&앱 디자인 & 프론트엔드",
      org: "강남 이젠 컴퓨터 학원",
      role: "웹 사이트 리뉴얼 기획안 작성, UX 기획 · UI 디자인 · 퍼블리싱",
      stack: "HTML5 · CSS3 · JavaScript · Photoshop",
      color: "#5a3a52",
    },
  ],
  [
    {
      kind: "role",
      date: "2021.05 — 2021.12",
      tag: "WORK",
      title: "청년 지원 매니저",
      org: "순천시청년센터",
      role: "프로그램 · 행사 기획 및 운영, SNS 홍보 콘텐츠 제작",
      stack: "Planning · Managing · Marketing",
      color: "#33402f",
    },
    {
      kind: "shot",
      label: "청년센터 썸네일",
      src: "/images/career-bg-06.jpeg",
    },
  ],
];

const endOfPeriod = (date: string) => date.split("—").pop()?.trim() ?? "";

export const CAREER_ROLES: RoleItem[] = EXPERIENCE_COLUMNS.flat()
  .filter((item): item is RoleItem => item.kind === "role")
  .sort((a, b) => endOfPeriod(b.date).localeCompare(endOfPeriod(a.date)));

/* ─────────────────────────── 02 Skills ─────────────────────────── */

export interface TechStack {
  title: string;
  color: string;
  onDark?: boolean;
  items: string[];
}

export const TECH_STACKS: TechStack[] = [
  {
    title: "Frontend",
    color: "#f2efdc",
    items: [
      "React · Next.js",
      "TypeScript · JavaScript",
      "Tailwind CSS · SCSS",
      "HTML5",
    ],
  },
  {
    title: "Development",
    color: "#e07a5f",
    items: [
      "Git",
      "GitHub Actions",
      "Google Analytics",
      "Lighthouse",
    ],
  },
  {
    title: "Collaboration",
    color: "#1f271b",
    onDark: true,
    items: ["Figma", "GitHub", "Swagger", "Storybook", "Claude Code"],
  },
];

export const STACK_HEIGHT = "clamp(320px, 56vh, 560px)";

/* ─────────────────────────── 04 Personal ─────────────────────────── */

export const FEATURED_POST = posts.featured;
export const POSTS = posts.list;
