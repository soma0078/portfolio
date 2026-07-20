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
  gap: 10px;
  width: var(--sidebar-width);
  height: 100dvh;
  padding: 32px 18px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  font-family: "Inter", "Pretendard", sans-serif;

  @media ${devices.md} {
    display: none;
  }
`;

const LogoArea = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 10px;
  border-radius: 4px;
  background-color: #fafafa;
  font-size: 11px;
  font-weight: 700;
  color: #17171c;
  cursor: pointer;
  transition: background-color 300ms;

  &:hover {
    background-color: #f0f0f2;
  }
`;

const NavItemRow = styled.div`
  display: flex;
  justify-content: space-between;

  span:last-child {
    font-weight: 400;
    color: #525260;
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
  font-size: 14px;
  color: #75758a;
  cursor: pointer;

  &:hover {
    color: #17171c;
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
