import { useState } from "react";
import { LuSun, LuMoon } from "react-icons/lu";
import MenuOverlay from "@components/common/MenuOverlay";
import MobileMenu from "../common/Menu";
import Logo from "@components/common/Logo";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
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
          onClick={toggleDarkMode}
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
