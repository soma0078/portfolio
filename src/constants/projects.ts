export type ProjectGroup = "work" | "side";

export interface ProjectSummary {
  id: number;
  group: ProjectGroup;
  meta: string;
  year: string;
  title: string;
  summary: string;
  highlights: string[];
  stack: string;
  showcase?: boolean;
  thumb: string;
}
export const PROJECTS: ProjectSummary[] = [
  {
    id: 7,
    group: "work",
    meta: "퍼플페퍼",
    year: "2025.06 — 2026.07",
    title: "언더더딜 - 모노레포 기반 셀프 마케팅 플랫폼",
    summary:
      "사업자가 미션을 등록하고 사용자의 참여를 통해 매장을 홍보할 수 있는 셀프 마케팅 플랫폼",
    highlights: [
      "3개 앱의 미션·분석·운영 기능을 화면 단위로 담당",
      "web-vitals RUM으로 실사용 환경의 성능 상태를 확인하고 에셋·번들·캐싱 개선",
      "사업자등록증 OCR 검증 흐름 설계",
    ],
    stack:
      "NEXT.JS 16 · REACT 19 · TYPESCRIPT · MONOREPO · TAILWIND CSS · SHADCN/UI · HIGHCHARTS",
    thumb: "/images/sections/04/thumbnail-under-the-deal.svg",
  },
  {
    id: 8,
    group: "work",
    meta: "퍼플페퍼",
    year: "2025.08 — 2025.11",
    title: "캠페인 관리 어드민 — 멀티테넌트 기반 화이트라벨 플랫폼",
    summary:
      "제휴사가 각자의 브랜드로 캠페인을 등록하고 캐시를 배분·정산하는 멀티테넌트 어드민",
    highlights: [
      "차트 대시보드·접수시간 설정·회원 관리 등 주요 어드민 화면 구현",
      "색·모양은 브랜드별 테마 파일로, 배치가 다른 화면은 컴포넌트로 분리",
      "두 앱의 공통 UI 프리미티브를 구현하고 공유 패키지로 구성",
    ],
    stack:
      "REACT 19 · VITE · TYPESCRIPT · TAILWIND CSS · TANSTACK QUERY · TANSTACK TABLE · SHADCN/UI · STORYBOOK",
    thumb: "/images/sections/04/thumbnail-whitelabel.svg",
  },
  {
    id: 5,
    group: "side",
    meta: "PERSONAL",
    year: "2026",
    title: "포트폴리오 사이트",
    summary:
      "경험과 어떤 문제를 해결하며 서비스를 만들어 왔는지 담은 개인 포트폴리오",
    highlights: [
      "styled-components를 Tailwind CSS v4로 전면 마이그레이션",
      "GSAP ScrollSmoother·ScrollTrigger로 스크롤 연출",
      "티스토리 RSS를 빌드 타임에 받아 글 목록을 정적으로 생성",
    ],
    stack: "REACT · TYPESCRIPT · TAILWIND CSS · GSAP · VITE",
    thumb: "/images/sections/04/thumbnail-portfolio.png",
  },
  {
    id: 1,
    group: "side",
    meta: "TEAM",
    year: "2025",
    title: "미루지마",
    summary:
      "뽀모도로 타이머, 목표 설정, 할 일 목록, 노트 작성 기능을 제공하는 업무 및 학습 관리 서비스",
    highlights: [
      "Intersection Observer와 TanStack Query를 활용해 할 일 목록 무한 스크롤 구현",
      "완료율 계산 로직을 공통화해 월별·일별·목표별 차트에 재사용",
      "AES-CBC 암호화를 적용해 비밀번호를 암호화된 형태로 전송",
    ],
    stack: "NEXT.JS · TYPESCRIPT · TANSTACK QUERY · ZUSTAND · TAILWIND CSS",
    thumb: "/images/sections/04/thumbnail-mirujima.png",
  },
  {
    id: 2,
    group: "side",
    meta: "TEAM",
    year: "2024",
    title: "K-venture",
    summary: "지역 주민들이 등록한 한국 체험을 여행자와 연결하는 온라인 플랫폼",
    highlights: [
      "체험 상세 이미지를 데스크톱에서는 그리드, 모바일에서는 Swiper로 구성",
      "TanStack Query 프리패칭을 적용해 후기 페이지 전환 시 다음 데이터 미리 로드",
      "상세 진입 시 스켈레톤 UI로 로딩 피드백 제공",
    ],
    stack: "NEXT.JS · TYPESCRIPT · TANSTACK QUERY · JOTAI · TAILWIND CSS",
    thumb: "/images/sections/04/thumbnail-kventure.png",
  },
  {
    id: 3,
    group: "side",
    meta: "TEAM",
    year: "2024",
    title: "페이플러스",
    summary: "급한 일손을 빠르게 찾고, 높은 시급으로 일자리를 매칭하는 서비스",
    highlights: [
      "가게 정보 페이지를 SSR로 구성하고 폼 입력값을 화면에 즉시 반영",
      "Daum 우편번호 API를 연동해 주소 검색 및 자동 입력 구현",
      "S3 presigned URL을 활용해 이미지를 직접 업로드하도록 구현",
    ],
    stack: "NEXT.JS · TYPESCRIPT · SCSS · VERCEL",
    thumb: "/images/sections/04/thumbnail-payplus.png",
  },
  {
    id: 4,
    group: "side",
    meta: "TEAM",
    year: "2024",
    title: "오픈마인드",
    summary:
      "익명으로 자유롭게 질문하고, 다양한 답변을 통해 궁금증을 해결할 수 있는 플랫폼.",
    highlights: [
      "질문 작성 모달 UI와 바깥 영역 클릭 시 닫힘 처리 구현",
      "loading 상태를 요청 조건에 포함해 무한 스크롤 중복 요청 방지",
    ],
    stack: "REACT · JAVASCRIPT · TAILWIND CSS · NETLIFY",
    thumb: "/images/sections/04/thumbnail-openmind.png",
  },
  {
    id: 6,
    group: "work",
    meta: "솔라디자인",
    year: "2022.09 — 2024.02",
    title: "클라이언트 사이트 제작",
    summary:
      "병원·제조 기업·쇼핑몰 등 클라이언트 사이트를 구축한 웹 에이전시 실무",
    highlights: [
      "주당 2~3건을 병행하며 1년 6개월간 약 40개 사이트 제작·납품",
      "시맨틱 마크업·반응형 그리드 규칙을 퍼블리싱 가이드로 정리해 프로젝트 간 재사용 확보",
      "슬라이더·탭·스크롤 애니메이션 등 동적 UI를 구현하고 반응형·크로스 브라우징 대응",
    ],
    stack: "HTML5 · CSS3 · JAVASCRIPT · JQUERY",
    showcase: true,
    thumb: "/images/career-bg-04.png",
  },
];

export const PROJECT_SECTIONS = [
  { key: "work" as const, label: "Work" },
  { key: "side" as const, label: "Side Project" },
];

export function groupLabel(group: ProjectGroup) {
  return PROJECT_SECTIONS.find((section) => section.key === group)?.label ?? "";
}

export function projectsIn(group: ProjectGroup) {
  return PROJECTS.filter((project) => project.group === group);
}
