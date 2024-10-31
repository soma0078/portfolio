import styled from "styled-components";
import NavBar from "./NavBar";
import { LuSun, LuMoon } from "react-icons/lu";

const HeaderLayout = styled.div`
  width: 100%;
  padding: 18px 48px;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  box-sizing: border-box;
  align-items: center;
  z-index: 99;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    z-index: -1;
  }
`;

const StyledLogo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.125rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  line-height: 24px;
`;

const HeaderRightMenuWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const DarkModeIcon = styled.button`
  border: none;
  font-size: 1.25rem;
  border-radius: 999px;
  cursor: pointer;
  background-color: transparent;
  color: ${(props) => props.theme.textColor};

  &:hover {
    background-color: #efefef;
    color: #333;
  }
`;

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  return (
    <HeaderLayout>
      <StyledLogo>
        <span>songa. portfolio</span>
        <span>2024</span>
      </StyledLogo>
      <HeaderRightMenuWrapper>
        <NavBar />
        <DarkModeIcon onClick={toggleDarkMode}>
          {isDarkMode ? <LuSun /> : <LuMoon />}
        </DarkModeIcon>
      </HeaderRightMenuWrapper>
    </HeaderLayout>
  );
}

export default Header;
