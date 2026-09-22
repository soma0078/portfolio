import type { ShotItem } from "./projectDetails";

const PUB = "/images/sections/04/pub";

export interface PubWork {
  id: string;
  year: number;
  src: string;
  caseName?: string;
}

export interface GalleryEntry {
  id: string;
  src: string;
  year?: number;
  shot?: ShotItem;
}

/** 연도 칩의 순서. 최근부터 */
export const PUB_YEARS = [2024, 2023, 2022] as const;

export const PUB_WORKS: PubWork[] = [
  /* ── 2024 ── */
  {
    id: "pub-24-89",
    year: 2024,
    src: `${PUB}/pub-24-89.jpg`,
    caseName: "산업 자동화 기업",
  },
  {
    id: "pub-24-88",
    year: 2024,
    src: `${PUB}/pub-24-88.jpg`,
    caseName: "아동 심리 의원",
  },
  {
    id: "pub-24-91",
    year: 2024,
    src: `${PUB}/pub-24-91.jpg`,
    caseName: "필라테스 스튜디오",
  },
  {
    id: "pub-24-93",
    year: 2024,
    src: `${PUB}/pub-24-93.jpg`,
    caseName: "공간 디자인 스튜디오",
  },
  {
    id: "pub-24-92",
    year: 2024,
    src: `${PUB}/pub-24-92.jpg`,
    caseName: "안전장비 제조사",
  },
  {
    id: "pub-24-69",
    year: 2024,
    src: `${PUB}/pub-24-69.jpg`,
    caseName: "전기레인지 제조사",
  },
  {
    id: "pub-24-78",
    year: 2024,
    src: `${PUB}/pub-24-78.jpg`,
    caseName: "자동차 부품 제조사",
  },
  
  /* ── 2023 ── */
  {
    id: "pub-23-66",
    year: 2023,
    src: `${PUB}/pub-23-66.jpg`,
    caseName: "종합병원",
  },
  {
    id: "pub-23-67",
    year: 2023,
    src: `${PUB}/pub-23-67.jpg`,
    caseName: "반도체 설비 기업",
  },
  {
    id: "pub-23-68",
    year: 2023,
    src: `${PUB}/pub-23-68.jpg`,
    caseName: "가구 맞춤 제작 회사",
  },
  {
    id: "pub-23-70",
    year: 2023,
    src: `${PUB}/pub-23-70.jpg`,
    caseName: "수목 관리 제품 기업",
  },
  {
    id: "pub-23-83",
    year: 2023,
    src: `${PUB}/pub-23-83.jpg`,
    caseName: "문화 페스티벌",
  },
  {
    id: "pub-23-71",
    year: 2023,
    src: `${PUB}/pub-23-71.jpg`,
    caseName: "작물보호제 기업",
  },
  {
    id: "pub-23-90",
    year: 2023,
    src: `${PUB}/pub-23-90.jpg`,
    caseName: "족보 사이트",
  },
  {
    id: "pub-23-77",
    year: 2023,
    src: `${PUB}/pub-23-77.jpg`,
    caseName: "콘텐츠 제작사",
  },
  {
    id: "pub-23-80",
    year: 2023,
    src: `${PUB}/pub-23-80.jpg`,
    caseName: "명상 체험 업체",
  },
  {
    id: "pub-23-97",
    year: 2023,
    src: `${PUB}/pub-23-97.jpg`,
    caseName: "농기계 제조사",
  },
  {
    id: "pub-23-81",
    year: 2023,
    src: `${PUB}/pub-23-81.jpg`,
    caseName: "위치 기반 서비스 기업",
  },
  {
    id: "pub-23-79",
    year: 2023,
    src: `${PUB}/pub-23-79.jpg`,
    caseName: "음향 업체",
  },
  {
    id: "pub-23-75",
    year: 2023,
    src: `${PUB}/pub-23-75.jpg`,
    caseName: "엔지니어링 기업",
  },
  {
    id: "pub-23-72",
    year: 2023,
    src: `${PUB}/pub-23-72.jpg`,
    caseName: "예선 선사",
  },
  {
    id: "pub-23-74",
    year: 2023,
    src: `${PUB}/pub-23-74.jpg`,
    caseName: "선박 관리 기업",
  },
  {
    id: "pub-23-86",
    year: 2023,
    src: `${PUB}/pub-23-86.jpg`,
    caseName: "홈 리프트 브랜드",
  },
  {
    id: "pub-23-96",
    year: 2023,
    src: `${PUB}/pub-23-96.jpg`,
    caseName: "사회복지 재단",
  },
  {
    id: "pub-23-76",
    year: 2023,
    src: `${PUB}/pub-23-76.jpg`,
    caseName: "세탁 서비스 업체",
  },

  /* ── 2022 ── */
  {
    id: "pub-22-73",
    year: 2022,
    src: `${PUB}/pub-22-73.jpg`,
    caseName: "이차전지 소재 기업",
  },
  {
    id: "pub-22-82",
    year: 2022,
    src: `${PUB}/pub-22-82.jpg`,
    caseName: "건설사",
  },
];
