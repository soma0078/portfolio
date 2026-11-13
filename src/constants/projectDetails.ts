export interface SpecSheet {
  duration: string;
  role: string;
  headcount?: string;
  feature?: string;
  featureLabel?: string;
  stack: StackItem[];
}

export interface StackItem {
  name: string;
}

export interface ShotItem {
  src: string;
  fonts?: { name: string; role?: string }[];
  colors?: { hex: string; role: string }[];
  name: string;
  note: string;
  summary?: string;
  href?: string;
}

export interface CaseItem {
  problem: string;
  approach: string;
  result: string;
}

export type DetailBlock =
  | { kind: "prose"; label: string; title: string; body: string[] }
  | { kind: "bullets"; label: string; title: string; items: string[] }
  | { kind: "cases"; label: string; title: string; items: CaseItem[] }
  | { kind: "gallery"; label: string; title: string; shots: ShotItem[] };

export interface ProjectDetail {
  lead: string;
  hero: string;
  org: string;
  spec: SpecSheet;
  links: { label: string; href: string }[];
  galleryInHero?: boolean;
  blocks: DetailBlock[];
}

const IMG = "/assets/images";

export const PROJECT_DETAILS: Record<number, ProjectDetail> = {
  7: {
    lead: "리워드형 마케팅 미션 등록 및 성과를 관리하는 마케팅 플랫폼",
    hero: "/images/sections/04/thumbnail-reward-marketing.svg",
    org: "(주)퍼플페퍼",
    spec: {
      duration: "13개월", // 2025.06 — 2026.07
      role: "프론트엔드 개발 · 운영 개선",
      headcount: "8명",
      feature: "미션 주문·성과 관리",
      stack: [
        { name: "Next.js 16" },
        { name: "React 19" },
        { name: "TypeScript" },
        { name: "Tailwind CSS" },
        { name: "Recharts" },
        { name: "Shadcn UI" },
        { name: "TanStack Query" },
        { name: "Zustand" },
      ],
    },
    links: [],
    blocks: [
      {
        kind: "prose",
        label: "CHALLENGE",
        title: "배경",
        body: [
          "광고주가 리워드형 마케팅 미션을 등록하고 매장 성과를 관리하는 마케팅 플랫폼의 사용자·영업자·관리자 웹을 Next.js 기반 모노레포로 구축한 신규 프로젝트입니다.",
        ],
      },
      {
        kind: "cases",
        label: "CONTRIBUTION",
        title: "기술 과제",
        items: [
          {
            problem: "광고주·운영·영업 앱이 공유하는 UI 패키지에서 색상 토큰 이름이 색상값과 역할로 혼재하고 광고주 웹의 빈 상태 화면 30여 곳이 개별 구현돼, 앱 간 UI 일관성을 유지하기 어려웠습니다.",
            approach: "색상을 primary·secondary·danger 등 역할 기반 시맨틱 토큰으로 재정의해 공유 패키지와 소비 앱 전반에 적용하고, 빈 상태 화면을 공통 EmptyState 컴포넌트로 통합했습니다.",
            result: "색상과 빈 상태 UI의 변경 지점이 토큰과 컴포넌트로 단일화돼 앱 간 UI 일관성과 유지보수성이 향상됐습니다.",
          },
          {
            problem: "사업자등록증 OCR 결과에는 오인식 가능성이 있었으나 업로드 화면은 파일명만 표시해, 사용자가 인식된 상호·사업자번호·주소를 확인하거나 수정할 수 없었습니다.",
            approach: "인식 결과를 확인·수정하는 공통 폼과 반응형 모달을 설계해 Zod 스키마로 필수값과 사업자번호 형식을 검증하고, 인식 실패·업로드 오류별 안내와 동일 파일 재업로드 경로를 구현했습니다.",
            result: "오인식된 값을 사용자가 확인 단계에서 교정해 사업자 정보의 정확성을 확보했고, 인식에 실패해도 재업로드로 가입 흐름을 유지했습니다.",
          },
          {
            problem: "광고주 랜딩 페이지가 대용량 SVG를 React 컴포넌트로 JS 번들에 포함하고 히어로 문구를 투명도 0에서 노출해, 첫 화면 LCP가 70.6초까지 지연됐습니다.",
            approach: "Lighthouse와 Web Vitals 지표로 지연 원인을 분석해 랜딩 SVG를 WebP 정적 이미지로 전환하고 미사용 자산·의존성을 제거했으며, 폰트 preload와 히어로 이미지 우선 로딩을 적용했습니다.",
            result: "초기 로드 JS 번들을 절감해 랜딩 페이지 LCP를 70.6초에서 8.5초로 개선했고, 첫 방문 광고주가 서비스 소개를 확인하기까지의 대기 시간을 단축했습니다.",
          },
        ],
      },
      {
        kind: "prose",
        label: "OUTCOME",
        title: "결과",
        body: [
          "FE 코드 컨벤션 정립 및 공통 컴포넌트 구축으로 개발 공수를 단축하고 출시 후 VOC 및 데이터 분석 기반 UX와 성능을 지속적으로 고도화했습니다.",
        ],
      },
    ],
  },

  /* ────────────────── 02 화이트라벨 어드민 (퍼플페퍼) ────────────────── */
  8: {
    lead: "제휴사마다 자사 브랜드로 운영하는 마케팅 캠페인 관리 B2B 어드민",
    hero: "/images/sections/04/thumbnail-whitelabel.svg",
    org: "(주)퍼플페퍼",
    spec: {
      duration: "4개월", // 2025.08 — 2025.11
      role: "프론트엔드 개발",
      headcount: "3명",
      feature: "캠페인 운영·멀티 브랜드",
      stack: [
        { name: "React" },
        { name: "Vite" },
        { name: "TypeScript" },
        { name: "TanStack Query" },
        { name: "TanStack Table" },
        { name: "Shadcn UI" },
        { name: "Storybook" },
      ],
    },
    links: [],
    blocks: [
      {
        kind: "prose",
        label: "CHALLENGE",
        title: "배경",
        body: [
          "하나의 코드베이스에서 여러 고객사 브랜드를 지원하는 화이트라벨 서비스의 공통 컴포넌트와 Storybook 문서화 체계를 구축한 프로젝트입니다.",
        ],
      },
      {
        kind: "cases",
        label: "CONTRIBUTION",
        title: "기술 과제",
        items: [
          {
            problem: "제휴사마다 동일 서비스를 자사 브랜드로 제공해야 했으나, 기존 테마 구조는 기본 색상 변경만 지원해 상태·권한 색상과 화면 구성이 다른 브랜드를 수용하지 못했습니다.",
            approach: "팔레트를 참조하는 시맨틱 토큰과 테마별 기본 variant로 브랜드 설정을 확장하고, 레이아웃이 다른 화면 17곳은 로직을 공유한 채 브랜드별 UI 컴포넌트로 분리했습니다.",
            result: "설정 추가만으로 신규 브랜드를 구성하는 확장 구조를 갖춰, 이후 브랜드 3종을 추가할 때 기존 브랜드 코드 수정은 1곳에 그쳤습니다.",
          },
          {
            problem: "사이드바 메뉴와 상태 배지 등 공통 UI가 데이터 상태·사용자 권한·브랜드 테마에 따라 다르게 표시돼, 조건별 화면을 검수하려면 개발자가 계정과 테마 환경을 바꿔 실행해야 했습니다.",
            approach: "Storybook을 도입해 브랜드별 컬러 토큰을 문서화하고, 권한별 목 데이터와 브랜드 테마를 조합한 조건별 스토리를 사이드바·버튼·상태 배지·페이지네이션에 구성했습니다.",
            result: "개발자 개입 없이 조건별 UI를 독립적으로 검수하는 환경을 갖춰 디자인 QA 과정을 단축했습니다.",
          },
          {
            problem: "회원 등록 폼의 이메일 중복 확인이 폼 전체 검증 스키마에 포함돼, 어느 항목을 입력하든 키 입력마다 중복 확인 API가 호출됐습니다.",
            approach: "중복 확인을 이메일 전용 커스텀 훅으로 분리해 디바운스를 적용하고, 형식 검증을 통과한 이메일만 API를 호출하도록 설계했습니다.",
            result: "입력이 멈춘 뒤 유효한 이메일에만 요청이 발생해 불필요한 API 호출을 제거하고 서버 부하를 완화했습니다.",
          },
        ],
      },
      {
        kind: "prose",
        label: "OUTCOME",
        title: "결과",
        body: [
          "브랜드별 테마와 UI 컴포넌트를 확장하는 멀티 브랜드 구조를 설계해 브랜드 6개의 캠페인 운영을 하나의 코드베이스로 지원했습니다.",
        ],
      },
    ],
  },

  /* ─────────────────────────── 03 미루지마 ─────────────────────────── */
  1: {
    lead: "목표별 할 일과 학습 기록을 모아 진행 상황을 확인하는 일정 관리 서비스",
    hero: "/images/sections/04/thumbnail-mirujima.png",
    org: "팀 프로젝트",
    spec: {
      duration: "4주", // 2025.02 — 2025.03
      role: "프론트엔드 개발 · 문서 관리",
      headcount: "6명",
      feature: "목표별 할 일 관리",
      stack: [
        { name: "Next.js 15" },
        { name: "TypeScript" },
        { name: "Tailwind CSS" },
        { name: "TanStack Query" },
        { name: "Zustand" },
        { name: "Vercel" },
      ],
    },
    links: [
      { label: "사이트 보기", href: "https://mirujima-fe-deploy.vercel.app" },
      { label: "GitHub", href: "https://github.com/FESI-7-4/mirujima_FE" },
    ],
    galleryInHero: true,
    blocks: [
      {
        kind: "prose",
        label: "CHALLENGE",
        title: "배경",
        body: [
          "목표별로 할 일을 관리하고 진행률과 집중 시간을 확인하는 학습 관리 서비스에서, 프론트엔드 4명이 쓰는 개발 환경과 협업 컨벤션을 구축하고 완료율 대시보드와 할 일 목록을 구현했습니다.",
        ],
      },
      {
        kind: "cases",
        label: "CONTRIBUTION",
        title: "기술 과제",
        items: [
          {
            problem: "전체·주간·목표별 완료율의 집계 범위가 상이해, 지표별로 계산식을 개별 구현하면 대시보드 수치 간 불일치가 발생할 위험이 있었습니다.",
            approach: "집계 로직을 순수 함수로 분리하고 반올림·빈 데이터 예외 처리를 공통 유틸로 표준화해 Recharts 차트와 진행률 UI에 적용했습니다.",
            result: "모든 대시보드 지표가 단일 계산 로직을 공유해 수치 신뢰성을 확보했고, 계산 규칙 변경 시 수정 지점이 한 곳으로 한정됐습니다.",
          },
          {
            problem: "대시보드 완료율과 할 일 목록이 로딩 직후 정적으로 일괄 표시돼, 데이터 변화에 대한 시각적 피드백이 부족했습니다.",
            approach: "완료율 수치에는 이징 함수 기반 카운트업 커스텀 훅을, 할 일 목록에는 Motion 라이브러리의 순차 등장(stagger) 애니메이션을 적용했습니다.",
            result: "로딩 직후 화면 전환이 자연스러워져 사용자 경험이 개선됐고, 카운트업 로직은 훅으로 분리해 차트와 진행률 바에서 재사용했습니다.",
          },
          {
            problem: "프론트엔드 4명이 동시에 개발하는 환경에서 코드 스타일과 커밋 메시지 형식이 통일되지 않았습니다.",
            approach: "Husky 훅에 lint-staged와 commitlint를 연동해 커밋 시점에 ESLint·Prettier 검사·자동 수정과 커밋 메시지 검증을 자동화했습니다.",
            result: "스타일 검사가 자동화돼 코드 리뷰가 로직 검토에 집중하는 환경을 갖췄고, 컨벤션을 따르는 커밋 이력으로 변경 추적이 용이해졌습니다.",
          },
        ],
      },
      {
        kind: "prose",
        label: "OUTCOME",
        title: "결과",
        body: [
          "대시보드를 단일 집계 로직으로 개편해, 사용자가 전체·주간·목표별 완료율을 같은 기준의 수치로 확인할 수 있게 됐습니다.",
        ],
      },
      {
        kind: "gallery",
        label: "GALLERY",
        title: "화면",
        shots: [
          {
            src: `${IMG}/mirujima_dashboard_desktop.png`,
            name: "대시보드",
            note: "완료율 · 달성률 시각화",
          },
          {
            src: `${IMG}/mirujima_goal_desktop.png`,
            name: "목표",
            note: "목표별 진행 상황",
          },
          {
            src: `${IMG}/mirujima_goalCreate_desktop.PNG`,
            name: "목표 생성",
            note: "모달 · 폼",
          },
          {
            src: `${IMG}/mirujima_todo_desktop.png`,
            name: "할 일 목록",
            note: "탭 · 무한 스크롤",
          },
          {
            src: `${IMG}/mirujima_todoCreate_desktop.PNG`,
            name: "할 일 생성",
            note: "파일 · 링크 첨부",
          },
          {
            src: `${IMG}/mirujima_note_desktop.png`,
            name: "노트",
            note: "할 일별 상세 기록",
          },
        ],
      },
    ],
  },

  /* ─────────────────────────── 04 K-venture ─────────────────────────── */
  2: {
    lead: "지역 주민이 제공하는 한국 체험을 여행자가 찾아보고 예약하는 플랫폼",
    hero: "/images/sections/04/thumbnail-kventure.png",
    org: "프론트엔드 팀 프로젝트",
    spec: {
      duration: "약 4주", // 2024.07.26 — 2024.08.30
      role: "프론트엔드 개발 · 컨셉 디자인",
      headcount: "4명",
      feature: "체험 검색·예약",
      stack: [
        { name: "Next.js" },
        { name: "TypeScript" },
        { name: "Tailwind CSS" },
        { name: "TanStack Query" },
        { name: "Jotai" },
        { name: "Kakao API" },
        { name: "Vercel" },
      ],
    },
    links: [
      { label: "사이트 보기", href: "https://k-venture-main.vercel.app" },
      { label: "GitHub", href: "https://github.com/soma0078/K-venture" },
    ],
    galleryInHero: true,
    blocks: [
      {
        kind: "prose",
        label: "CHALLENGE",
        title: "배경",
        body: [
          "지역 주민이 등록한 한국 체험을 여행자가 검색·예약하는 서비스에서, 컨셉과 UI 스타일 가이드를 제안해 팀의 디자인 기준을 세우고 체험 상세 화면과 후기 목록을 구현했습니다.",
        ],
      },
      {
        kind: "cases",
        label: "CONTRIBUTION",
        title: "기술 과제",
        items: [
          {
            problem: "후기 목록의 페이지 전환 시 이전 목록이 초기화되고 새 데이터를 받는 동안 빈 화면이 노출돼, 콘텐츠 탐색 흐름이 끊겼습니다.",
            approach: "TanStack Query 기반 공통 페이지네이션 훅을 설계해 keepPreviousData로 전환 중 이전 목록을 유지하고, 다음 페이지가 존재할 때만 prefetchQuery로 선행 요청했습니다.",
            result: "페이지 전환 시 대기 없이 후기가 표시돼 탐색 경험이 개선됐고, 마지막 페이지 이후의 불필요한 요청을 방지했습니다.",
          },
          {
            problem: "프로젝트 주제와 디자인 기준이 정의되지 않아, 팀원 간 화면 설계와 컴포넌트 구현의 일관성을 확보하기 어려웠습니다.",
            approach: "한국 여행 체험으로 서비스 컨셉을 제안하고, Figma에서 타이포그래피·그리드·시맨틱 컬러 토큰 기반 스타일 가이드와 공통 컴포넌트를 설계했습니다.",
            result: "팀 전체가 하나의 디자인 기준을 공유해 서비스 전반의 UI 일관성을 확보했습니다.",
          },
        ],
      },
      {
        kind: "prose",
        label: "OUTCOME",
        title: "결과",
        body: [
          "스타일 가이드와 시맨틱 컬러 토큰, 공통 컴포넌트를 팀의 화면 설계 기준으로 제공해 서비스 전반의 UI 일관성을 유지했고, 공통 페이지네이션 훅으로 후기 탐색의 끊김을 해소했습니다.",
        ],
      },
      {
        kind: "gallery",
        label: "GALLERY",
        title: "화면",
        shots: [
          {
            src: `${IMG}/kventure_activity_page.png`,
            name: "체험 상세",
            note: "그리드 이미지 · 후기",
          },
          {
            src: `${IMG}/kventure_search_page.png`,
            name: "체험 검색",
            note: "카테고리 · 가격순 필터",
          },
          {
            src: `${IMG}/kventure_activity_register_page.png`,
            name: "체험 등록",
            note: "폼 · 이미지 업로드",
          },
          {
            src: `${IMG}/kventure_reservation_list.png`,
            name: "예약 내역",
            note: "승인 · 거절 관리",
          },
          {
            src: `${IMG}/kventure_my_activity_page.png`,
            name: "내 체험 관리",
            note: "등록 · 수정 · 삭제",
          },
          {
            src: `${IMG}/kventure_mypage.png`,
            name: "내 정보",
            note: "Jotai 상태 동기화",
          },
        ],
      },
    ],
  },

  /* ─────────────────────────── 05 페이플러스 ─────────────────────────── */
  3: {
    lead: "일손이 필요한 사장님과 단기 아르바이트를 찾는 구직자를 연결하는 서비스",
    hero: "/images/sections/04/thumbnail-payplus.png",
    org: "프론트엔드 팀 프로젝트",
    spec: {
      duration: "약 3주", // 2024.06.21 — 2024.07.09
      role: "프론트엔드 개발",
      headcount: "5명",
      feature: "공고 등록·지원",
      stack: [{ name: "Next.js" }, { name: "TypeScript" }, { name: "SCSS" }, { name: "AWS S3" }, { name: "Vercel" }],
    },
    links: [
      {
        label: "사이트 보기",
        href: "https://payplus-x.vercel.app/listPage",
      },
      { label: "GitHub", href: "https://github.com/soma0078/PayPlus" },
    ],
    galleryInHero: true,
    blocks: [
      {
        kind: "prose",
        label: "CHALLENGE",
        title: "배경",
        body: [
          "급하게 일손이 필요한 사장님과 단기 일자리를 찾는 구직자를 연결하는 서비스에서, 사장님이 가게를 등록·수정하는 화면과 주소 검색·이미지 업로드를 구현했습니다.",
        ],
      },
      {
        kind: "cases",
        label: "CONTRIBUTION",
        title: "기술 과제",
        items: [
          {
            problem: "가게 등록과 편집이 동일한 입력 항목을 사용해, 폼을 분리 구현하면 검증 규칙이 중복되고 불일치할 위험이 있었습니다.",
            approach: "등록·편집 모드를 단일 폼 컴포넌트로 통합해 유효성 검증 로직을 공유하고, 편집 모드는 getServerSideProps(SSR)로 기존 데이터를 조회해 초기값으로 주입했습니다.",
            result: "검증 규칙의 단일 관리로 두 모드의 입력 정합성을 보장했고, 편집 화면은 데이터가 채워진 상태로 렌더링돼 로딩 중 빈 폼이 노출되지 않았습니다.",
          },
          {
            problem: "S3 Presigned URL은 서명 쿼리스트링을 포함해, 업로드 URL을 그대로 저장하면 서명 만료 후 이미지 접근이 불가능했습니다.",
            approach: "Presigned URL로 클라이언트에서 S3에 업로드하고, 업로드 성공 후 쿼리스트링을 제거한 객체 URL을 미리보기와 폼 상태에 반영했습니다.",
            result: "가게 이미지가 만료되지 않는 객체 URL로 저장돼, 등록 이후에도 이미지 깨짐 없이 안정적으로 노출됐습니다.",
          },
        ],
      },
      {
        kind: "prose",
        label: "OUTCOME",
        title: "결과",
        body: [
          "편집 화면에 SSR을 적용해 기존 가게 데이터가 채워진 상태로 렌더링되도록 개선했고, 등록·편집 폼을 단일 컴포넌트로 통합해 검증 규칙의 일관성을 확보했습니다.",
        ],
      },
      {
        kind: "gallery",
        label: "GALLERY",
        title: "화면",
        shots: [
          {
            src: `${IMG}/payplus_store_page_owner.png`,
            name: "내 가게 (사장님)",
            note: "SSR · 동적 폼",
          },
          {
            src: `${IMG}/payplus_staff_page.png`,
            name: "공고 목록",
            note: "필터 · 정렬",
          },
          {
            src: `${IMG}/payplus_store_page_staff.png`,
            name: "공고 상세 (알바님)",
            note: "신청 · 취소",
          },
          {
            src: `${IMG}/payplus_store_page_mobile.png`,
            name: "가게 화면 (모바일)",
            note: "반응형",
          },
          {
            src: `${IMG}/payplus_store_register_mobile.png`,
            name: "가게 등록 (모바일)",
            note: "주소 검색 · 이미지 업로드",
          },
        ],
      },
    ],
  },

  /* ─────────────────────────── 06 오픈마인드 ─────────────────────────── */
  4: {
    lead: "익명 질문 작성과 답변 기능을 갖춘 React 기반 Q&A 서비스",
    hero: "/images/sections/04/thumbnail-openmind.png",
    org: "프론트엔드 팀 프로젝트",
    spec: {
      duration: "약 2주", // 2024.04.30 — 2024.05.15
      role: "프론트엔드 개발 · 문서 관리",
      headcount: "5명",
      feature: "질문 작성·답변",
      stack: [
        { name: "React" },
        { name: "JavaScript" },
        { name: "Tailwind CSS" },
        { name: "Fetch API" },
        { name: "Netlify" },
      ],
    },
    links: [
      { label: "사이트 보기", href: "https://openyourmind.netlify.app" },
      { label: "GitHub", href: "https://github.com/soma0078/Openmind" },
    ],
    galleryInHero: true,
    blocks: [
      {
        kind: "prose",
        label: "CHALLENGE",
        title: "배경",
        body: [
          "궁금한 점을 익명으로 묻고 답변받는 Q&A 서비스에서, 질문 작성과 목록 화면을 구현하고 작성 동선 개선을 제안했으며 팀 문서를 관리했습니다.",
        ],
      },
      {
        kind: "cases",
        label: "CONTRIBUTION",
        title: "기술 과제",
        items: [
          {
            problem: "질문이 누적될수록 핵심 CTA인 질문 작성 버튼이 목록 하단에 위치해, 작성 진입까지 스크롤이 필요했습니다.",
            approach: "사용 흐름을 점검하며 문제를 발견해 작성 버튼의 상단 배치를 팀에 제안하고 화면에 반영했습니다.",
            result: "질문 수와 관계없이 첫 화면에서 작성에 진입하도록 동선이 단축돼 질문 작성 접근성이 개선됐습니다.",
          },
          {
            problem: "클라이언트 사이드 라우팅 기반 SPA의 특성상, 배포 환경에서 상세 페이지 URL로 진입하거나 새로고침하면 서버가 경로를 인식하지 못해 404가 발생했습니다.",
            approach: "Netlify `_redirects`에 모든 경로를 index.html로 응답하는 SPA fallback 규칙을 적용했습니다.",
            result: "공유 링크 진입과 새로고침 시에도 상세 페이지가 정상 렌더링돼, 링크 공유 기반 서비스의 핵심 유입 경로를 정상화했습니다.",
          },
        ],
      },
      {
        kind: "prose",
        label: "OUTCOME",
        title: "결과",
        body: [
          "React SPA의 클라이언트 라우팅으로 발생한 404를 Netlify fallback 규칙으로 해소해 공유 링크 진입과 새로고침이 정상 동작하도록 개선했고, 작성 버튼 상단 배치 제안으로 질문 작성 접근성을 높였습니다.",
        ],
      },
      {
        kind: "gallery",
        label: "GALLERY",
        title: "화면",
        shots: [
          {
            src: `${IMG}/openmind_main_page.png`,
            name: "메인",
            note: "피드 생성",
          },
          {
            src: `${IMG}/openmind_list_page.png`,
            name: "질문 목록",
            note: "무한 스크롤",
          },
          {
            src: `${IMG}/openmind_question_page.png`,
            name: "질문 상세",
            note: "답변 · 수정 · 삭제",
          },
          {
            src: `${IMG}/openmind_modal.png`,
            name: "질문 작성 모달",
            note: "바깥 클릭 시 닫힘",
          },
        ],
      },
    ],
  },

  /* ─────────────────── 07 주요 웹사이트 작업 ─────────────────── */
  6: {
    lead: "병원·제조 기업·쇼핑몰 등 업종과 목적에 맞춘 클라이언트 웹사이트 제작",
    hero: "/images/career-bg-04.png",
    org: "솔라디자인",
    spec: {
      duration: "18개월", // 2022.09 — 2024.02
      role: "기획 · 디자인 · 퍼블리싱",
      headcount: "1명",
      feature: "업종 맞춤 기업 웹사이트",
      featureLabel: "제작 유형",
      stack: [
        { name: "HTML5" },
        { name: "CSS3" },
        { name: "JavaScript" },
        { name: "WordPress" },
        { name: "Gnuboard" },
        { name: "Adobe Photoshop" },
        { name: "Adobe Illustrator" },
      ],
    },
    links: [],
    blocks: [
      {
        kind: "prose",
        label: "CHALLENGE",
        title: "배경",
        body: [
          "병원·제조 기업·쇼핑몰 등 클라이언트의 사업을 소개하는 웹사이트를 요구사항 분석과 디자인 시안 제안부터 반응형 퍼블리싱, 오픈과 운영 인계를 담당했습니다.",
        ],
      },
      {
        kind: "cases",
        label: "CONTRIBUTION",
        title: "기술 과제",
        items: [
          {
            problem: "사이트마다 헤더·푸터·콘텐츠 배치를 새로 제작하고 마크업 구조와 클래스 이름 규칙이 작업자마다 상이해, 초기 제작에 반복 작업이 발생하고 사이트 간 품질 편차가 생겼습니다.",
            approach: "디자인 유형별 레이아웃 패턴과 공통 UI 모듈을 자산화하고, 디자인 요소별 적용 기준·마크업 구조·CSS 클래스 네이밍 규칙을 문서화했습니다.",
            result: "후속 사이트를 공통 모듈로 착수해 초기 제작 시간을 단축했고, 작업자 간 마크업 품질 편차를 최소화해 유지보수 부담을 완화했습니다.",
          },
          {
            problem: "모바일 환경에서 콘텐츠 잘림과 레이아웃 깨짐이 반복됐으나, 기기·브라우저별 검수 항목이 정의되지 않았습니다.",
            approach: "미디어 쿼리 기반 반응형 레이아웃으로 잘림·깨짐을 수정하고, PC·태블릿·모바일과 Chrome·Safari 환경별 검수 항목을 납품 전 체크리스트로 문서화했습니다.",
            result: "모든 사이트에 동일한 검수 항목을 적용해 접속 기기와 브라우저에 관계없이 일관된 레이아웃을 제공했습니다.",
          },
          {
            problem: "사이트 오픈 후 콘텐츠 수정과 운영 방법에 관한 고객사 문의가 프로젝트당 평균 4건 발생해, 단순 수정에도 제작자 대응이 필요했습니다.",
            approach: "CMS 관리자 화면에서 콘텐츠를 수정하는 웹사이트 운영 가이드를 제작해 사이트 인계 시 고객사에 전달했습니다.",
            result: "고객사가 콘텐츠를 자체 운영하게 돼 문의·수정 요청이 프로젝트당 평균 4건에서 1건 수준으로 감소했습니다.",
          },
        ],
      },
      {
        kind: "prose",
        label: "OUTCOME",
        title: "결과",
        body: [
          "병원·제조·쇼핑몰 등 업종별 기업 사이트의 기획, 디자인, 반응형 퍼블리싱 전 과정을 전담하며 공통 템플릿과 퍼블리싱 가이드로 마크업 품질의 일관성을 유지했고, 기존 클라이언트의 재의뢰로 이어졌습니다.",
        ],
      },
    ],
  },
};

