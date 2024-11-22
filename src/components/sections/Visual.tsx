import styled from "styled-components";
import Intro from "./Intro";
import IntroImg from "../../assets/images/sample.png";
import { expandWidth } from "../../styles/animations";
import { fullViewportSection } from "../../styles/commonStyles";
import devices from "../../constants/devices";

const VisualSection = styled(fullViewportSection)`
  padding: 0 24px 90px;
`;

const VisualInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  min-height: 85vh;

  @media ${devices.lg} {
    flex-direction: column-reverse;
    align-items: inherit;
    padding-top: 96px;
  }
`;

const VisualH2 = styled.h2`
  display: flex;
  flex-direction: column;
  font-size: 2rem;

  & > :nth-child(2) {
    font-size: 7rem;
    font-family: "Caveat", cursive;
    margin-left: -6px;
  }

  & > :nth-child(3) {
    font-size: 5rem;
    letter-spacing: -2px;
  }

  @media ${devices.lg} {
    font-size: 1.5rem;

    & > :nth-child(2) {
      font-size: 5.25rem;
    }

    & > :nth-child(3) {
      font-size: 3.75rem;
    }
  }

  @media ${devices.sm} {
    font-size: 1rem;

    & > :nth-child(2) {
      font-size: 3rem;
    }

    & > :nth-child(3) {
      font-size: 2rem;
    }
  }
`;

const VisualImgWrapper = styled.div`
  width: 680px;
  height: 480px;
  overflow: hidden;

  @media ${devices.lg} {
    margin-left: auto;
    width: 520px;
    height: 360px;
  }

  @media ${devices.sm} {
    margin-left: auto;
    width: 380px;
    height: 280px;
  }
`;

const VisualImgBox = styled.div`
  width: 0;
  height: 100%;
  background: url(${IntroImg}) no-repeat 50% 50%;
  background-size: contain;

  animation: ${expandWidth} 1.5s 7s ease-in-out forwards;
`;

function Visual() {
  return (
    <>
      <Intro />
      <VisualSection>
        <VisualInner>
          <VisualH2>
            <span>HELLO, I'M</span>
            <span>LEE SONGA</span>
            <span>FRONT-END DEV.</span>
          </VisualH2>
          <VisualImgWrapper>
            <VisualImgBox />
          </VisualImgWrapper>
        </VisualInner>
      </VisualSection>
    </>
  );
}

export default Visual;
