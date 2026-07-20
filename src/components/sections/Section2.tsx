import devices from "@constants/devices";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";
import { FiArrowDownRight } from "react-icons/fi";
import { ReactTyped } from "react-typed";
import { ExperienceItem } from "src/type/types";
import styled from "styled-components";

const StyledSection = styled.section`
  position: relative;
  min-height: 100dvh;
`;

const StyledHeader = styled.div`
  padding: 0 164px;

  @media ${devices.xl} {
    padding: 0 64px;
  }
  @media ${devices.md} {
    padding: 0 24px;
  }
`;

const TypingText = styled(ReactTyped)`
  font-size: 3.5rem;
  font-weight: 500;

  @media ${devices.md} {
    font-size: 2.125rem;
  }
`;

const CardList = styled.ul`
  display: flex;
  gap: 1.875rem;
  padding-left: 164px;
  margin-top: 2.75rem;

  @media ${devices.xl} {
    padding-left: 64px;
  }
  @media ${devices.md} {
    padding-left: 24px;
  }
`;

const CardItem = styled.li`
  width: 100%;
  min-width: 360px;
  margin: 1.25rem 0;
  perspective: 1000px; /* .info-flip 틸트용 원근 */

  /* 이미지 블록과 인포 블록 분리 */
  display: flex;
  flex-direction: column;
  gap: 0.875rem;

  /* 인포플립 호버 시 이미지 컬러 표시 */
  &:has(.info-flip:hover) .thumbnail-img {
    filter: grayscale(0);
  }

  /* 인포카드가 뒤집히면 이미지 컬러 표시 */
  &[data-flipped="true"] .thumbnail-img {
    filter: grayscale(0);
  }
`;

/* 상단 이미지 : 독립 블록 (고정, 플립 안 함) */
const CardImage = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;

  .thumbnail-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
    transition: filter 300ms;
    filter: grayscale(1);
  }

  .category {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    background-color: rgba(0, 0, 0, 0.55);
    color: #fff;
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    backdrop-filter: blur(4px);
    z-index: 1;
  }

  @media ${devices.md} {
    height: 180px;
  }
