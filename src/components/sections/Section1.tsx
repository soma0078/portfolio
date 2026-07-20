import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import styled from "styled-components";
import devices from "@constants/devices";

const StyledSection = styled.section`
  position: relative;
  min-height: 100svh;
  padding: 0 164px;

  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    gap: 40px;
  }

  .name-text {
    p:first-child {
      font-size: 1.5rem;
      font-weight: 500;
      font-family: "Montserrat", sans-serif;
    }
    p:last-child {
      font-size: 6.25rem;
      font-weight: 700;
      font-family: "Gmarket Sans";
      white-space: nowrap;
    }
  }

  .intro-text {
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.4;

    .line-wrapper {
      overflow: hidden;
    }

    .line {
      transform: translateY(100%);
      opacity: 0;
    }
  }

  .background-text {
    position: absolute;
    z-index: -1;
    left: 10%;
    font-size: 17.5vw;
    font-weight: 800;
    font-family: "Montserrat", sans-serif;
    white-space: nowrap;
    color: ${({ theme }) => theme.textColorOpacity};
  }

  @media ${devices.xl} {
    padding: 0 64px;

    .inner {
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 12px;
    }

    .name-text p:last-child {
      font-size: 5rem;
    }

    .intro-text {
      font-size: 1.75rem;
    }
  }

  @media ${devices.md} {
    padding: 0 24px;

    .name-text {
      p:first-child {
        font-size: 1.125rem;
      }
      p:last-child {
        font-size: 3.5rem;
      }
    }

    .intro-text {
      font-size: 1.25rem;
    }

    .background-text {
      left: 5%;
      font-size: 24vw;
    }
  }

  @media ${devices.xs} {
    .name-text p:last-child {
      font-size: 2.75rem;
    }

    .intro-text {
      font-size: 1.125rem;
    }
  }
`;

function Section1() {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.to(".background-text", {
        x: -400,
        scrollTrigger: {
          trigger: ".background-text",
          start: "center center",
          end: 400,
          scrub: true,
        },
      });

      gsap.from(".name-text", {
        y: 0,
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)",
        duration: 2,
        scrollTrigger: {
          start: "top 80%",
        },
      });

      gsap.to(".line", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".intro-text",
          start: "top 80%",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <StyledSection ref={containerRef} id="home">
      <div className="inner">
        <div className="name-text">
          <p className="name-line">Hello, I'm</p>
          <p className="name-line">이송아.</p>
        </div>

        <div className="intro-text">
          <div className="line-wrapper">
            <div className="line">의미있는 UI/UX를 설계하고,</div>
          </div>
          <div className="line-wrapper">
            <div className="line">긍정적인 쓰임을 제공하기 위해 생각하며,</div>
          </div>
          <div className="line-wrapper">
            <div className="line">
              함께할 수 있는 최적의 결과를 도출하고자 합니다.
            </div>
          </div>
        </div>
        <div className="background-text">Songa Portfolio</div>
      </div>
    </StyledSection>
  );
}

export default Section1;
