import devices from "@constants/devices";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FiArrowDownRight } from "react-icons/fi";
import { ReactTyped } from "react-typed";
import { ExperienceItem } from "src/type/types";
import styled from "styled-components";

const StyledSection = styled.section`
  position: relative;
  min-height: 100dvh;
`;

/* .is-inline : 제목과 카드 리스트가 한 행에 나란히 놓이는 상태.
   실제 목표 위치를 측정하기 위해서만 잠깐 적용된다(측정 후 즉시 해제).
   덕분에 JS에 매직넘버를 두지 않고 반응형까지 CSS가 그대로 책임진다. */
const StyledHorizontal = styled.div`
  &.is-inline {
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    .section2-header {
      flex: 0 0 40%;
    }

    .card-list {
      flex: 0 0 auto;
      margin-top: 0;
      padding-left: 0;
    }
  }

  /* 모바일에서는 제목 아래로 카드가 놓이는 세로 정렬을 유지한다.
     .is-inline이 무력화되므로 측정된 가로 정렬 오프셋이 0이 되고,
     정렬 전환 구간도 자동으로 사라진다(아래 leading 계산 참고) */
  @media ${devices.md} {
    &.is-inline {
      display: block;

      .card-list {
        margin-top: 2.75rem;
        padding-left: 24px;
      }
    }
  }
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

  /* 이미지 블록과 인포 블록 분리 */
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

/* 하단 인포 : 독립 블록, 이 영역만 플립 */
const InfoFlip = styled.div`
  position: relative;
  perspective: 1000px; /* 안쪽 .info-inner 플립용 원근 */
  min-height: 240px;

  .category {
    position: absolute;
    top: 0;
    left: 0.75rem;
    transform: translateY(-50%);
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    background-color: rgba(0, 0, 0, 0.55);
    color: #fff;
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    backdrop-filter: blur(4px);
    z-index: 1;
  }

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
    transform: rotateY(180deg);
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
    transform: rotateY(180deg);
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
  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>(".card-item");
    const list = document.querySelector(".card-list") as HTMLElement;
    const horizontal = document.querySelector(".horizontal") as HTMLElement;
    if (!list || !horizontal || items.length === 0) return;

    const clamp = gsap.utils.clamp(-5, 5);
    const skewSetter = gsap.quickTo(items, "skewX", {
      duration: 0.3,
      ease: "power3.out",
    });

    // 카드 중심이 뷰포트의 이 비율 지점을 지나면 뒤집힘
    const FLIP_RATIO = 0.5;
    const FLIP_BUFFER = 40; // 카드가 임계선을 여유 있게 넘도록 하는 버퍼(px)
    const LEADING_PIXELS = 500; // 정렬 전환(가로 → 세로)에 쓸 스크롤 구간(px)

    // 레이아웃 값을 매 스크롤 프레임마다 읽으면 강제 리플로우로 버벅이므로
    // 마운트 및 refresh(리사이즈·폰트 로드) 시점에만 측정해 캐싱한다
    let itemLefts: number[] = [];
    let itemWidths: number[] = [];
    let flipPoints: number[] = []; // 카드별 뒤집힘 임계선
    let distance = 0; // 가로 스크롤 총 이동량
    let leadX = 0; // 가로 정렬 상태의 리스트 오프셋
    let leadY = 0;
    let leading = 0; // 정렬 전환에 배정된 스크롤 구간(모바일에서는 0)

    const measure = () => {
      // 트랜스폼이 없는 자연 상태(세로 정렬)를 기준으로 측정
      gsap.set(list, { x: 0, y: 0 });
      const stacked = list.getBoundingClientRect();
      itemLefts = items.map((item) => item.getBoundingClientRect().left);
      itemWidths = items.map((item) => item.offsetWidth);

      // 뷰포트 중앙을 기준으로 하되, 임계선을 카드 자신의 정지 위치보다 항상 왼쪽에 둔다.
      // 화면이 좁으면 앞쪽 카드는 가만히 있어도 중앙보다 왼쪽에 놓이는데,
      // 그대로 두면 스크롤하기도 전에 뒤집힌 채로 보이기 때문
      const viewportCenter = window.innerWidth * FLIP_RATIO;
      flipPoints = items.map((_, i) => {
        const restingCenter = itemLefts[i] + itemWidths[i] / 2;
        return Math.min(viewportCenter, restingCenter - FLIP_BUFFER);
      });

      // 마지막 카드가 다 드러나는 데 필요한 양(overflow)과
      // 마지막 카드가 자기 임계선을 넘는 데 필요한 양 중 더 큰 값
      const overflow = Math.max(0, list.scrollWidth - list.clientWidth);
      const last = items.length - 1;
      const lastRestingCenter = itemLefts[last] + itemWidths[last] / 2;
      const needForFlip = lastRestingCenter - flipPoints[last] + FLIP_BUFFER;
      distance = Math.max(0, overflow, needForFlip);

      // 목표(제목과 가로 정렬) 위치는 실제 레이아웃을 잠깐 적용해 측정한다.
      // 매직넘버 없이 CSS가 정의한 위치를 그대로 따르므로 화면 크기가 바뀌어도 어긋나지 않음
      horizontal.classList.add("is-inline");
      const inline = list.getBoundingClientRect();
      horizontal.classList.remove("is-inline");
      leadX = inline.left - stacked.left;
      leadY = inline.top - stacked.top;

      // 모바일에서는 위 두 레이아웃이 동일해 오프셋이 0이 된다.
      // 이때 정렬 전환 구간을 두면 아무 변화 없이 스크롤만 먹으므로 함께 제거한다
      const hasLead = Math.abs(leadX) > 1 || Math.abs(leadY) > 1;
      leading = hasLead ? LEADING_PIXELS : 0;
    };

    // 카드 중심 = 측정해둔 원래 위치 + 현재 리스트 이동량
    const updateFlip = (listX: number) => {
      items.forEach((item, i) => {
        const inner = item.querySelector(".info-inner");
        if (!inner) return;
        const center = itemLefts[i] + listX + itemWidths[i] / 2;
        inner.classList.toggle("flipped", center < flipPoints[i]);
      });
    };

    // 진행도(0~1)만으로 위치가 결정된다. 앞 구간은 정렬 전환, 뒤 구간은 가로 스크롤
    const applyProgress = (p: number) => {
      const leadRatio = leading / (leading + distance);
      let x = 0;
      let y = 0;

      if (p < leadRatio) {
        const t = p / leadRatio;
        x = leadX * (1 - t);
        y = leadY * (1 - t);
      } else if (distance > 0) {
        const t = (p - leadRatio) / (1 - leadRatio);
        x = -distance * t;
      }

      gsap.set(list, { x, y });
      updateFlip(x);
    };

    measure();
    applyProgress(0);

    // 리사이즈·폰트 로드 등으로 레이아웃이 바뀌면 캐시를 갱신한다.
    // refreshInit은 ScrollTrigger가 start/end를 다시 계산하기 직전에 실행되므로
    // 아래 end 콜백이 항상 최신 distance를 사용하게 된다
    ScrollTrigger.addEventListener("refreshInit", measure);
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    // 핀 하나의 진행도(0~1)를 정렬 전환 구간 / 가로 스크롤 구간으로 나눠 처리.
    // 위치가 진행도만의 함수라 역스크롤 시 자동으로 원상태로 되돌아간다
    const proxy = { p: 0 };
    gsap.to(proxy, {
      p: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal",
        pin: true,
        // ScrollSmoother(smooth:2)가 이미 스크롤을 완만하게 만들므로
        // 여기서 추가 지연을 주면 감속이 두 번 겹쳐 따라오는 느낌이 난다
        scrub: true,
        start: "center center",
        end: () => `+=${leading + distance}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          applyProgress(proxy.p);
          skewSetter(clamp(self.getVelocity() / -80));
        },
        // measure()가 트랜스폼을 초기화하므로, 재계산이 끝나면 현재 진행도로 위치를 복원한다
        onRefresh: (self) => applyProgress(self.progress),
      },
    });

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", measure);
    };
  });

  return (
    <StyledSection id="experience">
      <StyledHorizontal className="horizontal">
        <StyledHeader className="section2-header">
          <TypingText
            strings={["Work Experience", "Education"]}
            typeSpeed={120}
            backSpeed={50}
            loop
          />
        </StyledHeader>
        <CardList className="card-list">
          {data.map((item) => (
            <CardItem key={item.id} className="card-item">
              {/* ---------- 하단 인포 블록 (플립) ---------- */}
              <InfoFlip className="info-flip">
                <div className="info-inner">
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
                    <span className="category">
                      {item.category.toUpperCase()}
                    </span>
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
      </StyledHorizontal>
    </StyledSection>
  );
}

export default Section2;