// 클라이언트 사이트 제작의 작업 갤러리. 목록에서는 개별 프로젝트 아이템으로 노출한다
export const CLIENT_SITE_SHOTS: ShotItem[] = [
  {
    src: "/images/sections/04/works/works-01.png",
    fonts: [
      { name: "Black Han Sans", role: "제목" },
      { name: "Noto Sans KR", role: "본문" },
    ],
    colors: [
      { hex: "#52bab9", role: "메인" },
      { hex: "#45aed5", role: "보조" },
    ],
    name: "종합병원",
    note: "풀페이지 반응형 · Swiper",
    summary:
      "진료과목과 의료진을 중심으로 메인 화면을 구성하고, 진료과목별 소개와 진료 안내를 쉽게 찾아볼 수 있도록 서브페이지를 구성했습니다.",
    href: "https://yishospital.com",
  },
  {
    src: "/images/sections/04/works/works-02.png",
    fonts: [
      { name: "Montserrat", role: "영문" },
      { name: "HCRDotum", role: "국문" },
    ],
    colors: [{ hex: "#d6292e", role: "포인트" }],
    name: "반도체 설비 기업",
    note: "풀페이지 반응형",
    summary:
      "주요 사업과 설비 분야를 메인에서 강조하고, 분야별 상세 정보로 이어지는 구조로 구성했습니다.",
    href: "https://zenith-tech.kr",
  },
  {
    src: "/images/sections/04/works/works-03.png",
    name: "자동차 부품 제조사",
    note: "반응형 · 슬라이드",
    summary:
      "주요 사업과 생산 품목을 메인에서 강조하고, 품목별 상세 정보로 이어지는 구조로 구성했습니다.",
  },
  {
    src: "/images/sections/04/works/works-04.png",
    fonts: [{ name: "Lato" }],
    colors: [
      { hex: "#9a8d6a", role: "메인" },
      { hex: "#d1b180", role: "보조" },
    ],
    name: "가구 맞춤 제작 회사",
    note: "반응형 · 쇼핑몰",
    summary:
      "대표 제품과 카테고리를 메인에서 보여주고, 상품 탐색부터 주문까지 자연스럽게 이어지도록 쇼핑몰 화면을 함께 구성했습니다.",
    href: "https://haudsystem.com/?page_id=69",
  },
  {
    src: "/images/sections/04/works/works-05.png",
    fonts: [{ name: "Open Sans" }, { name: "Lato" }],
    colors: [{ hex: "#c41519", role: "포인트" }],
    name: "전기레인지 제조사",
    note: "반응형 · 제품 상세 페이지",
    summary:
      "대표 제품과 제품군을 메인에서 강조하고, 제품별 상세 정보로 이어지는 구조로 구성했습니다.",
    href: "https://koch14477.mycafe24.com",
  },
  {
    src: "/images/sections/04/works/works-06.png",
    name: "아동 심리 의원",
    note: "반응형 · 게시판",
    summary:
      "치료 프로그램과 전문 클리닉을 중심으로 메인 화면을 구성하고, 프로그램별 안내와 공지사항을 쉽게 찾아볼 수 있도록 서브페이지를 구성했습니다.",
    href: "https://banpokidsmind.com",
  },
  {
    src: "/images/sections/04/works/works-07.png",
    name: "산업 자동화 기업",
    note: "반응형 · 다이어그램",
    summary:
      "주력 기술과 솔루션을 메인에서 강조하고, 사업 영역별 제품 정보로 이어지는 구조로 구성했습니다.",
    href: "https://hardcon.co.kr",
  },
  {
    src: "/images/sections/04/works/works-08.png",
    name: "필라테스 스튜디오",
    note: "반응형",
    summary:
      "브랜드 소개와 운영 중인 클래스를 중심으로 메인 콘텐츠를 구성하고, 클래스별 상세 정보와 수강 안내를 확인할 수 있도록 페이지를 구성했습니다.",
    href: "https://medicalpilatesmama.com",
  },
  {
    src: "/images/sections/04/works/works-09.png",
    name: "안전장비 제조사",
    note: "풀페이지 · 반응형 · 다국어",
    summary:
      "핵심 제품과 사용 환경을 메인에서 강조하고, 제품 사양과 인증 정보로 이어지는 구조로 페이지를 구성했습니다.",
    href: "https://goldentimekorea.com",
  },
  {
    src: "/images/sections/04/works/works-10.png",
    name: "공간 디자인 스튜디오",
    note: "반응형 · 이미지 그리드",
    summary:
      "주요 작업물을 중심으로 스튜디오의 작업 성격이 드러나도록 한 화면에 구성하고, 문의로 이어질 수 있도록 디자인했습니다.",
    href: "https://2makdesign.com",
  },
  {
    src: "/images/sections/04/works/works-11.png",
    name: "수목 관리 제품 기업",
    note: "반응형 · 제품 검색",
    summary:
      "주력 제품과 용도별 분류를 메인에서 강조하고, 제품별 상세 정보와 관리 정보로 이어지는 구조로 구성했습니다.",
    href: "https://yweco.com",
  },
  {
    src: "/images/sections/04/works/works-12.png",
    name: "작물보호제 기업",
    note: "반응형 · 슬라이드",
    summary:
      "대표 제품과 신제품을 메인에서 강조하고, 제품별 상세 정보와 영농 정보로 이어지는 구조로 구성했습니다.",
    href: "https://greencitycp.com",
  },
  {
    src: "/images/sections/04/works/works-13.png",
    name: "예선 선사",
    note: "풀페이지 · 반응형",
    summary:
      "주력 사업과 보유 선박을 중심으로 메인 콘텐츠를 구성하고, 선박별 제원과 연혁을 이어서 확인할 수 있도록 서브페이지를 구성했습니다.",
    href: "https://heunghae.com",
  },
  {
    src: "/images/sections/04/works/works-14.png",
    name: "선박 관리 기업",
    note: "풀페이지 · 반응형",
    summary:
      "기업의 비전과 사업 분야를 중심으로 메인 콘텐츠를 구성하고, 사업별 상세 정보와 문의로 이어지도록 서브페이지를 구성했습니다.",
    href: "https://ocenpeak.com",
  },
  {
    src: "/images/sections/04/works/works-15.png",
    name: "엔지니어링 기업",
    note: "풀페이지 · 반응형",
    summary:
      "주요 사업 영역을 보여주고, 실적별 상세 정보로 이어지는 구조를 구성했습니다.",
    href: "https://unideng.com",
  },
  {
    src: "/images/sections/04/works/works-16.png",
    name: "세탁 서비스 업체",
    note: "반응형 · 비주얼 슬라이드",
    summary:
      "제공 서비스 중심으로 메인을 구성하고, 회사 및 서비스별 상세 정보로 이어지는 구조를 구성했습니다.",
  },
  {
    src: "/images/sections/04/works/works-17.png",
    name: "콘텐츠 제작사",
    note: "반응형 · 썸네일 그리드",
    summary:
      "제작한 콘텐츠를 중심으로 작업의 특징이 드러나도록 구성하고, 콘텐츠별 상세 내용을 확인할 수 있는 구조로 디자인했습니다.",
    href: "https://azing.kr",
  },
  {
    src: "/images/sections/04/works/works-18.png",
    name: "음향 업체",
    note: "반응형 · VOD 영역",
    summary:
      "주요 작업과 현장 영상을 중심으로 작업의 특징이 드러나도록 구성하고, 작업별 상세 내용을 확인할 수 있는 구조로 디자인했습니다.",
    href: "https://chulsound.com",
  },
  {
    src: "/images/sections/04/works/works-19.png",
    name: "명상 체험 업체",
    note: "반응형 · 갤러리 · FAQ",
    summary:
      "체험 프로그램과 후기 사진을 메인에 구성하고, 프로그램별 상세 정보와 이용 안내로 이어지는 구조를 구성했습니다.",
  },
  {
    src: "/images/sections/04/works/works-20.png",
    name: "위치 기반 서비스 기업",
    note: "반응형 · 다크 테마",
    summary:
      "핵심 기술과 적용 분야를 메인에서 보여주고, 제품별 상세 정보로 이어지는 구조를 구성했습니다.",
    href: "http://navinlabshome.mycafe24.com",
  },
  {
    src: "/images/sections/04/works/works-21.png",
    name: "문화 페스티벌",
    note: "다국어 반응형 · 예매 링크",
    summary:
      "행사의 핵심 메시지와 공연 라인업을 중심으로 화면을 구성하고, 행사 분위기와 관람 정보를 함께 전달할 수 있도록 디자인했습니다.",
  },
  {
    src: "/images/sections/04/works/works-22.png",
    name: "홈 리프트 브랜드",
    note: "반응형 · 제품 상세",
    summary:
      "제품군과 설치 사례를 메인에 구성하고, 제품별 상세 정보와 브랜드 분위기를 함께 전달할 수 있도록 디자인했습니다.",
    href: "https://hanwoollift.com",
  },
  {
    src: "/images/sections/04/works/works-23.png",
    name: "족보 사이트",
    note: "반응형 · 다중 메뉴 · 게시판",
    summary:
      "주요 기능과 이용 방법을 퀵 메뉴로 구성하고, 자료별 상세 정보와 자료실로 이어지는 구조를 구성했습니다.",
    href: "http://www.xn--bh3b77fdseed.com",
  },
  {
    src: "/images/sections/04/works/works-24.png",
    name: "사회복지 재단",
    note: "반응형 · 게시판",
    summary:
      "운영 중인 복지 프로그램과 참여 방법을 메인에 구성하고, 상세 페이지에서 프로그램별 상세 정보를 확인할 수 있도록 구성했습니다",
    href: "https://pumda.org/",
  },
  {
    src: "/images/sections/04/works/works-25.png",
    name: "농기계 제조사",
    note: "반응형 · 다국어",
    summary:
      "주요 사업과 대표 제품을 메인에서 강조하고, 제품군별 상세 정보로 이어지는 구조로 구성했습니다.",
    href: "https://wecan21.com",
  },
  {
    src: "/images/sections/04/works/works-26.png",
    name: "이차전지 소재 기업",
    note: "반응형 · 게시판",
    summary:
      "기업의 주요 사업과 핵심 소재를 메인에서 강조하고, 제품 상세 및 기업 소식으로 이어지도록 구성했습니다.",
    href: "https://eco-chem.co.kr",
  },
  {
    src: "/images/sections/04/works/works-27.png",
    name: "건설사",
    note: "풀페이지 · 반응형 · 슬라이드",
    summary:
      "주요 사업과 시공 실적을 중심으로 기업의 사업 영역을 보여주고, 실적별 상세 정보로 이어지는 구조를 구성했습니다.",
    href: "https://gntack.co.kr",
  },
];
