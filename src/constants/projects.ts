import { CLIENT_SITE_SHOTS, PROJECT_DETAILS } from "@constants/projectDetails";
import { PUB_WORKS } from "@constants/publishing";

export type ProjectGroup = "work" | "side" | "toy";

export const PLATFORM_OPTIONS = ["웹", "모바일"] as const;
export const WORK_TYPE_OPTIONS = ["프론트엔드 개발", "퍼블리싱", "웹 디자인"] as const;
export const INVOLVEMENT_OPTIONS = ["신규 구축", "레거시 현대화"] as const;

export type Platform = (typeof PLATFORM_OPTIONS)[number];
export type WorkType = (typeof WORK_TYPE_OPTIONS)[number];
export type Involvement = (typeof INVOLVEMENT_OPTIONS)[number];

export interface ProjectSummary {
  id: number;
  group: ProjectGroup;
  meta: string;
  year: string;
  title: string;
  summary: string;
  highlights: string[];
  stack: string[];
  thumb: string;
  // 외부 사이트 링크. 있을 때만 카드에 '사이트 보기' 버튼을 보여 준다
  href?: string;
  // 퍼블리싱 카드를 누르면 함께 띄우는 작업 화면 이미지
  workSrc?: string;
  // 클릭 시 이동할 상세 페이지 id. 없으면 id를 쓴다
  detailId?: number;
  platforms: Platform[];
  workTypes: WorkType[];
  involvement: Involvement;
}

// 그룹 안에서는 여러 개를 고를 수 있고(OR), 그룹끼리는 모두 만족해야 한다(AND). 빈 배열은 전체
export interface ProjectFilters {
  platform: Platform[];
  workType: WorkType[];
  involvement: Involvement[];
}

export const EMPTY_PROJECT_FILTERS: ProjectFilters = {
  platform: [],
  workType: [],
  involvement: [],
};

// 산업 그룹은 숨겼다. 데이터(industry)와 조건 함수는 남겨 두어 다시 켤 수 있다
export const PROJECT_FILTER_GROUPS = [
  { key: "platform", label: "플랫폼", options: PLATFORM_OPTIONS },
  { key: "workType", label: "작업 구분", options: WORK_TYPE_OPTIONS },
  { key: "involvement", label: "관여 유형", options: INVOLVEMENT_OPTIONS },
] as const;

// 목록 요약의 스택과 상세 스펙의 스택을 합쳐, 검색어가 어느 쪽에 있어도 찾도록 한다
export function projectStackNames(project: ProjectSummary) {
  const detail = PROJECT_DETAILS[project.detailId ?? project.id];
  return [...project.stack, ...(detail?.spec.stack.map((item) => item.name) ?? [])];
}

export function matchesProjectFilters(
  project: ProjectSummary,
  filters: ProjectFilters,
  stackQuery = "",
) {
  // 그룹이 비었으면 통과, 아니면 프로젝트의 값 중 하나라도 고른 값에 들어 있어야 한다
  const inGroup = (selected: readonly string[], values: readonly string[]) =>
    selected.length === 0 || values.some((value) => selected.includes(value));

  const platformMatched = inGroup(filters.platform, project.platforms);
  const workTypeMatched = inGroup(filters.workType, project.workTypes);
  const involvementMatched = inGroup(filters.involvement, [project.involvement]);

  // 검색어는 공백으로 나눈 단어가 모두 어떤 스택 이름에 들어 있어야 한다(대소문자 무시)
  const terms = stackQuery.toLowerCase().split(/\s+/).filter(Boolean);
  const names = projectStackNames(project).map((name) => name.toLowerCase());
  const stackMatched = terms.every((term) => names.some((name) => name.includes(term)));

  return platformMatched && workTypeMatched && involvementMatched && stackMatched;
}

