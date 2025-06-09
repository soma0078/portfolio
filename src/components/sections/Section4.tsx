import ProjectThumbnail from "@components/common/ProjectThumbnail";
import devices from "@constants/devices";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "src/type/types";
import styled from "styled-components";

const StyledSection = styled.section`
  position: relative;

  .section-header {
    text-align: center;
  }
`;

const StyledTitle = styled.h3`
  position: relative;
  display: inline-block;

  overflow: hidden;
  font-size: 3.5rem;
  font-weight: 500;
  margin-bottom: 2.75rem;

  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 0;
    background: var(--primary-gradient);
    z-index: 1;
  }

  span {
    position: relative;
    opacity: 1;
  }
`;

const ProjectList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  padding: 0 164px;
  padding-bottom: 15vh;

  @media ${devices.lg} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${devices.md} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const MoreButton = styled.button`
  padding: 0.75rem 1.25rem;
  border-radius: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
  border: 1px solid ${({ theme }) => theme.textColor};
`;

const CategoryFilter = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  padding: 20px 0;
  background: ${({ theme }) => theme.filterBar};
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  button {
    font-weight: 500;
    position: relative;
    border: 1px solid #c7c7c7;
    border-radius: 4px;
    padding: 6px 12px 6px 24px;
    overflow: hidden;

    &:before,
    &:after {
      content: "";
      position: absolute;
      transition: all 0.3s;
    }

    &:after {
      width: 6px;
      height: 6px;
      border-radius: 30px;
      border: 1px solid;
      border-color: #c7c7c7;
      left: 8px;
      top: 50%;
      transform: translateY(-50%);
    }

    &:before {
      width: 100%;
      height: 0;
      left: 0;
      bottom: 0;
      z-index: -1;
    }

    &.active:before,
    &:hover:before {
      height: 100%;
      background: var(--primary-gradient);
    }
    &.active,
    &:hover {
      color: white;
    }
    &:hover:after {
      border-color: white;
    }
    &.active:after {
      background-color: white;
      border-color: white;
    }
    &.active:hover:after {
      background-color: black;
      border-color: black;
    }
    &.active:hover {
      color: black;
    }
  }
`;

type Props = {
  data: Project[];
};

const VISIBLE_PROJECT_COUNT = 6;
const categories = ["all", "team", "personal", "work"] as const;
type Category = (typeof categories)[number];

function Section4({ data }: Props) {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(VISIBLE_PROJECT_COUNT);

  const [category, setCategory] = useState<Category>("all");

  // 카테고리 첫 글자 대문자
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const filterdData =
    category === "all"
      ? data
      : data.filter((item) => item.category === category);

  const handleClick = () => {
    setVisibleCount((prev) => prev + VISIBLE_PROJECT_COUNT);
  };

  useGSAP(() => {
    if (!titleRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        end: "top 50%",
        scrub: false,
      },
    });

    // 1) 오른쪽에서 왼쪽으로 overlay 너비 차오름
    tl.to(".overlay", {
      width: "100%",
      duration: 0.8,
      ease: "power1.out",
      transformOrigin: "right center",
    })
      // 2) overlay 오른쪽으로 슬라이드하며 사라짐
      .to(".overlay", {
        x: "100%",
        duration: 0.6,
        delay: 0.3,
        ease: "power1.in",
      })
      // 3) 텍스트 opacity 0 -> 1 (덮였다가 보임)
      .fromTo(
        ".section-title span",
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.6"
      );

    // 스크롤시 위로 이동하며 축소, 투명도 효과
    gsap.to(".section-header", {
      y: "-40%",
      scrollTrigger: {
        trigger: ".section",
        start: "top 20%",
        toggleActions: "play none none reverse",
      },
      scale: 0.95,
      opacity: 0.1,
    });

    // 프로젝트 패럴랙스 효과
    const elements = gsap.utils.toArray(".project-thumbnail") as HTMLElement[];
    elements.forEach((el) => {
      const speed = parseFloat(el.getAttribute("data-speed") || "1");

      gsap.to(el, {
        y: () => -window.innerHeight * speed * 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: ".project-list",
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  });

  // 프로젝트 상세 페이지 이동
  const handleProjectClick = (projectId: number) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <StyledSection className="section">
      <div className="section-header">
        <StyledTitle ref={titleRef} className="section-title">
          <div className="overlay" />
          <span>Project</span>
        </StyledTitle>
      </div>

      <ProjectList className="project-list">
        {filterdData.slice(0, visibleCount).map((item, index) => (
          <ProjectThumbnail
            key={item.id}
            data={item}
            className="project-thumbnail"
            dataSpeed={1 + (index % 3) * 0.5}
            onClick={() => handleProjectClick(item.id)}
          />
        ))}
      </ProjectList>

      {visibleCount < data.length && (
        <MoreButton onClick={handleClick}>LOAD MORE +</MoreButton>
      )}

      <CategoryFilter>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={category === c ? "active" : ""}
          >
            {capitalize(c)}
          </button>
        ))}
      </CategoryFilter>
    </StyledSection>
  );
}

export default Section4;
