import Lottie from "lottie-react";
import styled from "styled-components";
import notfoundLottie from "../../assets/lottie/notfound.json";

const LottieWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100dvh;
`;

export default function NotFoundPage() {
  return (
    <LottieWrapper>
      <Lottie animationData={notfoundLottie} />
    </LottieWrapper>
  );
}