// 한 그룹에서 값을 넣거나 뺀다. value가 null이면 그 그룹을 전체로 비운다
export function toggleProjectFilter(
  filters: ProjectFilters,
  key: keyof ProjectFilters,
  value: string | null,
): ProjectFilters {
  if (value === null) return { ...filters, [key]: [] };
  const current = filters[key] as string[];
  const next = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];
  return { ...filters, [key]: next };
}
export const PROJECTS: ProjectSummary[] = [
  {
    id: 7,
    group: "work",
    platforms: ["웹"],
    workTypes: ["프론트엔드 개발"],
    involvement: "신규 구축",
    meta: "(주)퍼플페퍼",
    year: "2025.06",
    title: "소상공인 리워드 마케팅 플랫폼",
    summary: "리워드 마케팅 플랫폼의 광고주·운영자용 웹과 공통 UI 패키지를 개발·유지보수하며 멀티 앱 서비스의 사용자 경험을 개선했습니다.",
    highlights: [
      "광고주·운영·비즈·참여자 4개 앱이 공유하는 공통 UI 컴포넌트와 색상 토큰 체계를 정비해 서비스 전반의 UI 일관성을 확보했습니다.",
      "광고주 앱 첫 화면의 리소스 로딩 우선순위를 재설계하고 미사용 자산·의존성을 정리해 초기 로드 비용을 절감했습니다.",
      "AI·OCR 결과를 사용자가 확인·수정한 뒤 적용하는 검수 플로우를 설계해 인식 오류와 생성 중 이탈에도 입력 데이터를 보존했습니다.",
    ],
    stack: ["Next.js", "TypeScript", "TanStack Query", "Tailwind CSS"],
    thumb: "/images/sections/04/thumbnail-reward-marketing.svg",
  },
  {
    id: 8,
    group: "work",
    platforms: ["웹"],
    workTypes: ["프론트엔드 개발"],
    involvement: "신규 구축",
    meta: "(주)퍼플페퍼",
    year: "2025.08",
    title: "화이트라벨 캠페인 관리 플랫폼",
    summary: "화이트라벨 B2B 어드민의 프론트엔드를 개발하며 멀티 브랜드 테마와 공통 컴포넌트 구조를 설계했습니다.",
    highlights: [
      "운영 화면 9곳의 정렬·검색·페이지네이션을 headless 테이블 구조로 공통화해 어드민 전반에 일관된 데이터 조회 경험을 제공했습니다.",
      "하나의 코드베이스로 제휴사 브랜드를 늘리는 화이트라벨 테마 구조를 설계해 신규 브랜드 추가를 설정 중심 작업으로 전환했습니다.",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Storybook", "Vite"],
    thumb: "/images/sections/04/thumbnail-whitelabel.svg",
  },
  {
    id: 1,
    group: "side",
    platforms: ["웹"],
    workTypes: ["프론트엔드 개발"],
    involvement: "신규 구축",
    meta: "팀 프로젝트",
    year: "2025.02",
    title: "미루지마",
    summary: "일정 관리 서비스의 대시보드와 할 일 관리 화면을 개발하며 팀의 프론트엔드 개발 환경과 코드 규칙을 구축했습니다.",
    highlights: [
      "전체·주간·목표별 진행률 지표의 집계 로직을 공통화해 대시보드 전반에서 일관된 지표를 제공했습니다.",
      "변경 범위에 따라 캐시 갱신 전략을 분리해 할 일의 완료·삭제 결과를 서버 상태와 즉시 동기화했습니다.",
      "Git hook 기반 커밋 단계 정적 분석을 도입해 프론트엔드 4명의 코드 규칙을 자동으로 통일했습니다.",
    ],
    stack: ["Next.js", "Tailwind CSS", "Recharts", "Zustand"],
    thumb: "/images/sections/04/thumbnail-mirujima.png",
  },
  {
    id: 2,
    group: "toy",
    platforms: ["웹"],
    workTypes: ["프론트엔드 개발"],
    involvement: "신규 구축",
    meta: "프론트엔드 팀 프로젝트",
    year: "2024.07",
    title: "K-venture",
    summary: "체험 예약 서비스의 상세·내 정보 화면을 개발하며 서비스 방향과 UI 디자인을 제안해 팀의 구현 기준을 세웠습니다.",
    highlights: [
      "서비스 컨셉과 Figma UI를 제안해 팀의 제품 방향을 정립했습니다.",
      "TanStack Query 프리패칭과 이전 데이터 유지를 적용해 후기 페이지네이션의 로딩 깜빡임을 제거하고 다음 페이지를 대기 없이 렌더링했습니다.",
      "반응형 이미지 갤러리와 이미지 폴백을 설계해 기기·로딩 상태와 관계없이 상세 화면의 레이아웃 안정성을 확보했습니다.",
    ],
    stack: ["Next.js", "TanStack Query", "Jotai"],
    thumb: "/images/sections/04/thumbnail-kventure.png",
  },
  {
    id: 3,
    group: "toy",
    platforms: ["웹"],
    workTypes: ["프론트엔드 개발"],
    involvement: "신규 구축",
    meta: "프론트엔드 팀 프로젝트",
    year: "2024.06",
    title: "페이플러스",
    summary: "구인·구직 서비스의 가게 등록·관리 화면을 개발하며 등록과 편집에 함께 쓰는 공통 폼을 설계했습니다.",
    highlights: [
      "가게 등록·수정을 하나의 폼 구조로 설계해 두 흐름에 동일한 유효성 검사 규칙을 적용했습니다.",
      "S3 Presigned URL 기반 이미지 업로드 흐름을 설계해 업로드 상태와 저장 데이터의 정합성을 확보했습니다.",
    ],
    stack: ["Next.js", "SSR", "SCSS"],
    thumb: "/images/sections/04/thumbnail-payplus.png",
  },
  {
    id: 4,
    group: "toy",
    platforms: ["웹"],
    workTypes: ["프론트엔드 개발"],
    involvement: "신규 구축",
    meta: "프론트엔드 팀 프로젝트",
    year: "2024.04",
    title: "오픈마인드",
    summary:
      "익명 Q&A 서비스의 질문 작성·목록 화면을 개발하며 사용성 개선을 제안해 반영하고 팀 문서를 관리했습니다.",
    highlights: [
      "서비스를 사용해 보며 질문 작성 진입점 문제를 발견해 UI 개선을 제안하고 반영했습니다.",
      "무한 스크롤에 요청 가드를 설계해 마지막 항목 이후의 불필요한 API 호출을 차단했습니다.",
      "SPA 배포 환경에 라우팅 fallback을 설정해 딥링크 접근과 새로고침 시 나던 404를 해결했습니다.",
    ],
    stack: ["React", "Tailwind CSS", "Fetch API"],
    thumb: "/images/sections/04/thumbnail-openmind.png",
  },
  {
    id: 6,
    group: "work",
    platforms: ["웹"],
    workTypes: ["퍼블리싱", "웹 디자인"],
    involvement: "신규 구축",
    meta: "솔라디자인",
    year: "2022.09",
    title: "클라이언트 사이트 제작",
    summary: "업종별 클라이언트 웹사이트를 기획·디자인·퍼블리싱하며 반복되는 제작 과정을 표준화했습니다.",
    highlights: [
      "업종별 클라이언트 요구사항을 정보 구조와 디자인 시안으로 정의하고 반응형 웹으로 구현해 기존 클라이언트의 재의뢰를 받았습니다.",
      "공통 레이아웃과 시맨틱 마크업·반응형 그리드 규칙을 팀 퍼블리싱 표준 가이드로 정립해 후속 사이트 제작의 일관성과 생산성을 높였습니다.",
      "Chrome·Safari·Edge 크로스 브라우징 검수와 웹 접근성 가이드를 적용해 PC·태블릿·모바일 전 환경의 UI 호환성을 확보했습니다.",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "Photoshop"],
    thumb: "/images/career-bg-04.png",
  },
];

// 기존 사이트를 새로 만든 사이트(pub-23-66). 나머지는 신규 구축이다
const LEGACY_SITES = new Set(["종합병원"]);

// 디자인 없이 퍼블리싱만 맡은 사이트(pub-24-93). 나머지는 디자인까지 맡았다
const PUBLISH_ONLY_SITES = new Set(["공간 디자인 스튜디오"]);

// 클라이언트 사이트 제작(id 6)의 작업 갤러리를 목록 아이템으로 펼친다. 상세는 상위 프로젝트 페이지로 간다
const CLIENT_PARENT_ID = 6;
const CLIENT_SITE_ITEMS: ProjectSummary[] = CLIENT_SITE_SHOTS.map((shot, index) => {
  const parent = PROJECTS.find((project) => project.id === CLIENT_PARENT_ID);

  // 작업 갤러리와 같은 발행물(pub) 이미지·연도를 쓴다
  const pub = PUB_WORKS.find((work) => work.caseName === shot.name);

  return {
    id: 601 + index,
    detailId: CLIENT_PARENT_ID,
    group: "work",
    meta: parent?.meta ?? "",
    year: String(pub?.year ?? ""),
    title: shot.name,
    summary: shot.summary ?? "",
    highlights: [],
    stack: parent?.stack ?? [],
    thumb: pub?.src ?? shot.src,
    href: shot.href,
    workSrc: shot.src,
    platforms: ["웹"],
    workTypes: PUBLISH_ONLY_SITES.has(shot.name) ? ["퍼블리싱"] : ["퍼블리싱", "웹 디자인"],
    involvement: LEGACY_SITES.has(shot.name) ? "레거시 현대화" : "신규 구축",
  };
});

// 목록 화면에 보여 줄 전체 아이템(상세 라우팅·이전/다음 이동에는 PROJECTS를 그대로 쓴다)
// 클라이언트 사이트 제작(id 6)은 목록에서 뺀다. 개별 사이트 아이템의 상세 링크와 홈 폴더가 이 데이터를 쓰므로 PROJECTS에는 남긴다
// export const LIST_ITEMS: ProjectSummary[] = [...PROJECTS, ...CLIENT_SITE_ITEMS];
export const LIST_ITEMS: ProjectSummary[] = [
  ...PROJECTS.filter((project) => project.id !== CLIENT_PARENT_ID),
  ...CLIENT_SITE_ITEMS,
];

export const PROJECT_SECTIONS = [
  { key: "work" as const, label: "실무" },
  { key: "side" as const, label: "사이드 프로젝트" },
  { key: "toy" as const, label: "토이 프로젝트" },
];

export function groupLabel(group: ProjectGroup) {
  return PROJECT_SECTIONS.find((section) => section.key === group)?.label ?? "";
}

export function projectsIn(group: ProjectGroup) {
  return PROJECTS.filter((project) => project.group === group);
}
