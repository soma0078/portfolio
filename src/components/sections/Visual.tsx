import styled from "styled-components";
import Intro from "../Intro";
import IntroImg from "../../assets/images/sample.png";
import { expandWidth } from "../../styles/animations";
import { CommonSection } from "../../styles/commonStyles";

const VisualSection = styled(CommonSection)`
  padding: 0 50px 90px;
`;

const VisualInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  min-height: 85vh;
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
`;

const VisualImgWrapper = styled.div`
  width: 680px;
  height: 480px;
  overflow: hidden;
`;

const VisualImgBox = styled.div`
  width: 0;
  height: 100%;
  background-image: url(${IntroImg});
  background-repeat: no-repeat;
  background-position: 0;

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
