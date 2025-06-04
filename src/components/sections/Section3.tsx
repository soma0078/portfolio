import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styled, { useTheme } from "styled-components";
import { SkillItem } from "src/type/types";
import InfiniteChips from "../common/InfiniteChips";

const StyledSection = styled.section`
  position: relative;
  min-height: 100dvh;
  padding-top: 240px;
`;

const ScrollTextWrapper = styled.div`
  padding: 0 164px;

  .word {
    font-size: 40px;
    font-weight: 500;
    color: #80808060;
    margin-right: 0.5rem;
    display: inline-block;
  }
`;

const SkillsContainer = styled.div`
  margin-top: 240px;
`;

type Props = {
  data: SkillItem[];
};

function Section3({ data }: Props) {
  const theme = useTheme();

  useGSAP(() => {
    // 텍스트 색상 전환
    const wordColorChangeAnimation = gsap.to(".word", {
      color: theme.wordActiveColor,
      stagger: 0.2,
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".scroll-text-wrapper",
        start: "top center+=500",
        end: "top 20%",
        scrub: true,
      },
    });

    // cleanup 함수
    return () => wordColorChangeAnimation.kill();
  }, [theme.wordActiveColor]);

  return (
    <StyledSection>
      <ScrollTextWrapper className="scroll-text-wrapper">
        <p>
          {[
            "항상",
            "사용자",
            "관점에서",
            "고민하며,",
            "<br/>",
            "더",
            "나은",
            "경험을",
            "만들어가는",
            "데",
            "집중하고",
            "있습니다.",
          ].map((word, i) =>
            word === "<br/>" ? (
              <br key={i} />
            ) : (
              <span key={i} className="word">
                {word}
              </span>
            )
          )}
        </p>
      </ScrollTextWrapper>

      <SkillsContainer>
        <InfiniteChips skills={data} />
        <InfiniteChips skills={data} reversed />
      </SkillsContainer>
    </StyledSection>
  );
}

export default Section3;
