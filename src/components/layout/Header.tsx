import styled from "styled-components";
import NavBar from "@components/common/MenuOverlay";
import { LuSun, LuMoon } from "react-icons/lu";
import devices from "@constants/devices";
import MobileMenu from "../common/Menu";
import { useState } from "react";
import Lottie from "lottie-react";
import gradientBlobAnimation from "@lottie/gradientBlob.json";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const HeaderLayout = styled.div`
  width: 100%;
  padding: 18px 48px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  box-sizing: border-box;
  align-items: center;
  z-index: 999;

  @media ${devices.lg} {
    padding: 12px;
  }
`;

const StyledLogo = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  font-size: 1.125rem;
  line-height: 1.125rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  color: ${({ theme }) => theme.textColor};

  & span {
    position: absolute;
  }

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

  return (
    <HeaderLayout>
      <StyledLogo>
        <Lottie
          animationData={gradientBlobAnimation}
          loop
          style={{ width: 124, opacity: 0.7 }}
        />
        <span>
          LEE SONGA
          <br />
          PORTFOLIO
        </span>
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
