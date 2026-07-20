import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styled from "styled-components";
import { Project } from "src/type/types";
import ProjectList from "@components/ProjectList";
import Button from "@components/common/Button";
import devices from "@constants/devices";

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

  @media ${devices.md} {
    font-size: 2.125rem;
  }

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

type Props = {
  data: Project[];
};

function Section4({ data }: Props) {
  const titleRef = useRef(null);

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
        "-=0.6",
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
  }, []);

  return (
    <StyledSection className="section" id="projects">
      <div className="section-header">
        <StyledTitle ref={titleRef} className="section-title">
          <div className="overlay" />
          <span>Project</span>
        </StyledTitle>
      </div>
      <ProjectList data={data} visibleCount={6} />
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Button type="link" to="/projects">
          View All Projects
        </Button>
      </div>
    </StyledSection>
  );
}

export default Section4;
