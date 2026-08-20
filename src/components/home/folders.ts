export const FOLDER_WIDTH = 397;
export const FOLDER_HEIGHT = 332;

export const STAGE_WIDTH = 621;
export const STAGE_HEIGHT = 553;

export const STACKED_POSITION = {
  x: (STAGE_WIDTH - FOLDER_WIDTH) / 2,
  y: (STAGE_HEIGHT - FOLDER_HEIGHT) / 2,
};

export const TAB_WIDTH = 129.2;
export const TAB_HEIGHT = 73.83;

export const TAB_SHAPE = {
  outer: {
    viewBox: "0 0 148.5 64",
    d: "M0 16c0-8.837 7.163-16 16-16l82 0c11.5 0 23.5 4.5 27.5 16l23 48-148.5 0 0-48z",
  },
  inner: {
    viewBox: "-13 0 112 64",
    d: "M0 14c0-7.732 6.268-14 14-14l58 0c7.732 0 14 6.268 14 14l13 50-112 0 13-50z",
  },
} as const;

export type FolderId = "about" | "experience" | "projects" | "personal";

export interface Folder {
  id: FolderId;
  label: string;
  href: string;
  color: string;
  labelColor: string;
  tab: {
    shape: keyof typeof TAB_SHAPE;
    left: number;
    labelLeft: number;
    mirrored: boolean;
  };
  spread: { x: number; y: number };
  baseZ: number;
}

export const FOLDER_HEADINGS: Record<FolderId, string> = {
  about: "About me",
  experience: "Experience",
  projects: "Projects",
  personal: "Dev logs",
};

const FOLDERS: Folder[] = [
  {
    id: "personal",
    label: "Personal",
    href: "/logs",
    color: "#3e92cc",
    labelColor: "#ffffff",
    tab: {
      shape: "outer",
      left: FOLDER_WIDTH - TAB_WIDTH,
      labelLeft: 312.9,
      mirrored: true,
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
    tab: { shape: "inner", left: 183.43, labelLeft: 219.68, mirrored: false },
    spread: { x: 94, y: 0 },
    baseZ: 2,
  },
  {
    id: "experience",
    label: "Experience",
    href: "/experience",
    color: "#e07a5f",
    labelColor: "#ffffff",
    tab: { shape: "inner", left: 85.94, labelLeft: 113.11, mirrored: false },
    spread: { x: 0, y: 130 },
    baseZ: 3,
  },
  {
    id: "about",
    label: "About",
    href: "/about",
    color: "#1f271b",
    labelColor: "#ffffff",
    tab: { shape: "outer", left: 0, labelLeft: 15.7, mirrored: false },
    spread: { x: 134, y: 221 },
    baseZ: 4,
  },
];

export default FOLDERS;
