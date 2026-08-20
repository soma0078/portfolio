import { useRef } from "react";
import { Link } from "react-scroll";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LuSun, LuMoon } from "react-icons/lu";
import Logo from "@components/common/Logo";
import MENU_ITEMS from "@constants/menuItems";
import HOME_INTRO from "@constants/homeIntro";
import { ResumeButton, SocialLinks } from "@components/common/ProfileLinks";

interface SidebarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
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
        <Link
          key={id}
          to={id}
          spy={true}
          smooth={true}
          duration={600}
          className="js-side group flex cursor-pointer flex-col gap-4 rounded bg-surface p-2.5 text-base font-bold text-ink transition-colors duration-300 hover:bg-surface-hover dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        >
          <span className="flex justify-between text-[13px]">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="font-normal text-muted transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-[#9a9ab0]">
              ↗
            </span>
          </span>
          {menu}
        </Link>
      ))}

      <div className="js-side">
        <ResumeButton />
      </div>

      <div className="js-side flex items-center justify-between py-1">
        <SocialLinks />
        <button
          type="button"
          onClick={toggleDarkMode}
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
