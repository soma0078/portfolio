const CLICK_LOCATIONS = {
  home: "home",
  homeFolder: "home_folder",
  header: "header",
  sidebar: "sidebar",
  mobileMenu: "mobile_menu",
  projectList: "project_list",
  projectHeroSlider: "project_hero_slider",
  projectCircularGallery: "project_circular_gallery",
  projectGallery: "project_gallery",
  projectGalleryGrid: "project_gallery_grid",
  lightbox: "lightbox",
} as const;

export type ClickLocation =
  (typeof CLICK_LOCATIONS)[keyof typeof CLICK_LOCATIONS];

export default CLICK_LOCATIONS;
