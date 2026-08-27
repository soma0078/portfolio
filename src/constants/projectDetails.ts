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
  | { kind: "gallery"; label: string; title: string; shots: ShotItem[] };

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
  1: {
    lead: "뽀모도로 타이머, 목표 설정, 할 일 목록, 노트 작성 기능을 제공하는 업무 및 학습 관리 서비스입니다. 코드잇 스프린트 단기심화 과정에서 백엔드·디자이너와 함께 만들었습니다.",
    hero: "/images/sections/04/thumbnail-mirujima.png",
    org: "코드잇 스프린트 · 4인",
    period: "2025.01 — 2025.03",
    spec: {
      role: "프론트엔드 (기여도 25%)",
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
              "완료율 계산 로직을 재사용 가능한 형태로 설계해 월별·일별·목표별 차트에 일관되게 적용했습니다.",
              "동일한 Query Key를 사용해 할 일 완료·삭제 시 데이터가 즉시 반영되도록 하고, 화면 크기에 따라 레이아웃이 달라지는 반응형 UI를 적용했습니다.",
            ],
          },
          {
            title: "할 일 목록 페이지",
            body: [
              "All, To-Do, Done 탭을 구성하고 우선순위대로 정렬하는 기능을 제안해 구현했습니다.",
              "Intersection Observer와 TanStack Query로 무한 스크롤을 붙여 필요한 만큼만 불러오게 하고, Motion 애니메이션으로 조작에 대한 반응을 자연스럽게 만들었습니다.",
            ],
          },
          {
            title: "비밀번호 암호화",
            body: [
              "AES-CBC 대칭 키 방식을 적용해 평문 전송을 막고, 백엔드와 함께 안전한 데이터 처리 흐름을 맞췄습니다.",
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
              "`useState<number>(new Date().getDate())`로 상태를 초기화했더니 서버에서 그린 HTML과 클라이언트의 HTML이 달라 하이드레이션 오류가 났습니다.",
            cause:
              "`new Date().getDate()`는 클라이언트에서만 계산되는 값이라, 서버 렌더링 시점과 클라이언트 시점의 결과가 어긋났습니다.",
            fix: "초기 상태를 `useState<Date | null>(null)`로 두고 날짜 계산을 클라이언트에서만 실행하도록 옮겼습니다.",
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

  5: {
    lead: "직접 디자인하고 만든 개인 사이트입니다. 2024년에 처음 만들고, 2026년에 폴더 서랍을 여는 은유로 전체를 다시 설계하고 있습니다.",
    hero: "/images/sections/04/thumbnail-portfolio.png",
    org: "개인 프로젝트",
    period: "2024.10 — 현재",
    spec: {
      role: "기획 · 디자인 · 개발 (100%)",
      period: "2024.10 — 현재 (리뉴얼 진행 중)",
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
          "폴더 스택: 네 장의 폴더가 겹쳐 쌓였다 펼쳐지며 섹션으로 들어가는 홈 인터랙션",
          "About: 가로로 미는 경력 타임라인과 스크롤에 맞춰 쌓이는 기술 스택 카드",
          "Projects: 분류 칩으로 걸러 보는 한 줄 목록과 프로젝트 상세",
          "다크모드: 첫 페인트 전에 테마를 확정해 흰 화면이 스치지 않도록 처리",
          "글 목록: 티스토리 RSS를 빌드 시점에 받아 정적 데이터로 생성",
          "반응형: 데스크톱·태블릿·모바일에서 각각 다른 배치",
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
              "CSS-in-JS 참조를 전부 걷어내고 ThemeProvider와 theme.ts를 지웠습니다. 색은 CSS 변수로 옮겨, 라이트·다크 전환 경로를 html의 `.dark` 클래스 하나로 단일화했습니다.",
              "App.tsx를 경로 표(routes)와 레이아웃으로 나누고, 참조가 끊긴 레거시 컴포넌트를 삭제했습니다.",
            ],
          },
          {
            title: "폴더 스택 인터랙션 설계",
            body: [
              "겹쳐 쌓인 상태와 펼쳐진 상태의 좌표를 상수로 분리하고, 두 배치 사이를 오가는 전환을 GSAP 타임라인으로 묶었습니다.",
              "탭 모양은 바깥쪽 두 장과 가운데 두 장이 다른데, 좌우 대칭인 한 벌을 뒤집어 쓰는 방식으로 SVG 패스 두 개만 두고 해결했습니다.",
            ],
          },
          {
            title: "글 목록 자동 수집",
            body: [
              "티스토리 RSS를 빌드 전에 받아 JSON으로 떨어뜨리는 스크립트를 두고, GitHub Actions로 주기적으로 갱신하도록 했습니다. 블로그에 글을 쓰면 사이트에는 따로 손대지 않아도 됩니다.",
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
            title: "ScrollSmoother 위에서 고정 요소가 같이 밀리는 문제",
            problem:
              "스크롤에 관성을 붙이자 화면에 붙박이로 떠 있어야 할 사이드바와 필터 바가 본문을 따라 흔들렸습니다.",
            cause:
              "ScrollSmoother는 페이지 대신 안쪽 판을 transform으로 끌어당기는데, transform이 걸린 조상이 있으면 `position: fixed`의 기준이 뷰포트가 아니라 그 판이 됩니다.",
            fix: "고정 요소를 스무더 바깥(라우트 바깥)으로 옮겼고, 판 안에 남아야 하는 요소는 `translateZ(0)`로 자체 레이어를 만들어 떨림을 없앴습니다.",
          },
        ],
      },
    ],
  },

  2: {
    lead: "지역 주민들이 제공하는 다채로운 한국 체험을 여행자와 연결하는 온라인 플랫폼입니다. 체험 등록부터 예약, 후기까지 한 흐름으로 이어집니다.",
    hero: "/images/sections/04/thumbnail-kventure.png",
    org: "코드잇 스프린트 · 4인",
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
              "TanStack Query와 usePagination 훅으로 후기를 비동기 처리하고, 페이지 전환 시 프리패칭을 적용해 넘길 때 기다리지 않도록 했습니다.",
              "상세 진입 시에는 스켈레톤 UI를 띄워 로딩 중이라는 것이 보이게 했습니다.",
            ],
          },
          {
            title: "내 정보 페이지 및 상태 관리",
            body: [
              "Jotai로 닉네임·이미지·비밀번호 상태를 관리하고, 입력과 이미지 업로드 상태를 실시간으로 반영해 UI를 동기화했습니다.",
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
            title: "체험 수정 시 기존 이미지에서 발생한 CORS 오류",
            problem:
              "등록해 둔 체험을 수정할 때 이전에 올린 이미지를 불러오는 과정에서 CORS 정책 오류가 났고, 강력 새로고침을 하면 정상적으로 열렸습니다.",
            cause:
              "브라우저가 이전 CORS 정책을 캐시하고 있어 새 설정이 반영되지 않았습니다.",
            fix: "캐시를 무시하고 서버에서 최신 CORS 설정을 다시 받아오도록 확인했습니다.",
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

  3: {
    lead: "급한 일손을 빠르게 찾고, 높은 시급으로 일자리를 매칭하는 서비스입니다. 사장님과 알바님이 각각 다른 화면을 보게 됩니다.",
    hero: "/images/sections/04/thumbnail-payplus.png",
    org: "코드잇 스프린트 · 4인",
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
              "Next.js의 SSR로 서버에서 가게 정보를 받아 그리고, useState·useEffect로 폼 데이터를 관리해 입력이 곧바로 반영되도록 했습니다. 서버에서 그리는 만큼 SEO와 데이터 일관성도 함께 챙겼습니다.",
            ],
          },
          {
            title: "Daum 우편번호 API로 주소 검색",
            body: [
              "주소 검색 창에서 고른 주소가 입력 필드에 자동으로 채워지도록 연동해, 직접 타이핑하는 단계를 없앴습니다.",
            ],
          },
          {
            title: "Presigned URL로 S3 이미지 업로드",
            body: [
              "서버를 거치지 않고 사용자가 S3로 직접 올리도록 presigned URL을 발급받아 붙였고, 업로드 실패를 잡아 그 자리에서 알려주도록 했습니다.",
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
              "이미지를 올린 뒤 미리보기 자리에 아무것도 보이지 않았습니다.",
            cause:
              "presigned URL에 붙는 인증용 쿼리 매개변수(`?X-Amz-*`)가 이미지 렌더링을 방해하고 있었습니다.",
            fix: "`presignedUrl.split('?')[0]`로 쿼리를 떼어낸 순수 URL을 미리보기에 넘겼습니다.",
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

  4: {
    lead: "익명으로 자유롭게 질문하고, 다양한 답변을 통해 궁금증을 해결할 수 있는 플랫폼입니다. 처음으로 팀을 이뤄 만든 프로젝트입니다.",
    hero: "/images/sections/04/thumbnail-openmind.png",
    org: "코드잇 스프린트 · 4인",
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
              "useState와 useEffect로 모달 상태를 관리하고, 바깥을 클릭하면 자동으로 닫히도록 했습니다. 질문을 제출하면 Fetch API로 목록이 곧바로 갱신됩니다.",
            ],
          },
          {
            title: "질문 데이터 무한 스크롤",
            body: [
              "스크롤 이벤트를 감지해 하단에 닿으면 다음 묶음을 요청하도록 붙였습니다.",
            ],
          },
          {
            title: "Notion을 활용한 문서 및 일정 관리",
            body: [
              "계획서, 일정표, 회의록을 Notion에 모아 팀원이 같은 자리를 보고 움직이도록 했습니다.",
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
            problem: "스크롤이 하단에 닿을 때마다 요청이 중복으로 나갔습니다.",
            cause:
              "로딩 상태를 조건에 넣지 않아, 이미 요청이 진행 중인데도 다음 요청이 계속 출발했습니다.",
            fix: "`!loading`을 조건에 넣어 요청 중에는 새 요청이 나가지 않도록 막았습니다.",
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

  6: {
    lead: "솔라디자인에서 1년 6개월간 만든 클라이언트 사이트들입니다. 기업 소개부터 병원, 쇼핑몰까지 매번 다른 업종이었고, 기획 미팅부터 디자인·퍼블리싱·납품까지 한 사람이 이어서 맡았습니다.",
    hero: "/images/sections/04/thumbnail-work-01.png",
    org: "솔라디자인",
    period: "2022.09 — 2024.02",
    spec: {
      role: "Web Publisher · Designer (100%)",
      period: "재직 2022.09 — 2024.02 (1년 6개월)",
      type: "웹 에이전시 · 클라이언트 프로젝트",
      stack: [
        "HTML5 · CSS3 · JavaScript · jQuery",
        "WordPress · Gnuboard · Cafe24",
      ],
    },
    links: [],
    blocks: [
      {
        kind: "prose",
        label: "CONTEXT",
        title: "에이전시의 조건",
        body: [
          "클라이언트가 매번 바뀌고 일정은 짧았습니다. 한 사이트를 오래 다듬는 대신, 시안을 빠르게 화면으로 옮기고 여러 디바이스에서 깨지지 않게 만드는 일이 핵심이었습니다.",
          "업종도 요구사항도 매번 달랐지만 반복되는 구조는 비슷했습니다. 풀페이지 레이아웃, 메인 비주얼 슬라이드, 제품·의료진 소개 섹션, 게시판이 대부분의 사이트에 다시 나왔습니다.",
          "재직 기간 동안 이런 사이트를 여러 건 만들었고, 아래는 그중 대표적인 다섯 곳입니다.",
        ],
      },
      {
        kind: "steps",
        label: "WORK",
        title: "맡은 일",
        steps: [
          {
            title: "웹 표준·접근성을 지킨 반응형 퍼블리싱",
            body: [
              "HTML5·CSS3로 웹 표준과 접근성을 준수해 마크업하고, 다양한 디바이스와 화면 크기에 대응하는 반응형 레이아웃을 구현했습니다.",
            ],
          },
          {
            title: "동적 UI 기능 구현",
            body: [
              "탭·드롭다운·슬라이더·애니메이션 등을 JavaScript와 jQuery로 구현해 정적인 페이지에 인터랙션을 더했습니다. 용인서울병원에서는 메인 비주얼 배너와 의료진 소개에 Swiper 슬라이드를 붙였습니다.",
            ],
          },
          {
            title: "시각 요소 직접 제작",
            body: [
              "Photoshop·Illustrator·Adobe XD로 웹 디자인은 물론 로고와 아이콘 등 필요한 시각 요소를 직접 만들었습니다.",
            ],
          },
          {
            title: "기획부터 납품까지 전 과정 관리",
            body: [
              "클라이언트와 직접 소통하며 요구사항을 반영해 프로젝트를 구체화하고, 크로스 브라우징 확인과 납품까지 전 과정을 관리했습니다.",
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
            src: "/images/sections/04/works/works-02.jpg",
            name: "용인서울병원",
            note: "풀페이지 반응형 · Swiper",
            summary:
              "풀페이지로 제작하고, 메인 비주얼 배너와 의료진 소개 섹션에 Swiper 슬라이드를 붙였습니다.",
            href: "https://yishospital.com",
          },
          {
            src: "/images/sections/04/works/works-01.jpg",
            name: "ZENITH-TECK",
            note: "풀페이지 반응형",
            summary:
              "기업 소개와 상세 페이지를 디자인부터 퍼블리싱까지 맡아, 어떤 디바이스에서도 정보를 얻는 데 무리가 없도록 풀 반응형으로 만들었습니다.",
            href: "https://zenith-tech.kr",
          },
          {
            src: "/images/sections/04/works/works-03.jpg",
            name: "COREAONE",
            note: "반응형 · 슬라이드 · 팝업",
            summary:
              "슬라이드와 팝업을 넣고, 네비게이션을 누르면 해당 섹션으로 스크롤이 이동하는 인터랙션을 적용했습니다.",
            href: "https://mbcorespecialists.com",
          },
          {
            src: "/images/sections/04/works/works-04.jpg",
            name: "하우드시스템",
            note: "반응형 · AOS · Cafe24",
            summary:
              "기업 소개 페이지와 실제 결제가 되는 Cafe24 쇼핑몰을 함께 만들고, AOS로 스크롤 애니메이션을 얹었습니다.",
            href: "https://haudsystem.com/?page_id=69",
          },
          {
            src: "/images/sections/04/works/works-05.jpg",
            name: "KOCH",
            note: "풀페이지 반응형 · 무한 루프",
            summary:
              "비주얼 배너와 제품 소개에 슬라이드와 무한 루프 애니메이션을 구현하고, 제품 상세는 게시판 형태로 구성했습니다.",
            href: "https://koch14477.mycafe24.com",
          },
        ],
      },
      {
        kind: "prose",
        label: "LEARNINGS",
        title: "여기서 얻은 것",
        body: [
          "시안을 화면으로 옮기는 일을 반복하면서 구조를 먼저 보는 습관이 생겼습니다. 반복되는 레이아웃을 어떻게 나눌지 고민하던 감각은 지금 컴포넌트를 설계할 때 그대로 쓰입니다.",
          "다만 그때는 재사용을 파일 복사로 해결했고, 그게 왜 문제인지는 프론트엔드로 넘어와 공통 모듈을 정리하면서야 알았습니다.",
        ],
      },
    ],
  },
};
