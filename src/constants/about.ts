import posts from "./posts.generated.json";

/* ─────────────────────────── 01 About ─────────────────────────── */

export const ABOUT_HERO = ["무엇을 만들지보다", "왜 필요한지를 고민합니다."];

export const ABOUT_BIO = [
  "화면뿐 아니라 그 안의 데이터와 흐름까지 함께 살핍니다. 기획과 디자인에서 정의되지 않은 엣지 케이스나 API 스펙에서 논의가 필요한 부분을 먼저 정리해 기획·디자인·백엔드에 제안하고, 구현할 내용을 함께 결정합니다.",
  "구현한 기능은 실제 서비스 환경에서 다시 검증합니다. QA 시나리오를 기록하고, 사용자가 마주할 화면과 흐름을 거듭 점검하며, 발견한 문제를 수정하고 재검증합니다.",
  "실제 사용 환경의 지표도 함께 확인합니다. GA4로 사용자 성능 지표를 확인하고 Lighthouse로 병목 원인을 분석해, 실제 렌더링 성능에 직결되는 요소를 우선순위에 두고 개선합니다.",
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
      label: "퍼플페퍼 썸네일",
      tone: "#f1e9df",
      src: "/images/career-bg-purplepepper.svg",
    },
    {
      kind: "role",
      date: "2025.06 — 2026.07",
      tag: "WORK",
      title: "프론트엔드 개발자",
      org: "(주)퍼플페퍼",
      role: "신규 서비스 프론트엔드 개발, 운영 및 품질 개선",
      stack: "MONOREPO · SHADCN/UI · WEB VITALS",
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
      role: "신규 서비스 화면 구현, UI 렌더링 테스트 코드 작성",
      stack: "NEXT.JS · ANT DESIGN · PLAYWRIGHT",
      color: "#2c5a55",
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
      date: "2024.03 — 2025.03",
      tag: "EDU",
      title: "프론트엔드 6기 · 단기심화 7기",
      org: "코드잇",
      role: "MVP부터 런칭까지, 팀으로 함께 개발하는 과정을 경험",
      stack: "REACT · TYPESCRIPT · TAILWIND CSS",
      color: "#33402f",
    },
  ],
  [
    {
      kind: "role",
      date: "2022.09 — 2024.02",
      tag: "WORK",
      title: "Web Publisher · Designer",
      org: "솔라디자인",
      role: "클라이언트 웹사이트 기획, 디자인, 퍼블리싱과 반응형 UI 구현",
      stack: "UI/UX DESIGN · RESPONSIVE WEB",
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
      role: "웹사이트 리뉴얼 프로젝트 6건을 진행하며 UI/UX 기획부터 디자인, 구현까지 경험",
      stack: "HTML5 · CSS3 · JAVASCRIPT · JQUERY · ADOBE PHOTOSHOP",
      color: "#2a5f86",
    },
  ],
  [
    {
      kind: "role",
      date: "2021.05 — 2021.12",
      tag: "WORK",
      title: "청년 프로그램 매니저",
      org: "순천시청년센터",
      role: "청년 프로그램 기획·운영, 정책 관련 행정 업무 보조",
      stack: "PLANNING · OPERATION · CONTENT · MANGO BOARD",
      color: "#5a3a52",
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
    title: "개발 기술",
    color: "#f2efdc",
    items: ["React", "Next.js", "JavaScript", "TypeScript"],
  },
  {
    title: "상태 및 폼",
    color: "#e6d9be",
    items: [
      "TanStack Query",
      "TanStack Table",
      "Zustand",
      "React Hook Form",
      "Zod",
    ],
  },
  {
    title: "스타일링 및 마크업",
    color: "#cfe0ee",
    items: ["HTML5", "CSS3", "TailwindCSS", "Shadcn/ui", "Radix UI", "CVA"],
  },
  {
    title: "디자인",
    color: "#e07a5f",
    items: ["Figma", "Adobe Photoshop", "Adobe Illustrator"],
  },
  {
    title: "형상 관리 및 배포",
    color: "#b57328",
    onDark: true,
    items: ["Git", "Storybook", "Vercel", "Netlify", "Supabase"],
  },
  {
    title: "품질 및 개발 환경",
    color: "#1f271b",
    onDark: true,
    items: ["Lighthouse", "web-vitals", "Turborepo", "pnpm"],
  },
];

export const STACK_OFFSET = 29;
export const STACK_HEIGHT = "clamp(320px, 56vh, 560px)";

/* ─────────────────────────── 04 Personal ─────────────────────────── */

export const FEATURED_POST = posts.featured;
export const POSTS = posts.list;
