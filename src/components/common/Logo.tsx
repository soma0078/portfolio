import styled from "styled-components";
import Lottie from "lottie-react";
import gradientBlobAnimation from "@lottie/gradientBlob.json";
import devices from "@constants/devices";

const StyledLogo = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  font-size: 1.125rem;
  line-height: 1.125rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  color: ${({ theme }) => theme.textColor};

  & span {
    position: absolute;
  }

  @media ${devices.sm} {
    font-size: 1rem;
  }
`;

function Logo() {
  return (
    <StyledLogo>
      <Lottie
        animationData={gradientBlobAnimation}
        loop
        style={{ width: 124, opacity: 0.7 }}
      />
      <span>
        LEE SONGA
        <br />
        PORTFOLIO
      </span>
    </StyledLogo>
  );
}

export default Logo;
