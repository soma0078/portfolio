export type ProjectTag = "TEAM" | "SIDE" | "WORK";

export interface ProjectSummary {
  id: number;
  tag: ProjectTag;
  year: string;
  title: string;
  summary: string;
  highlights: string[];
  stack: string;
  thumb: string;
}

export const PROJECTS: ProjectSummary[] = [
  {
    id: 1,
    tag: "TEAM",
    year: "2025",
    title: "미루지마",
    summary:
      "뽀모도로 타이머, 목표 설정, 할 일 목록, 노트 작성 기능을 제공하는 업무 및 학습 관리 서비스입니다.",
    highlights: [
      "완료율 계산 로직을 공통화해 월별·일별·목표별 차트에 그대로 재사용",
      "Intersection Observer와 TanStack Query로 할 일 목록 무한 스크롤 구현",
      "AES-CBC 암호화를 적용해 비밀번호 평문 전송 차단",
    ],
    stack: "NEXT.JS · TYPESCRIPT · TANSTACK QUERY · ZUSTAND · TAILWIND CSS",
    thumb: "thumbnail-mirujima",
  },
  {
    id: 5,
    tag: "SIDE",
    year: "2024 — 현재",
    title: "포트폴리오 사이트",
    summary:
      "직접 디자인하고 만든 개인 사이트입니다. 폴더 서랍을 여는 은유로 섹션을 넘나들도록 구성했습니다.",
    highlights: [
      "styled-components를 Tailwind CSS v4로 전면 마이그레이션",
      "GSAP ScrollSmoother·ScrollTrigger로 스크롤 연출과 핀 구간 구성",
      "티스토리 RSS를 빌드 타임에 받아 글 목록을 정적으로 생성",
    ],
    stack: "REACT · TYPESCRIPT · TAILWIND CSS · GSAP · VITE",
    thumb: "thumbnail-portfolio",
  },
  {
    id: 2,
    tag: "TEAM",
    year: "2024",
    title: "K-venture",
    summary:
      "지역 주민들이 제공하는 다채로운 한국 체험을 여행자와 연결하는 온라인 플랫폼입니다.",
    highlights: [
      "체험 상세 이미지를 데스크톱 그리드·모바일 Swiper로 나눠 배치",
      "TanStack Query 프리패칭으로 후기 페이지네이션 전환 속도 개선",
      "상세 진입 시 스켈레톤 UI로 로딩 피드백 제공",
    ],
    stack: "NEXT.JS · TYPESCRIPT · TANSTACK QUERY · JOTAI · TAILWIND CSS",
    thumb: "thumbnail-kventure",
  },
  {
    id: 3,
    tag: "TEAM",
    year: "2024",
    title: "페이플러스",
    summary:
      "급한 일손을 빠르게 찾고, 높은 시급으로 일자리를 매칭하는 서비스입니다.",
    highlights: [
      "가게 정보 페이지를 SSR로 구성하고 동적 폼 상태를 즉시 반영",
      "Daum 우편번호 API를 연동해 주소 검색·자동 입력 처리",
      "S3 presigned URL로 이미지를 직접 업로드하도록 구현",
    ],
    stack: "NEXT.JS · TYPESCRIPT · SCSS · VERCEL",
    thumb: "thumbnail-payplus",
  },
  {
    id: 4,
    tag: "TEAM",
    year: "2024",
    title: "오픈마인드",
    summary:
      "익명으로 자유롭게 질문하고, 다양한 답변을 통해 궁금증을 해결할 수 있는 플랫폼입니다.",
    highlights: [
      "질문 작성 모달 UI와 바깥 클릭 시 닫힘 처리 구현",
      "loading 상태를 조건에 넣어 무한 스크롤 중복 요청 차단",
    ],
    stack: "REACT · JAVASCRIPT · TAILWIND CSS · NETLIFY",
    thumb: "thumbnail-openmind",
  },
  {
    id: 6,
    tag: "WORK",
    year: "2022 — 2024",
    title: "브랜드 사이트 퍼블리싱 모음",
    summary:
      "솔라디자인에서 기획·디자인·퍼블리싱을 맡아 만든 기업·병원·쇼핑몰 사이트들입니다. 클라이언트와 직접 소통하며 납품까지 이어서 진행했습니다.",
    highlights: [
      "웹 표준·접근성을 지킨 반응형 사이트 다수 제작 (대표 5건 수록)",
      "Swiper·AOS·무한 루프 등 동적 UI를 JavaScript·jQuery로 직접 구현",
      "WordPress·Gnuboard·Cafe24 기반 구축과 크로스 브라우징 대응",
    ],
    stack: "HTML5 · CSS3 · JAVASCRIPT · JQUERY",
    thumb: "thumbnail-work-01",
  },
];

export const PROJECTS_INTRO =
  "업무로 만든 것과 개인적으로 만든 것. 무엇을 해결하려 했고 어떤 판단을 했는지를 중심으로 적었습니다.";

export const PROJECTS_CLOSING = {
  title: "함께 만들 이야기가 있다면",
  body: "작업 과정이나 코드가 더 궁금하시면 편하게 연락 주세요.",
};

export const PROJECT_FILTERS = [
  { key: "all", label: "ALL" },
  { key: "TEAM", label: "TEAM" },
  { key: "SIDE", label: "SIDE" },
  { key: "WORK", label: "WORK" },
] as const;

export type ProjectFilterKey = (typeof PROJECT_FILTERS)[number]["key"];

export function countProjects(key: ProjectFilterKey) {
  return key === "all"
    ? PROJECTS.length
    : PROJECTS.filter((project) => project.tag === key).length;
}
