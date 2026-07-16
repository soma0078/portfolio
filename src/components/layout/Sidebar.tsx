import styled from "styled-components";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiTistory } from "react-icons/si";
import { LuSun, LuMoon } from "react-icons/lu";
import devices from "@constants/devices";
import Logo from "@components/common/Logo";
import MENU_ITEMS from "@constants/menuItems";

interface SidebarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const SOCIAL_LINKS = [
  { icon: <FaGithub />, href: "https://github.com/soma0078", label: "GitHub" },
  { icon: <FaLinkedinIn />, href: "#", label: "LinkedIn" },
  { icon: <SiTistory />, href: "#", label: "Tistory" },
];

const RESUME_URL = "#";

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

const ResumeButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 14px;
  border-radius: 9999px;
  background-color: #17171c;
  font-size: 11px;
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
`;

const UtilityRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
`;

const LangButton = styled.button`
  border: none;
  background: none;
  text-align: left;
  font-family: inherit;
  font-size: 10px;
  color: #75758a;
  cursor: pointer;
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

const SocialRow = styled.div`
  display: flex;
  gap: 6px;
`;

const SocialLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #17171c;
  font-size: 12px;
  color: #ffffff;
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

      <ResumeButton href={RESUME_URL} target="_blank" rel="noreferrer">
        이력서 다운로드&nbsp;&nbsp;↗
      </ResumeButton>

      <UtilityRow>
        <LangButton type="button">한국어 / EN</LangButton>
        <DarkModeButton
          type="button"
          onClick={toggleDarkMode}
          aria-label="다크모드 전환"
        >
          {isDarkMode ? <LuSun /> : <LuMoon />}
        </DarkModeButton>
      </UtilityRow>

      <SocialRow>
        {SOCIAL_LINKS.map(({ icon, href, label }) => (
          <SocialLink
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
          >
            {icon}
          </SocialLink>
        ))}
      </SocialRow>
    </SidebarLayout>
  );
}

export default Sidebar;