`;

/* 하단 인포 : 독립 블록, 이 영역만 플립 */
const InfoFlip = styled.div`
  perspective: 1000px; /* 안쪽 .info-inner 플립용 원근 */
  min-height: 240px;
  transition: transform 400ms; /* 마우스 틸트 */
  will-change: transform;
  cursor: pointer;

  .info-inner {
    position: relative;
    width: 100%;
    min-height: 240px;
    transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
    will-change: transform;
    border-radius: 1rem;
  }

  .info-inner.flipped {
    transform: rotateX(180deg);
    box-shadow: 0 0 30px #91919160;
  }

  .info-face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    padding: 1.5rem 1.25rem;
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.flipCardBgOpacity};
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: space-between;
  }

  .arrow-down {
    margin-left: auto;
  }

  .back {
    transform: rotateX(180deg);
    justify-content: space-between;

    p {
      font-size: 0.875rem;

      strong {
        font-weight: 700;
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      column-gap: 0.5rem;

      * {
        font-size: 0.725rem;
      }
    }
  }

  .title {
    font-family: "Gmarket Sans";
    font-weight: 700;
    font-size: 1.25rem;
    letter-spacing: -1px;
    margin: 0.5rem 0;

    @media ${devices.md} {
      font-size: 1rem;
    }
  }

  .name-wrapper {
    display: flex;
    gap: 0.25rem;
    align-items: center;
    font-family: "Gmarket Sans";
    font-size: 0.875rem;

    .logo-img {
      width: 2rem;
      background-color: white;
      border-radius: 100%;
      border: 1px solid #d9d9d9;
    }
  }
`;

type Props = {
  data: ExperienceItem[];
};

// desc의 **강조** 마커를 <strong>으로 변환
const renderDesc = (text: string) =>
  text
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : (
        part
      ),
    );

function Section2({ data }: Props) {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const handleFlip = (id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 틸트는 래퍼(.info-flip)에, 플립은 안쪽(.info-inner)에 분리 적용
  const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
    const infoFlip = e.currentTarget.querySelector(".info-flip") as HTMLElement;
    if (!infoFlip) return;

    const rect = infoFlip.getBoundingClientRect();

    // 인포카드 내 마우스 위치 계산
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // 인포카드 중심 기준으로 -0.5 ~ +0.5 범위로 정규화
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    // 회전 각도 계산 (마우스 위치에 비례)
    const rotateX = -yPct * 20;
    const rotateY = xPct * 20;

    infoFlip.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLLIElement>) => {
    const infoFlip = e.currentTarget.querySelector(".info-flip") as HTMLElement;
    if (infoFlip) {
      infoFlip.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  };

  useGSAP(() => {
    const items = gsap.utils.toArray(".card-item");
    const list = document.querySelector(".card-list") as HTMLElement;
    if (!list) return;

    const clamp = gsap.utils.clamp(-5, 5);
    const skewSetter = gsap.quickTo(items, "skewX", {
      duration: 0.3,
      ease: "power3.out",
    });

    // 리스트 자체의 오버플로 폭 기준으로 이동량 계산
    // (사이드바·창 크기와 무관하게 마지막 카드까지 정확히 노출)
    // scrollWidth는 우측 패딩을 포함하지 않으므로, 마지막 카드 뒤 여백은 여기서 더함
    const TRAILING_GAP = 164; // 마지막 카드 우측 여백(px)
    const getDistance = () => {
      const overflow = list.scrollWidth - list.clientWidth;
      return overflow > 0 ? overflow + TRAILING_GAP : 0;
    };

    // 가로 스크롤
    gsap.to(items, {
      x: () => -getDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal",
        pin: true,
        scrub: 0.1,
        start: "center center",
        end: () => `+=${getDistance()}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          skewSetter(clamp(self.getVelocity() / -80));
        },
      },
      onStop: () => skewSetter(0),
    });
  });

  return (
    <StyledSection id="experience">
      <div className="horizontal">
        <StyledHeader>
          <TypingText
            strings={["Work Experience", "Education"]}
            typeSpeed={120}
            backSpeed={50}
            loop
          />
        </StyledHeader>
        <CardList className="card-list">
          {data.map((item) => (
            <CardItem
              key={item.id}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="card-item"
              data-flipped={flippedCards[item.id] ? "true" : "false"}
            >
              {/* ---------- 상단 이미지 블록 (고정) ---------- */}
              <CardImage className="card-image">
                <span className="category">{item.category.toUpperCase()}</span>
                <img
                  src={`/images/sections/02/${item.thumbnailImgSrc}.jpg`}
                  alt={`${item.title} 이미지`}
                  className="thumbnail-img"
                />
              </CardImage>

              {/* ---------- 하단 인포 블록 (플립) ---------- */}
              <InfoFlip
                className="info-flip"
                onClick={() => handleFlip(item.id)}
              >
                <div
                  className={`info-inner ${
                    flippedCards[item.id] ? "flipped" : ""
                  }`}
                >
                  {/* 앞면 : 카드 인포 */}
                  <div className="info-face front">
                    <div>
                      <div className="name-wrapper">
                        <img
                          src={`/images/sections/02/${item.logoImgSrc}.png`}
                          alt={`${item.title} 로고 이미지`}
                          className="logo-img"
                        />
                        <span>{item.name}</span>
                      </div>
                      <h5 className="title">{item.title}</h5>
                      <span>{item.date}</span>
                    </div>
                    <div className="arrow-down">
                      <FiArrowDownRight size={24} />
                    </div>
                  </div>

                  {/* 뒷면 : 설명 + 태그 */}
                  <div className="info-face back">
                    <p>{renderDesc(item.desc)}</p>
                    <ul>
                      {item.tag.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </InfoFlip>
            </CardItem>
          ))}
        </CardList>
      </div>
    </StyledSection>
  );
}

export default Section2;
