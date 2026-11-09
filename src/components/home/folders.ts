import type { TabGeometry } from "src/utils/tabPath";

export const FOLDER_WIDTH = 397;
export const FOLDER_HEIGHT = 332;

export const MAX_SPREAD_X = 224;

export const STAGE_WIDTH = 621;
export const STAGE_HEIGHT = 553;

export const STACKED_POSITION = {
  x: (STAGE_WIDTH - FOLDER_WIDTH) / 2,
  y: (STAGE_HEIGHT - FOLDER_HEIGHT) / 2,
};

export const BODY_TOP = 36.9;
export const BODY_WIDTH = 396.83;
export const BODY_HEIGHT = 295.3;
export const BODY_RADIUS = 24;

// 탭 모양. 카드 끝에 붙는 탭(About, Dev log)은 옆선이 길고, 가운데 탭은 거의 곧게 선다
const TAB_EDGE = { width: 116, slope: 22, corner: 16, fillet: 8 };
const TAB_INNER = { width: 110, slope: 8, corner: 14, fillet: 8 };

export type FolderId = "about" | "experience" | "projects" | "devlog";

export interface Folder {
  id: FolderId;
  label: string;
  href: string;
  color: string;
  labelColor: string;
  // 흰 글자가 중간 톤 탭 위에 있어 하이라이트를 받으면 읽기 어려워지는 탭. 글자 뒤만 원래 색으로 덮는다
  shadeLabel: boolean;
  tab: TabGeometry & { labelLeft: number };
  spread: { x: number; y: number };
  baseZ: number;
}

export const FOLDER_HEADINGS: Record<FolderId, string> = {
  about: "About me",
  experience: "Experience",
  projects: "Projects",
  devlog: "Dev log",
};

const FOLDERS: Folder[] = [
  {
    id: "devlog",
    label: "Dev log",
    href: "/about#devlog",
    color: "#3e92cc",
    labelColor: "#ffffff",
    shadeLabel: true,
    tab: {
      ...TAB_EDGE,
      left: FOLDER_WIDTH - TAB_EDGE.width,
      flushRight: true,
      labelLeft: 312.9,
    },
    spread: { x: 224, y: 92 },
    baseZ: 1,
  },
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
    color: "#f2efdc",
    labelColor: "#222222",
    shadeLabel: false,
    tab: { ...TAB_INNER, left: 193.03, labelLeft: 219.68 },
    spread: { x: 94, y: 0 },
    baseZ: 2,
  },
  {
    id: "experience",
    label: "Experience",
    href: "/about#experience",
    color: "#e07a5f",
    labelColor: "#ffffff",
    shadeLabel: true,
    tab: { ...TAB_INNER, left: 95.54, labelLeft: 113.11 },
    spread: { x: 0, y: 130 },
    baseZ: 3,
  },
  {
    id: "about",
    label: "About me",
    href: "/about",
    color: "#1f271b",
    labelColor: "#ffffff",
    shadeLabel: false,
    tab: { ...TAB_EDGE, left: 0, flushLeft: true, labelLeft: 15.7 },
    spread: { x: 134, y: 221 },
    baseZ: 4,
  },
];

export default FOLDERS;
