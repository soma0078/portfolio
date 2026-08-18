import styled from "styled-components";
import { Link } from "react-scroll";
import { LuSun, LuMoon } from "react-icons/lu";
import devices from "@constants/devices";
import Logo from "@components/common/Logo";
import MENU_ITEMS from "@constants/menuItems";
import {
  ResumeButton,
  LangButton,
  SocialLinks,
} from "@components/common/ProfileLinks";

interface SidebarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const SidebarLayout = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: var(--sidebar-width);
  height: 100dvh;
  padding: 32px 18px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.bgColor};
  border-right: 1px solid ${({ theme }) => theme.sidebarBorder};
  font-family: "Inter", "Pretendard", sans-serif;

  @media ${devices.md} {
    display: none;
  }
`;

const LogoArea = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 24px;
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 10px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.surfaceBg};
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  transition: background-color 300ms;

  &:hover {
    background-color: ${({ theme }) => theme.surfaceHoverBg};
  }
`;

const NavItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;

  span:last-child {
    font-weight: 400;
    color: ${({ theme }) => theme.mutedText};
  }
`;

const UtilityRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
`;

const DarkModeButton = styled.button`
  display: flex;
  border: none;
  background: none;
  font-size: 18px;
  color: ${({ theme }) => theme.mutedText};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.textColor};
  }
`;

function Sidebar({ isDarkMode, toggleDarkMode }: SidebarProps) {
  return (
    <SidebarLayout>
      <LogoArea>
        <Logo />
      </LogoArea>

      {MENU_ITEMS.map(({ menu, id }, index) => (
        <NavItem key={id} to={id} spy={true} smooth={true} duration={600}>
          <NavItemRow>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>↗</span>
          </NavItemRow>
          {menu}
        </NavItem>
      ))}

      <ResumeButton />

      <UtilityRow>
        <LangButton />
        <DarkModeButton
          type="button"
          onClick={toggleDarkMode}
          aria-label="다크모드 전환"
        >
          {isDarkMode ? <LuSun /> : <LuMoon />}
        </DarkModeButton>
      </UtilityRow>

      <SocialLinks />
    </SidebarLayout>
  );
}

export default Sidebar;
