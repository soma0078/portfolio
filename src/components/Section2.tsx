import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";
import { ReactTyped } from "react-typed";
import { ExperienceItem } from "src/type/types";
import styled from "styled-components";

const StyledSection = styled.section`
  position: relative;
  min-height: 100svh;
`;

const StyledHeader = styled.div`
  padding: 0 164px;
`;

const TypingText = styled(ReactTyped)`
  font-size: 3.5rem;
  font-weight: 500;
`;

const CardList = styled.ul`
  display: flex;
  gap: 1.875rem;
  padding-left: 164px;
  width: 100%;
  height: 100%;
  margin-top: 2.75rem;
`;

const CardItem = styled.li`
  width: 100%;
  height: 100%;
  min-width: 360px;
  min-height: 400px;
  perspective: 1000px;
  margin: 1.25rem 0;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const CardInner = styled.div`
  position: relative;
  transition: all 400ms;
  transform-style: preserve-3d;
  border-radius: 0.5rem;
  will-change: transform;
  transform: rotateX(0deg) rotateY(0deg);
  min-height: 400px;

  &.flipped {
    transform: rotateY(180deg);
    box-shadow: 0 0 30px #91919160;
  }

  .card-content {
    position: absolute;

    backface-visibility: hidden;
    padding: 1.5rem 1.25rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.flipCardBgOpacity};

    img {
      transition: all 300ms;
      filter: grayscale(1);
    }

    &:hover {
      img {
        filter: grayscale(0);
      }
    }
  }

  .back {
    transform: rotateY(180deg);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
      font-size: 1.125rem;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      column-gap: 0.5rem;
    }
  }

  .title {
    font-family: "Gmarket Sans";
    font-weight: 700;
    font-size: 1.25rem;
    letter-spacing: -1px;
    margin: 0.5rem 0;
  }

  .thumbnail-img {
    display: block;
    margin: 0.75rem 0;
    border-radius: 1rem;
  }

  .name-wrapper {
    display: flex;
    gap: 0.25rem;
    align-items: center;
    font-family: "Gmarket Sans";
    font-size: 0.875rem;

    .logo-img {
      width: 24px;
      background-color: white;
      border-radius: 100%;
      border: 1px solid #d9d9d9;
    }
  }
`;

type Props = {
  data: ExperienceItem[];
};

function Section2({ data }: Props) {
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
    gsap.to(".card-item", {
      xPercent: -200,
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
          strings={["Work Experience", "Education"]}
          typeSpeed={120}
          backSpeed={50}
          loop
        />
      </StyledHeader>
      <CardList>
        {data.map((item) => (
          <CardItem
            key={item.id}
            onClick={() => handleFlip(item.id)}
            onMouseMove={handleMouseMove(item.id)}
            onMouseLeave={handleMouseLeave(item.id)}
            className="card-item"
            data-flipped={flippedCards[item.id] ? "true" : "false"}
          >
            <CardInner
              className={`card-inner ${flippedCards[item.id] ? "flipped" : ""}`}
            >
              {/* ---------- Front Content ---------- */}
              <div className="card-content front">
                <span>{item.category.toUpperCase()}</span>
                <img
                  src={`/images/sections/02/${item.thumbnailImgSrc}.jpg`}
                  alt={`${item.title} 이미지`}
                  style={{ width: "100%" }}
                  className="thumbnail-img"
                />
                <div className="name-wrapper">
                  <img
                    src={`/images/sections/02/${item.logoImgSrc}.png`}
                    alt={`${item.title} 로고 이미지`}
                    className="logo-img"
                  />

                  <span>{item.name}</span>
                </div>
                <h5 className="title">{item.title}</h5>
                <h5 className="data">{item.date}</h5>
              </div>

              {/* ---------- Back Content ----------- */}
              <div className="card-content back">
                <p>{item.desc}</p>
                <ul>
                  {item.tag.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </CardInner>
          </CardItem>
        ))}
      </CardList>
    </StyledSection>
  );
}

export default Section2;
