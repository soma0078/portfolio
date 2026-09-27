import { useRef, type MouseEvent } from "react";
import { useLocation } from "react-router-dom";
import TransitionLink from "@components/common/TransitionLink";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LuSun, LuMoon } from "react-icons/lu";
import Logo from "@components/common/Logo";
import MENU_ITEMS from "@constants/menuItems";
import HOME_INTRO from "@constants/homeIntro";
import { ResumeButton, SocialLinks } from "@components/common/ProfileLinks";
import ANALYTICS_EVENTS from "@constants/analyticsEvents";
import CLICK_LOCATIONS from "@constants/clickLocations";
import { trackEvent } from "src/utils/analytics";

interface SidebarProps {
  isDarkMode: boolean;
  toggleDarkMode: (event: MouseEvent<HTMLButtonElement>) => void;
}

function Sidebar({ isDarkMode, toggleDarkMode }: SidebarProps) {
  const rootRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();

  const introDelay = pathname === "/" ? HOME_INTRO.left : 0;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".js-side", {
        opacity: 0,
        y: 14,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.07,
        delay: introDelay,
      });
    },
    { scope: rootRef },
  );

  return (
    <aside
      ref={rootRef}
      className="fixed left-0 top-0 z-998 hidden h-dvh w-(--sidebar-width) flex-col gap-4.5 border-r border-line bg-white px-4.5 py-8 dark:border-white/10 dark:bg-night lg:flex"
    >
      <div className="js-side flex justify-center pb-6">
        <Logo />
      </div>

      {MENU_ITEMS.map(({ menu, id }, index) => (
        <TransitionLink
          key={id}
          to={id}
          onClick={() =>
            trackEvent(ANALYTICS_EVENTS.navClick, {
              label: menu,
              target: id,
              click_location: CLICK_LOCATIONS.sidebar,
            })
          }
          className="js-side group flex cursor-pointer flex-col gap-4 rounded bg-surface p-2.5 text-base font-bold text-ink transition-colors duration-300 hover:bg-surface-hover dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        >
          <span className="flex justify-between text-[13px]">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="font-normal text-muted transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-[#9a9ab0]">
              ↗
            </span>
          </span>
          {menu}
        </TransitionLink>
      ))}

      <div className="js-side">
        <ResumeButton location={CLICK_LOCATIONS.sidebar} />
      </div>

      <div className="js-side flex items-center justify-between py-1">
        <SocialLinks location={CLICK_LOCATIONS.sidebar} />
        <button
          type="button"
          onClick={(event) => {
            toggleDarkMode(event);
            trackEvent(ANALYTICS_EVENTS.darkModeToggle, {
              click_location: CLICK_LOCATIONS.sidebar,
            });
          }}
          aria-label="다크모드 전환"
          className="flex cursor-pointer border-none bg-transparent text-lg text-muted hover:text-ink dark:text-[#9a9ab0] dark:hover:text-white"
        >
          {isDarkMode ? <LuSun /> : <LuMoon />}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
