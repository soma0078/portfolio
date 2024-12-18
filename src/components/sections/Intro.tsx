import styled from "styled-components";
import IntroTextStyle from "../../styles/introTextStyle";
import {
  fadeInBold,
  fadeInSoft,
  fadeOutBold,
  fadeOutSoft,
  shrinkToCircle,
  shrinkToCircle_mobile,
  shrinkToCircle_tablet,
} from "../../styles/animations";
import { useEffect, useState } from "react";
import devices from "../../constants/devices";

const IntroWrapper = styled.div`
  width: 100%;
  height: 100%;
  inset: 0;
  position: fixed;
  z-index: 999;

  background-color: var(--primary-color);

  &.animation-desktop {
    animation: ${shrinkToCircle} 3s 4.5s ease-in-out forwards;
  }

  &.animation-tablet {
    animation: ${shrinkToCircle_tablet} 3s 4.5s ease-in-out forwards;
  }

  &.animation-mobile {
    animation: ${shrinkToCircle_mobile} 3s 4.5s ease-in-out forwards;
  }
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

  .background-text {
    font-family: "Montserrat", sans-serif;
    font-size: 9.5rem;
    font-weight: 800;
    letter-spacing: -2px;
    opacity: 0;
    animation: ${fadeInSoft} 2s ease-in-out forwards,
      ${fadeOutSoft} 2s 3s linear forwards;
  }

  @media ${devices.lg} {
    .background-text {
      font-size: 7.5rem;
    }
  }

  @media ${devices.sm} {
    .background-text {
      font-size: 4.5rem;
    }
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
    animation: ${fadeInBold} 1.5s 0.5s ease-in-out forwards,
      ${fadeOutBold} 1.5s 2.5s ease-in-out forwards;
  }
  > span:nth-child(2) {
    opacity: 0;
    animation: ${fadeInBold} 1.5s 1s ease-in-out forwards,
      ${fadeOutBold} 1.5s 3s ease-in-out forwards;
  }

  @media ${devices.lg} {
    font-size: 2rem;
  }

  @media ${devices.sm} {
    margin-top: -35px;
    font-size: 1.375rem;
  }
`;

function Intro() {
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    // 스크롤바 너비 계산
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // 인트로 시작될 때 스크롤 방지와 레이아웃 조정
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    // 인트로 끝난 후 스크롤 복원
    const timer = setTimeout(() => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }, 7500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const width = window.innerWidth;

    const updateAnimationClass = () => {
      if (width > 1024) {
        setAnimationClass("animation-desktop");
      } else if (width > 640) {
        setAnimationClass("animation-tablet");
      } else {
        setAnimationClass("animation-mobile");
      }
    };
    updateAnimationClass();

    window.addEventListener("resize", updateAnimationClass);

    return () => {
      window.removeEventListener("resize", updateAnimationClass);
    };
  }, []);

  return (
    <IntroWrapper className={animationClass}>
      <IntroTextWrapper>
        <span className="background-text">Front-End</span>
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
