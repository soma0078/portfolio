import styled from "styled-components";
import NavBar from "./NavBar";

const HeaderLayout = styled.div`
  width: 100%;
  padding: 18px 48px;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  box-sizing: border-box;
  align-items: center;

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

function Header() {
  return (
    <HeaderLayout>
      <StyledLogo>
        <span>songa. portfolio</span>
        <span>2024</span>
      </StyledLogo>
      <div>
        <NavBar />
        {/* TODO: Darkmode */}
      </div>
    </HeaderLayout>
  );
}

export default Header;
