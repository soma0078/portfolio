const ANALYTICS_EVENTS = {
  pageView: "page_view",
  navClick: "nav_click",
  mobileMenuToggle: "mobile_menu_toggle",
  darkModeToggle: "dark_mode_toggle",
  resumeClick: "resume_click",
  socialClick: "social_click",
  blogLinkClick: "blog_link_click",
  folderClick: "folder_click",
  folderNavClick: "folder_nav_click",
  projectCardClick: "project_card_click",
  galleryCardClick: "gallery_card_click",
  galleryNavClick: "gallery_nav_click",
  galleryFilterClick: "gallery_filter_click",
  galleryViewToggle: "gallery_view_toggle",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export default ANALYTICS_EVENTS;
