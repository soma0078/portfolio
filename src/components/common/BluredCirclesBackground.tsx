import styled, { keyframes } from "styled-components";

const NUM_CIRCLES = 5;

const rotate360 = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const getRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const colors = ["rgba(88, 86, 222, 0.1)", "rgba(189, 75, 229, 0.1)"];

const Circle = styled.span<{
  size: number;
  left: number;
  top: number;
  color: string;
  duration: number;
  delay: number;
  originX: number;
  originY: number;
}>`
  position: absolute;
  border-radius: 50%;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  left: ${({ left }) => left}%;
  top: ${({ top }) => top}%;
  background-color: ${({ color }) => color};
  filter: blur(50px);
  transform-origin: ${({ originX, originY }) => `${originX}vw ${originY}vh`};
  animation: ${rotate360} ${({ duration }) => duration}s linear infinite;
  animation-delay: ${({ delay }) => delay}s;
  box-shadow: 100vmin 0 ${({ size }) => size / 2}px ${({ color }) => color};
`;

const Container = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 0;
`;

const BluredCircleBackground = () => {
  return (
    <Container>
      {Array.from({ length: NUM_CIRCLES }).map((_, i) => {
        const size = getRandom(300, 400);
        const left = getRandom(0, 100);
        const top = getRandom(0, 100);
        const color = colors[i % colors.length];
        const duration = getRandom(60, 35);
        const delay = getRandom(-30, 0);
        const originX = getRandom(-30, 30);
        const originY = getRandom(-30, 30);

        return (
          <Circle
            key={i}
            size={size}
            left={left}
            top={top}
            color={color}
            duration={duration}
            delay={delay}
            originX={originX}
            originY={originY}
          />
        );
      })}
    </Container>
  );
};

export default BluredCircleBackground;
