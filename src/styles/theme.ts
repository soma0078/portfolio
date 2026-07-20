export const lightTheme = {
  bgColor: "#ffffff",
  bgColorOpacity: "#c5c5c575",
  textColor: "#333333",
  dotColor: "#333333",
  textColorOpacity: "rgba(0, 0, 0, 0.07)",
  flipCardBgOpacity: "rgba(0, 0, 0, 0.07)",
  wordActiveColor: "#000000",
  filterBar: `var(--filterBar-gradient-light)`,
  // 사이드바/공용 링크 (다크모드 대응)
  sidebarBorder: "#e5e7eb",
  surfaceBg: "#fafafa",
  surfaceHoverBg: "#f0f0f2",
  mutedText: "#75758a",
  solidBg: "#17171c",
  solidText: "#ffffff",
};

export const darkTheme = {
  bgColor: "#0c092a",
  bgColorOpacity: "#0907249b",
  textColor: "#ffffff",
  dotColor: "#985ea4",
  textColorOpacity: "rgba(255, 255, 255, 0.05)",
  flipCardBgOpacity: "rgba(255, 255, 255, 0.07)",
  wordActiveColor: "#ffffff",
  filterBar: `var(--filterBar-gradient-dark)`,
  // 사이드바/공용 링크 (다크모드 대응)
  sidebarBorder: "rgba(255, 255, 255, 0.1)",
  surfaceBg: "rgba(255, 255, 255, 0.05)",
  surfaceHoverBg: "rgba(255, 255, 255, 0.1)",
  mutedText: "#9a9ab0",
  solidBg: "#ffffff",
  solidText: "#17171c",
};

export const theme = {
  lightTheme,
  darkTheme,
};

export default theme;
