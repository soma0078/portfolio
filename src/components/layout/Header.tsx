import styled from "styled-components";
import MenuOverlay from "@components/common/MenuOverlay";
import { LuSun, LuMoon } from "react-icons/lu";
import devices from "@constants/devices";
import MobileMenu from "../common/Menu";
import { useState } from "react";
import Logo from "@components/common/Logo";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const HeaderLayout = styled.div`
  display: none;

  @media ${devices.md} {
    width: 100%;
    padding: 12px;
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    box-sizing: border-box;
    align-items: center;
    z-index: 999;
  }
`;

const HeaderRightMenuWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const DarkModeIcon = styled.button`
  border: none;
  font-size: 1.5rem;
  border-radius: 999px;
  cursor: pointer;
  background-color: transparent;
  color: ${({ theme }) => theme.textColor};

  &:hover {
    background-color: #efefef;
    color: #333;
  }

  @media ${devices.lg} {
    line-height: 21px;
  }
`;

function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleClose = () => {
    setTimeout(() => setIsNavOpen(false), 600);
  };

  return (
    <HeaderLayout>
      <Logo />

      <HeaderRightMenuWrapper>
        <MenuOverlay isOpen={isNavOpen} onClose={handleClose} />
        <DarkModeIcon onClick={toggleDarkMode}>
          {isDarkMode ? <LuSun /> : <LuMoon />}
        </DarkModeIcon>
        <MobileMenu onClick={toggleNav} isOpen={isNavOpen} />
      </HeaderRightMenuWrapper>
    </HeaderLayout>
  );
}

export default Header;
