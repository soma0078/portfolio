import styled from "styled-components";

const VisualSection = styled.section`
  width: 100%;
  padding: 0 50px 90px;
`;

const VisualInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 300px;
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
  background-color: #ddd;
`;

const VisualImgBox = styled.div``;

function Visual() {
  return (
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
  );
}

export default Visual;
