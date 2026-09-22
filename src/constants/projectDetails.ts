export interface SpecSheet {
  role: string;
  period: string;
  type: string;
  stack: string[];
}

export interface StepItem {
  title: string;
  body: string[];
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

export interface TroubleCase {
  title: string;
  problem: string;
  cause: string;
  fix: string;
}

export type DetailBlock =
  | { kind: "prose"; label: string; title: string; body: string[] }
  | { kind: "bullets"; label: string; title: string; items: string[] }
  | { kind: "steps"; label: string; title: string; steps: StepItem[] }
  | { kind: "trouble"; label: string; title: string; cases: TroubleCase[] }
  | { kind: "gallery"; label: string; title: string; shots: ShotItem[] }
  | {
      kind: "flow";
      label: string;
      title: string;
      chart: string;
      caption?: string;
    };

export interface ProjectDetail {
  lead: string;
  hero: string;
  org: string;
  period: string;
  spec: SpecSheet;
  links: { label: string; href: string }[];
  galleryInHero?: boolean;
  blocks: DetailBlock[];
}

const IMG = "/assets/images";

export const PROJECT_DETAILS: Record<number, ProjectDetail> = {
  7: {
    lead: "사업자가 미션을 등록하고 사용자의 참여를 통해 매장을 홍보할 수 있는 셀프 마케팅 플랫폼입니다. 초기 개발팀의 프론트엔드 개발자로 참여해 미션 관리, 분석, 운영 기능 등의 화면 구현을 담당했습니다.",
    hero: "/images/sections/04/thumbnail-under-the-deal.svg",
    org: "퍼플페퍼",
    period: "2025.06 — 2026.07",
    spec: {
      role: "프론트엔드 (FE 3인 화면 단위 분담)",
      period: "2025.06 — 2026.07 (약 1년 2개월)",
      type: "실무 · 신규 서비스 · 모노레포 3-App",
      stack: [
        "Next.js 16 · React 19 · TypeScript",
        "TanStack Query · Zustand · React Hook Form + Zod · Storybook",
        "pnpm workspace · web-vitals",
      ],
    },
    links: [],
    blocks: [
      {
        kind: "bullets",
        label: "FEATURES",
        title: "만든 기능",
        items: [
          "Partners(미션 등록·결제): 인증·온보딩, 메인·랜딩, 마이페이지, 상점 관리, 알림, 순위 체크, AI 간편 답글 등",
          "Admin(미션 승인·입금 확인·운영 관리): 결제내역 관리 테이블 및 다중 조건 검색·필터 등",
          "Biz(미션 구동량·활동자 수·신규 가입자 등 대시보드): 전체 랭킹 테이블, 회원 관리 테이블 및 회원 상세 모달 등",
        ],
      },
      {
        kind: "steps",
        label: "WORK",
        title: "맡은 일",
        steps: [
          {
            title: "사업자등록증 OCR 검증 흐름 설계",
            body: [
              "사업자등록증 OCR은 인식 실패나 정보 불일치가 발생할 수 있어 성공 흐름만으로는 회원가입을 완료할 수 없었습니다. 실패 상황을 유형별로 나누고 각 경우에 맞는 안내와 재시도 흐름을 구성해 사용자가 다음 단계로 이어갈 수 있도록 했습니다.",
            ],
          },
          {
            title: "화면과 API 스펙 사이의 차이 조율",
            body: [
              "기획·디자인 단계에서 정해지지 않은 상태값이나 API 필드를 화면 흐름을 기준으로 정리하고, 백엔드와 필요한 데이터를 논의해 구현 범위를 구체화했습니다.",
            ],
          },
          // {
          //   title: "URL 상태 관리",
          //   body: [
          //     "검색·필터·탭 상태가 화면 내부에만 남으면 새로고침이나 뒤로가기에서 사용자가 보던 조건이 사라지는 문제가 있어, 주요 상태를 URL Query와 동기화했습니다.",
          //   ],
          // },
          {
            title: "Lighthouse 성능 개선",
            body: [
              "Lighthouse 통해 성능 저하 원인을 분석하고 LCP, 번들 사이즈, 폰트 로딩 등 주요 성능 요소를 개선해 Lighthouse Performance 점수를 50점 → 70점으로 높였습니다.",
            ],
          },
          {
            title: "Core Web Vitals 모니터링",
            body: [
              "GA4를 활용해 실제 사용자 환경의 Core Web Vitals를 수집하고, 배포 이후에도 성능 상태를 확인할 수 있도록 측정 환경을 구성했습니다.",
            ],
          },
          {
            title: "기술 선택과 트레이드오프 검토",
            body: [
              "React Native와 Capacitor를 대상으로 개발 및 유지보수 측면의 트레이드오프를 비교하고 기술 선택에 필요한 판단 근거를 정리해 팀에 공유했습니다. 검토 내용을 바탕으로 기존 웹 서비스와의 연계 방식과 앱 확장 방향을 논의했습니다.",
            ],
          },
          {
            title: "QA 시나리오 작성 및 이슈 검증",
            body: [
              "기능별 주요 시나리오와 예외 상황을 QA 시트로 정리하고, QA 과정에서 발견한 이슈를 수정·보완했습니다. 수정 및 확인 결과를 팀에 공유해 동일한 기준으로 기능을 확인하고 후속 작업에 반영할 수 있도록 했습니다.",
            ],
          },
        ],
      },
      {
        kind: "flow",
        label: "ARCHITECTURE",
        title: "시스템 아키텍처",
        chart: `flowchart TD
  subgraph APPS[프론트엔드 앱]
    ADV[서비스 앱]
    ADM[어드민 앱]
    AFF[제휴사 앱]
  end
  APPS --> SDK["공유 SDK<br/>DTO · Type · API Client"]
  SDK --> API[NestJS API]
  API --> SQL[PostgreSQL]
  API --> REDIS[Redis]`,
      },
    ],
  },

  /* ────────────────── 02 화이트라벨 어드민 (퍼플페퍼) ────────────────── */
  8: {
    lead: "제휴사가 각자의 브랜드로 캠페인을 등록·운영하고 캐시를 배분·정산하는 어드민입니다. 프론트엔드 개발자로 참여해 브랜드별 테마 적용과 공통 UI 컴포넌트 구성, 대시보드·캠페인 관리 화면 구현을 담당했습니다.",
    hero: "/images/sections/04/thumbnail-whitelabel.svg",
    org: "퍼플페퍼",
    period: "2025.08 — 2026.05",
    spec: {
      role: "프론트엔드 · 브랜드 토큰과 공유 UI 레이어 담당",
      period: "2025.08 — 2026.05 (약 10개월)",
      type: "실무 · 멀티테넌트",
      stack: [
        "React 19 · Vite · TypeScript",
        "TanStack Query · TanStack Table · Zustand · React Hook Form + Zod",
        "Tailwind CSS v4 · Shadcn/ui · CVA · Recharts · Storybook",
      ],
    },
    links: [],
    blocks: [
      {
        kind: "bullets",
        label: "FEATURES",
        title: "만든 기능",
        items: [
          "공통 UI: Radix UI와 CVA를 활용해 버튼·인풋·체크박스·셀렉트·캘린더 등의 공통 UI 컴포넌트를 구현하고 공유 패키지로 구성",
          "브랜드 테마: 브랜드별 토큰을 정의하고 CSS 변수 생성기를 확장, 구조가 다른 화면은 컴포넌트 분기로 대응",
          "대시보드: Recharts로 영역·파이·방사형 차트를 구성하고 통계 카드와 미션·회원 현황, 공지 영역 구성",
          "접수시간: MUI X Date Pickers 기반 TimePicker와 요일별 설정 목록을 구현하고, 선택한 시간을 전체 요일에 일괄 적용할 수 있도록 구성",
          "회원 관리: TanStack Table로 완료합계·캠페인 카테고리 컬럼을 구성하고, 검색·셀렉트 필터와 Zod 기반 유효성 검사를 적용한 관리 모달 구현",
          "미션 운영: 미션 추가·환불 모달, 캠페인 상태 배지, xlsx 기반 공통 엑셀 다운로드 컴포넌트 구성",
          "Storybook 도입: 버튼·테이블·사이드바 등 공통 컴포넌트의 상태와 사용 방법 문서화",
        ],
      },
      {
        kind: "steps",
        label: "WORK",
        title: "맡은 일",
        steps: [
          {
            title: "브랜드별 차이를 색상 토큰과 컴포넌트 분기로 구분",
            body: [
              "브랜드가 늘어도 화면을 복제하지 않도록 기준을 세워야 했습니다. 브랜드마다 색상·radius처럼 값으로 달라지는 부분과 요소 배치처럼 구조가 달라지는 부분이 있어, 차이의 유형에 따라 구현 방식을 나눴습니다.",
              "값의 차이는 브랜드별 토큰으로 관리하고, 구조가 다른 화면은 컴포넌트를 분기했습니다. 이후 팀에서도 같은 방식으로 신규 브랜드를 추가할 수 있도록 구성했습니다.",
            ],
          },
          {
            title: "공통 UI 컴포넌트 구성과 문서화",
            body: [
              "화면마다 버튼·인풋 같은 기본 요소를 개별로 만들면 브랜드가 늘어날 때 수정 지점이 흩어지기 때문에, Radix UI와 CVA를 기준으로 공통 UI를 구현하고 공유 패키지로 분리해 두 앱에서 함께 사용하도록 구성했습니다.",
              "이후 Storybook을 도입해 컴포넌트의 상태와 사용 방법을 확인할 수 있도록 문서화했습니다.",
            ],
          },
        ],
      },
      {
        kind: "flow",
        label: "STRUCTURE",
        title: "브랜드별 화면이 달라지는 구조",
        chart: `flowchart TD
  BRAND[빌드 시 브랜드 선택]
  subgraph THEME[브랜드 설정]
    TOKEN[색상 토큰]
    VARIANT[컴포넌트 스타일]
    BRANCH[레이아웃 분기]
  end
  SHARED[공통 컴포넌트]
  SCREEN[어드민 화면]
  BRAND --> TOKEN
  BRAND --> VARIANT
  BRAND --> BRANCH
  TOKEN --> SHARED
  VARIANT --> SHARED
  SHARED --> SCREEN
  BRANCH --> SCREEN`,
      },
      // {
      //   kind: "trouble",
      //   label: "TROUBLESHOOTING",
      //   title: "막혔던 곳",
      //   cases: [
      //     {
      //       title: "브랜드마다 다른 것이 한 종류가 아니었다",
      //       problem:
      //         "색을 CSS 변수로 주입하는 방식은 팀에 이미 있었고, 제가 맡은 것은 그 위의 브랜드 토큰과 분기였습니다. 그런데 브랜드별 차이를 한 방법으로 처리하려 하니 되지 않았습니다. 컬러·radius 같은 차이와 요소 배치 같은 차이가 섞여 있었기 때문입니다.",
      //       cause:
      //         "앞의 것은 `값`으로 표현되는 차이고 뒤의 것은 `구조`로 표현되는 차이입니다. 값은 CSS 변수로 밖으로 뺄 수 있지만, 배치는 같은 방법으로 뺄 수 없어 컴포넌트 안의 `if` 분기로 남았습니다.",
      //       fix: "값의 차이는 변수명을 브랜드 공통으로 두고 값만 브랜드별 토큰으로 선언해, 신규 브랜드를 토큰 파일 추가만으로 대응하고 컴포넌트는 손대지 않게 했습니다. 구조의 차이는 사이드바 분기를 처음 넣어 패턴을 만들고 팀이 그 위에 브랜드를 얹었지만, 끝까지 분기로 남았습니다 — 테마 6종을 운영하는 동안 분기 지점이 13곳까지 늘었고, 브랜드가 더 붙을수록 컴포넌트마다 번식하는 구조였습니다. 다시 한다면 배치도 토큰과 같은 결로 브랜드별 설정 데이터로 뺐을 것입니다.",
      //     },
      //   ],
      // },
    ],
  },

  /* ─────────────────────────── 03 미루지마 ─────────────────────────── */
  1: {
    lead: "뽀모도로 타이머, 목표 설정, 할 일 목록, 노트 작성 기능을 제공하는 업무 및 학습 관리 서비스입니다. 코드잇 단기심화 과정에서 백엔드·디자이너와 함께 만들었습니다.",
    hero: "/images/sections/04/thumbnail-mirujima.png",
    org: "코드잇 · 6인",
    period: "2025.01 — 2025.03",
    spec: {
      role: "프론트엔드 4인 중 1인 (기여도 25%)",
      period: "2025.01.24 — 2025.03.18 (약 2개월)",
      type: "팀 프로젝트 · 부트캠프 협업",
      stack: [
        "Next.js 15 · TypeScript · Tailwind CSS",
        "TanStack Query · Zustand · Vercel",
      ],
    },
    links: [
      { label: "사이트 보기", href: "https://mirujima-fe-deploy.vercel.app" },
      { label: "GitHub", href: "https://github.com/FESI-7-4/mirujima_FE" },
    ],
    galleryInHero: true,
    blocks: [
      {
        kind: "bullets",
        label: "FEATURES",
        title: "만든 기능",
        items: [
          "할 일 관리: 다양한 파일, 링크 등의 콘텐츠를 할 일로 등록하고 관리",
          "대시보드: 최신 등록한 할 일 확인, 할 일 완료율 및 목표 달성률 시각화",
          "목표 설정 및 관리: 목표별 할 일과 진행 상황 한눈에 확인",
          "노트 기능: 각 할 일에 대한 상세 노트 작성 및 저장",
          "뽀모도로 타이머: 25분 집중 + 휴식 사이클로 작업 몰입 지원",
          "보안 강화: 비밀번호 암호화 및 안전한 사용자 정보 보호",
          "SNS 로그인: 간편한 로그인 및 계정 연동 기능 제공",
          "PWA 적용: 앱처럼 사용할 수 있도록 웹 환경 최적화",
        ],
      },
      {
        kind: "steps",
        label: "WORK",
        title: "맡은 일",
        steps: [
          {
            title: "프로젝트 초기 세팅 및 문서화",
            body: [
              "Next.js 15 App Router로 디렉토리 구조를 잡고 ESLint, Prettier, Husky, Commitlint를 적용해 코드 품질과 일관성을 유지했습니다.",
              "Notion으로 일정과 초기 문서를 정리해 팀과 공유하며, 세팅 단계부터 팀원 간 소통이 빠르게 돌아가도록 했습니다.",
            ],
          },
          {
            title: "대시보드 페이지 시각화",
            body: [
              "완료율 계산 로직을 재사용 가능한 형태로 구성해 월별·일별·목표별 차트에 일관되게 적용했습니다.",
              "TanStack Query의 Query Key를 기준으로 관련 데이터를 갱신해 할 일 완료·삭제 후 변경 사항이 화면에 반영되도록 하고, 화면 크기에 따라 레이아웃이 달라지는 반응형 UI를 적용했습니다.",
            ],
          },
          {
            title: "할 일 목록 페이지",
            body: [
              "All, To-Do, Done 탭을 구성하고 우선순위에 따른 정렬 기능을 제안해 구현했습니다.",
              "Intersection Observer와 TanStack Query로 무한 스크롤을 붙여 필요한 만큼만 불러오게 하고, Motion 애니메이션을 적용해 사용자 조작에 따른 반응을 구성했습니다.",
            ],
          },
          {
            title: "비밀번호 암호화",
            body: [
              "AES-CBC 대칭키 암호화를 적용해 비밀번호를 암호화된 형태로 전달하고, 백엔드와 암·복호화 방식을 협의해 데이터 처리 흐름을 구성했습니다.",
            ],
          },
        ],
      },
      {
        kind: "trouble",
        label: "TROUBLESHOOTING",
        title: "막혔던 곳",
        cases: [
          {
            title: "서버와 클라이언트의 상태 불일치로 인한 하이드레이션 오류",
            problem:
              "`useState<number>(new Date().getDate())`로 상태를 초기화했더니 상태를 초기화했더니 서버와 클라이언트의 초기 렌더링 결과가 달라 하이드레이션 오류가 발생했습니다.",
            cause:
              "`new Date().getDate()`가서버 렌더링 시점과 클라이언트 렌더링 시점에 각각 실행되면서 날짜 값이 달라질 수 있었습니다.",
            fix: "초기 상태를 `useState<Date | null>(null)`로 두고 날짜 계산을 클라이언트에서 실행하도록 변경해 서버와 클라이언트의 초기 렌더링 결과를 일치시켰습니다.",
          },
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

  /* ───────────────────────── 04 포트폴리오 사이트 ───────────────────────── */
  5: {
    lead: "경력과 프로젝트, 기술 경험을 정리한 개인 포트폴리오입니다.",
    hero: "/images/sections/04/thumbnail-portfolio.png",
    org: "개인 프로젝트",
    period: "2026",
    spec: {
      role: "기획 · 디자인 · 개발 (기여도 100%)",
      period: "2026",
      type: "개인 프로젝트",
      stack: [
        "React 18 · TypeScript · Vite",
        "Tailwind CSS v4 · GSAP · Netlify",
      ],
    },
    links: [
      { label: "사이트 보기", href: "https://leesonga-portfolio.netlify.app" },
      { label: "GitHub", href: "https://github.com/soma0078/portfolio" },
    ],
    blocks: [
      {
        kind: "bullets",
        label: "FEATURES",
        title: "만든 기능",
        items: [
          "About: 경력과 기술 스택, 기술 관련 글을 한 곳에서 확인할 수 있도록 구성",
          "Projects: 프로젝트를 work, side project 순으로 분류하고, 상세 페이지에서 담당 업무와 작업 내용을 확인할 수 있도록 구성",
          "다크모드: 시스템 설정에 맞춰 테마를 적용하고, 초기 화면에서 테마가 바뀌는 현상을 방지하도록 구성",
        ],
      },
      {
        kind: "steps",
        label: "WORK",
        title: "맡은 일",
        steps: [
          {
            title: "styled-components에서 Tailwind CSS v4로 마이그레이션",
            body: [
              "CSS-in-JS 참조를 전부 걷어내고 색은 CSS 변수로 옮겨, 라이트·다크 전환 경로를 html의 `.dark` 클래스 하나로 단일화했습니다.",
            ],
          },
          {
            title: "글 목록 자동 수집",
            body: [
              "티스토리 RSS를 빌드 전에 받아 JSON으로 떨어뜨리는 스크립트를 두고, GitHub Actions로 주기적으로 갱신하도록 했습니다.",
            ],
          },
        ],
      },
    ],
  },

  /* ─────────────────────────── 05 K-venture ─────────────────────────── */
  2: {
    lead: "지역 주민들이 등록한 한국 체험을 여행자와 연결하는 온라인 플랫폼입니다. 체험 등록부터 예약, 후기까지 한 흐름으로 이어집니다.",
    hero: "/images/sections/04/thumbnail-kventure.png",
    org: "코드잇 · 4인",
    period: "2024.07 — 2024.08",
    spec: {
      role: "프론트엔드 (기여도 25%)",
      period: "2024.07.26 — 2024.08.30 (약 1개월)",
      type: "팀 프로젝트 · 부트캠프 협업",
      stack: [
        "Next.js · TypeScript · Tailwind CSS",
        "TanStack Query · Jotai · Kakao API · Vercel",
      ],
    },
    links: [
      { label: "사이트 보기", href: "https://k-venture-main.vercel.app" },
      { label: "GitHub", href: "https://github.com/soma0078/K-venture" },
    ],
    galleryInHero: true,
    blocks: [
      {
        kind: "bullets",
        label: "FEATURES",
        title: "만든 기능",
        items: [
          "회원가입 및 로그인 시 이메일, 비밀번호 유효성 검사",
          "체험 목록 카테고리, 가격순 필터 및 검색 기능",
          "체험 상세 정보 제공 및 예약 가능 날짜 표시",
          "예약 가능한 인원, 시간 선택 후 체험 예약 신청",
          "체험 예약 신청 확인 및 승인/거절",
          "체험 등록, 수정, 삭제 및 관리",
          "예약 신청 내역 관리 및 후기 작성",
          "내 정보(닉네임, 프로필 이미지, 비밀번호) 수정",
        ],
      },
      {
        kind: "steps",
        label: "WORK",
        title: "맡은 일",
        steps: [
          {
            title: "프로젝트 초기 세팅 및 린팅 설정",
            body: [
              "폴더 구조를 정리하고 ESLint, Prettier, Husky, lint-staged, commitlint를 설정했습니다. Git 훅으로 커밋 전에 타입 검사와 린트를 돌리고, 커밋 메시지 규칙까지 맞춰 팀의 기록을 일정하게 유지했습니다.",
            ],
          },
          {
            title: "반응형 이미지 레이아웃 및 Swiper 구현",
            body: [
              "체험 상세 페이지 이미지를 데스크톱에서는 장수에 따라 그리드가 자동으로 바뀌게 하고, 모바일에서는 Swiper.js 슬라이드 배너로 바꿔 화면 크기마다 알맞게 보이도록 했습니다.",
            ],
          },
          {
            title: "후기 데이터 비동기 처리와 페이지네이션",
            body: [
              "TanStack Query와 usePagination 훅으로 후기 데이터를 비동기 처리하고, 다음 페이지 데이터를 미리 가져와 페이지 전환 시 대기 시간을 줄였습니다.",
              "상세 진입 시 스켈레톤 UI를 표시해 콘텐츠가 로딩되는 동안에도 화면의 상태를 확인할 수 있도록 했습니다.",
            ],
          },
          {
            title: "내 정보 페이지 및 상태 관리",
            body: [
              "Jotai로 닉네임·이미지·비밀번호 상태를 관리하고, 입력값과 이미지 업로드 결과가 UI에 즉시 반영되도록 구성했습니다.",
            ],
          },
        ],
      },
      {
        kind: "trouble",
        label: "TROUBLESHOOTING",
        title: "막혔던 곳",
        cases: [
          {
            title: "체험 수정 시 기존 이미지 CORS 오류",
            problem:
              "등록한 체험을 수정할 때 기존 이미지를 불러오는 과정에서 CORS 오류가 발생했고, 강력 새로고침 후에는 정상적으로 표시되었습니다.",
            cause:
              "CORS 설정 변경 이후에도 브라우저에 이전 정책이 남아 있어 변경된 설정이 바로 적용되지 않는 상황을 확인했습니다.",
            fix: "캐시를 갱신해 변경된 CORS 설정을 다시 적용하도록 조치했습니다.",
          },
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

  /* ─────────────────────────── 06 페이플러스 ─────────────────────────── */
  3: {
    lead: "급한 일손을 빠르게 찾고, 높은 시급으로 일자리를 매칭하는 서비스입니다. 사장님과 알바님이 각각 다른 화면을 보게 됩니다.",
    hero: "/images/sections/04/thumbnail-payplus.png",
    org: "코드잇 · 4인",
    period: "2024.06 — 2024.07",
    spec: {
      role: "프론트엔드 (기여도 25%)",
      period: "2024.06.21 — 2024.07.09 (약 3주)",
      type: "팀 프로젝트 · 부트캠프 협업",
      stack: ["Next.js · TypeScript · SCSS", "AWS S3 · Vercel"],
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
        kind: "bullets",
        label: "FEATURES",
        title: "만든 기능",
        items: [
          "로그인한 사용자에 따라 상단 네비게이션 버튼 변경 (사장님: 내 가게, 알바님: 내 프로필)",
          "회원가입 및 로그인 시 이메일, 비밀번호 유효성 검사",
          "사장님은 가게 등록, 정보 수정, 공고 등록 및 관리",
          "알바님은 프로필 등록 및 공고 신청/취소",
          "공고 리스트 페이지에서 필터링 및 정렬",
          "공고 상세 페이지에서 신청·취소, 마감 공고 표시",
        ],
      },
      {
        kind: "steps",
        label: "WORK",
        title: "맡은 일",
        steps: [
          {
            title: "가게 정보 등록 및 편집 페이지",
            body: [
              "Next.js SSR로 서버에서 가게 정보를 받아 초기 데이터를 구성하고, useState·useEffect로 폼 상태를 관리했습니다. 서버에서 데이터를 렌더링해 초기 페이지의 SEO와 데이터 노출을 고려했습니다.",
            ],
          },
          {
            title: "Daum 우편번호 API로 주소 검색",
            body: [
              "주소 검색 창에서 선택한 주소가 입력 필드에 자동으로 채워지도록 연동해 주소를 직접 입력하는 과정을 줄였습니다.",
            ],
          },
          {
            title: "Presigned URL로 S3 이미지 업로드",
            body: [
              "서버에서 발급한 presigned URL을 이용해 사용자가 S3에 이미지를 직접 업로드하도록 구성하고, 업로드 실패 시 오류를 즉시 안내하도록 처리했습니다.",
            ],
          },
        ],
      },
      {
        kind: "trouble",
        label: "TROUBLESHOOTING",
        title: "막혔던 곳",
        cases: [
          {
            title: "S3 업로드 후 미리보기가 뜨지 않던 문제",
            problem:
              "이미지를 S3에 업로드한 뒤 미리보기 영역에 이미지가 표시되지 않았습니다.",
            cause:
              "presigned URL의 인증용 쿼리 파라미터가 포함된 URL을 미리보기 주소로 사용하고 있었습니다.",
            fix: "presigned URL에서 쿼리 파라미터를 제거한 URL을 미리보기에 사용하도록 수정했습니다",
          },
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

  /* ─────────────────────────── 07 오픈마인드 ─────────────────────────── */
  4: {
    lead: "익명으로 자유롭게 질문하고, 다양한 답변을 통해 궁금증을 해결할 수 있는 플랫폼입니다. 처음으로 팀을 이뤄 만든 프로젝트입니다.",
    hero: "/images/sections/04/thumbnail-openmind.png",
    org: "코드잇 · 4인",
    period: "2024.04 — 2024.05",
    spec: {
      role: "프론트엔드 (기여도 25%)",
      period: "2024.04.30 — 2024.05.17 (약 3주)",
      type: "팀 프로젝트 · 부트캠프 협업",
      stack: ["React · JavaScript · Tailwind CSS", "Netlify"],
    },
    links: [
      { label: "사이트 보기", href: "https://openyourmind.netlify.app" },
      { label: "GitHub", href: "https://github.com/soma0078/Openmind" },
    ],
    galleryInHero: true,
    blocks: [
      {
        kind: "bullets",
        label: "FEATURES",
        title: "만든 기능",
        items: [
          "이름을 입력하고 질문 받기를 누르면 피드가 생성되고 해당 페이지로 이동",
          "질문 목록 최신순 정렬 및 반응형 웹 디자인",
          "질문 상태 표시(답변 완료·미답변)와 질문 작성 모달",
          "답변 입력 후 버튼 활성화, 수정 및 삭제",
          "무한 스크롤, 클립보드 복사, 카카오톡·페이스북 공유",
        ],
      },
      {
        kind: "steps",
        label: "WORK",
        title: "맡은 일",
        steps: [
          {
            title: "질문 작성 모달 UI 및 상태 관리",
            body: [
              "useState와 useEffect로 모달 상태를 관리하고, 바깥 영역 클릭 시 모달이 닫히도록 구현했습니다. 질문 제출 후 Fetch API로 질문 목록을 다시 요청해 새로 작성한 질문이 바로 반영되도록 했습니다.",
            ],
          },
          {
            title: "질문 데이터 무한 스크롤",
            body: [
              "스크롤 위치를 감지해 목록 하단에 도달하면 다음 데이터를 요청하고, 기존 목록에 이어서 표시하도록 구현했습니다.",
            ],
          },
          {
            title: "Notion을 활용한 문서 및 일정 관리",
            body: [
              "계획서·일정표·회의록을 Notion에서 관리하고, 진행 상황과 결정 사항을 팀원과 공유했습니다.",
            ],
          },
        ],
      },
      {
        kind: "trouble",
        label: "TROUBLESHOOTING",
        title: "막혔던 곳",
        cases: [
          {
            title: "무한 스크롤에서 같은 데이터를 두 번 요청하던 문제",
            problem:
              "스크롤이 목록 하단에 도달할 때마다 동일한 데이터에 대한 요청이 중복으로 발생했습니다.",
            cause:
              "로딩 상태를 요청 조건에 포함하지 않아, 이전 요청이 완료되기 전에 다음 요청이 실행될 수 있었습니다.",
            fix: "`!loading`을요청 조건에 추가해 이전 요청이 진행 중일 때는 새로운 요청이 실행되지 않도록 수정했습니다.",
          },
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

  /* ─────────────────── 08 주요 웹사이트 작업 ─────────────────── */
  6: {
    lead: "클라이언트의 요구사항과 사이트 목적을 바탕으로 웹사이트를 기획하고 디자인했습니다. 페이지 구성과 콘텐츠에 맞춰 레이아웃과 인터랙션을 구성하고 웹 화면으로 구현했습니다.",
    hero: "/images/career-bg-04.png",
    org: "솔라디자인",
    period: "2022.09 — 2024.02",
    spec: {
      role: "기획 · 디자인 · 퍼블리싱 (100%)",
      period: "2022.09 — 2024.02",
      type: "웹 에이전시 · 클라이언트 사이트 제작",
      stack: [
        "HTML5 · CSS3 · JavaScript · jQuery",
        "WordPress · Gnuboard · Cafe24",
        "Adobe Photoshop · Adobe Illustrator",
      ],
    },
    links: [],
    blocks: [
      {
        kind: "steps",
        label: "WORK",
        title: "맡은 일",
        steps: [
          {
            title: "반복되는 구조를 퍼블리싱 가이드로 표준화",
            body: [
              "헤더·푸터·레이아웃을 3~4종의 형태로 정리하고 코드 단위로 재사용해 반복 작업을 줄였습니다.",
            ],
          },
          {
            title: "여러 프로젝트의 작업 일정 관리",
            body: [
              "우선순위와 마감을 기준으로 작업 일정을 정리해 주당 2~3건의 프로젝트를 병행했습니다.",
            ],
          },
          {
            title: "기존 클라이언트의 재의뢰",
            body: [
              "기존 클라이언트의 추가 웹사이트 제작을 맡으며 여러 프로젝트를 이어서 진행했습니다.",
            ],
          },
          {
            title: "작업 가이드 문서화",
            body: [
              "프로젝트별 착수 순서를 정리해 가이드로 남기고 이후 작업에서 참고할 수 있도록 했습니다.",
            ],
          },
        ],
      },
      {
        kind: "gallery",
        label: "GALLERY",
        title: "작업한 사이트",
        shots: [
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
              "체험 프로그램과 후기 사진을 메인 구성하고, 프로그램별 상세 정보와 이용 안내로 이어지는 구조를 구성했습니다.",
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
              "제품균과 설치 사례를 메인에 구성하고, 제품별 상세 정보와 브랜드 분위기를 함께 전달할 수 있도록 디자인했습니다.",
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
        ],
      },
    ],
  },
};
