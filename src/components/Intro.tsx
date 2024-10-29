import styled from "styled-components";
import IntroTextStyle from "../styles/introTextStyle";
import { fadeInBold, fadeInSoft, fadeOutBold, fadeOutSoft, shrinkToCircle } from "../styles/animations";

const IntroWrapper = styled.div`
  width: 100%;
  height: 100%;
  inset: 0;
  position: fixed;
  z-index: 999;

  background-color: var(--primary-color);
  animation: ${shrinkToCircle} 3s 4.5s ease-in-out forwards;
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

  > span {
    font-family: "Montserrat", sans-serif;
    font-size: 9.5rem;
    font-weight: 800;
    letter-spacing: -2px;
    opacity: 0;
    animation: ${fadeInSoft} 2s ease-in-out forwards, ${fadeOutSoft} 2s 3s linear forwards;
  }
`;

const StyledIntroH1 = styled.h1`
  ${IntroTextStyle}

  display: flex;
  flex-direction: column;
  margin-top: -60px;
  font-size: 2.75rem;

  > span:nth-child(1) {
    opacity: 0;
    animation: ${fadeInBold} 1.5s 0.5s ease-in-out forwards, ${fadeOutBold} 1.5s 2.5s ease-in-out forwards;
  }
  > span:nth-child(2) {
    opacity: 0;
    animation: ${fadeInBold} 1.5s 1s ease-in-out forwards, ${fadeOutBold} 1.5s 3s ease-in-out forwards;
  }
`;

function Intro() {
  return (
    <IntroWrapper>
      <IntroTextWrapper>
        <span>Front-End</span>
        <StyledIntroH1>
          <span>함께 협력하고 같이 성장하는</span>
          <span>
            프론트엔드 개발자 <b>이송아</b>입니다.
          </span>
        </StyledIntroH1>
      </IntroTextWrapper>
    </IntroWrapper>
  );
}

export default Intro;