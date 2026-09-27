import { useState, type MouseEvent } from "react";
import { LuSun, LuMoon } from "react-icons/lu";
import MenuOverlay from "@components/common/MenuOverlay";
import MobileMenu from "../common/Menu";
import Logo from "@components/common/Logo";
import ANALYTICS_EVENTS from "@constants/analyticsEvents";
import CLICK_LOCATIONS from "@constants/clickLocations";
import { trackEvent } from "src/utils/analytics";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: (event: MouseEvent<HTMLButtonElement>) => void;
}

function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    trackEvent(ANALYTICS_EVENTS.mobileMenuToggle, {
      state: isNavOpen ? "close" : "open",
    });
    setIsNavOpen(!isNavOpen);
  };

  const handleClose = () => {
    setTimeout(() => setIsNavOpen(false), 600);
  };

  return (
    <header className="fixed top-0 z-999 flex w-full items-center justify-between p-3 lg:hidden">
      <Logo />

      <div className="flex items-center gap-2">
        <MenuOverlay isOpen={isNavOpen} onClose={handleClose} />
        <button
          type="button"
          onClick={(event) => {
            toggleDarkMode(event);
            trackEvent(ANALYTICS_EVENTS.darkModeToggle, {
              click_location: CLICK_LOCATIONS.header,
            });
          }}
          aria-label="다크모드 전환"
          className="cursor-pointer rounded-full border-none bg-transparent pt-1 text-xl text-ink hover:bg-[#efefef] hover:text-[#333] dark:text-white dark:hover:bg-white/10 dark:hover:text-white"
        >
          {isDarkMode ? <LuSun /> : <LuMoon />}
        </button>
        <MobileMenu onClick={toggleNav} isOpen={isNavOpen} />
      </div>
    </header>
  );
}

export default Header;
