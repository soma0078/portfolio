import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";
import { ReactTyped } from "react-typed";
import styled from "styled-components";

const mockData = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  frontContent: "front",
  backContent: "back",
}));

const StyledSection = styled.section`
  position: relative;
  min-height: 100svh;
`;

const StyledHeader = styled.div`
  padding: 0 164px;
`;

const TypingText = styled(ReactTyped)`
  font-family: "Montserrat";
  font-size: 3.5rem;
  font-weight: 500;
`;

const CardList = styled.ul`
  display: flex;
  gap: 30px;
  padding-left: 164px;
  overflow: hidden;
  width: 100%;
  margin-top: 44px;
`;

const CardItem = styled.li`
  min-width: 294px;
  height: 346px;
  perspective: 1000px;
  margin: 20px 0;
  border-radius: 8px;
  cursor: pointer;
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: all 400ms;
  transform-style: preserve-3d;
  border-radius: 8px;
  will-change: transform;
  transform: rotateX(0deg) rotateY(0deg);

  &.flipped {
    transform: rotateY(180deg);
    box-shadow: 0 0 30px #91919160;
  }

  .card-content {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    padding: 24px 20px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.flipCardBgOpacity};
  }

  .back {
    transform: rotateY(180deg);
  }
`;

function Section2() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const handleFlip = (id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleMouseMove =
    (id: number) => (e: React.MouseEvent<HTMLLIElement>) => {
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();

      // 카드 내 마우스 위치 계산
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // 카드 중심 기준으로 -0.5 ~ +0.5 범위로 정규화
      const xPct = mouseX / rect.width - 0.5;
      const yPct = mouseY / rect.height - 0.5;

      // 회전 각도 계산 (마우스 위치에 비례)
      const rotateX = -yPct * 20;
      const rotateY = xPct * 20;

      const cardInner = target.querySelector(".card-inner") as HTMLElement;
      if (cardInner) {
        if (flippedCards[id]) {
          // 뒤집힌 상태는 고정
          cardInner.style.transform = "rotateY(180deg)";
        } else {
          cardInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
      }
    };

  const handleMouseLeave =
    (id: number) => (e: React.MouseEvent<HTMLLIElement>) => {
      const cardInner = e.currentTarget.querySelector(
        ".card-inner"
      ) as HTMLElement;
      if (cardInner) {
        cardInner.style.transform = flippedCards[id]
          ? "rotateY(180deg)"
          : "rotateX(0deg) rotateY(0deg)";
      }
    };

  useGSAP(() => {
    const cardCount = document.querySelectorAll(".card-item").length;
    gsap.to(".card-item", {
      xPercent: -100 * (cardCount - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal",
        pin: true,
        scrub: 0.1,
        start: "center 75%",
        end: "+=3000",
      },
    });
  });

  return (
    <StyledSection className="horizontal">
      <StyledHeader>
        <TypingText
          strings={["Career", "Education"]}
          typeSpeed={120}
          backSpeed={50}
          loop
        />
      </StyledHeader>
      <CardList>
        {mockData.map((item) => (
          <CardItem
            key={item.id}
            onClick={() => handleFlip(item.id)}
            onMouseMove={handleMouseMove(item.id)}
            onMouseLeave={handleMouseLeave(item.id)}
            className="card-item"
          >
            <CardInner
              className={`card-inner ${flippedCards[item.id] ? "flipped" : ""}`}
            >
              <div className="card-content front">{item.frontContent}</div>
              <div className="card-content back">{item.backContent}</div>
            </CardInner>
          </CardItem>
        ))}
      </CardList>
    </StyledSection>
  );
}

export default Section2;
