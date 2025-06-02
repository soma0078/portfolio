import { ReactTyped } from "react-typed";
import styled from "styled-components";

const StyledSection = styled.section`
  position: relative;
  min-height: 100svh;
  padding: 0 164px;
`;

const TypingText = styled(ReactTyped)`
  font-family: "Montserrat";
  font-size: 3.5rem;
  font-weight: 500;
`;

function Section2() {
  return (
    <StyledSection>
      <TypingText
        strings={["Career", "Education"]}
        typeSpeed={120}
        backSpeed={50}
        loop
      />
    </StyledSection>
  );
}

export default Section2;
