import styled from "styled-components";
import NavBar from "./NavBar";
import { LuSun, LuMoon } from "react-icons/lu";
import devices from "../../constants/devices";
import MobileMenu from "./MobileMenu";
import { useState } from "react";

const HeaderLayout = styled.div`
  width: 100%;
  padding: 18px 48px;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  box-sizing: border-box;
  align-items: center;
  z-index: 999;

  @media ${devices.lg} {
    padding: 16px 24px;
    align-items: flex-start;
  }
`;

const StyledLogo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.125rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  line-height: 24px;

  @media ${devices.sm} {
    font-size: 1rem;
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
  color: ${(props) => props.theme.textColor};

  &:hover {
    background-color: #efefef;
    color: #333;
  }

  @media ${devices.lg} {
    line-height: 21px;
  }
`;

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <HeaderLayout>
      <StyledLogo>
        <span>songa. portfolio</span>
        <span>2024</span>
      </StyledLogo>
      <HeaderRightMenuWrapper>
        <NavBar isOpen={isNavOpen} />
        <DarkModeIcon onClick={toggleDarkMode}>
          {isDarkMode ? <LuSun /> : <LuMoon />}
        </DarkModeIcon>
        <MobileMenu onClick={toggleNav} isOpen={isNavOpen} />
      </HeaderRightMenuWrapper>
    </HeaderLayout>
  );
}

export default Header;
