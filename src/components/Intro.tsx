import styled from "styled-components";
import IntroTextStyle from "../styles/introTextStyle";

const IntroWraper = styled.div`
  width: 100%;
  height: 100%;
  inset: 0;
  position: fixed;
  z-index: 999;
  background-color: var(--primary-color);
`;

const IntroTextWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;

  span {
    font-family: "Montserrat", sans-serif;
    font-size: 9.5rem;
    font-weight: 800;
    letter-spacing: -2px;
    opacity: 0.2;
  }
`;

const StyledIntroH1 = styled.h1`
  ${IntroTextStyle}

  margin-top: -60px;
`;

function Intro() {
  return (
    <IntroWraper>
      <IntroTextWrapper>
        <span>Front-End</span>
        <StyledIntroH1>
          함께 협력하고 같이 성장하는
          <br />
          프론트엔드 개발자 <b>이송아</b>입니다.
        </StyledIntroH1>
      </IntroTextWrapper>
    </IntroWraper>
  );
}

export default Intro;
