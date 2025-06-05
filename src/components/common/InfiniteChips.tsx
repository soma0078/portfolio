import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styled from "styled-components";
import { SkillItem } from "src/type/types";
import { useRef } from "react";

const ChipsWrapper = styled.div`
  display: flex;
  overflow: hidden;
  margin-bottom: 40px;
  white-space: nowrap;

  .reversed-chip {
    flex-direction: row-reverse;
    margin-left: 0px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-left: -100px;
`;

const Chips = styled.div`
  background-color: ${({ theme }) => theme.flipCardBgOpacity};
  padding: 0.5rem 0.75rem;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  white-space: nowrap;
  margin-right: 1.5rem;
  font-size: 0.875rem;

  img {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.25rem;
  }
`;

type Props = {
  skills: SkillItem[];
  reversed?: boolean;
};
function InfiniteChips({ skills, reversed = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const chips = gsap.utils.toArray(".chip");
      const direction = reversed ? 1 : -1;

      gsap.to(chips, {
        x: () => `${direction * -150}px`,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reversed]);

  return (
    <ChipsWrapper ref={containerRef}>
      <Row className={` ${reversed ? "reversed-chip" : ""}`}>
        {skills.map((item) => (
          <Chips className="chip">
            <img
              src={`/images/icons/${item.imgSrc}.png`}
              alt={`${item.name} 아이콘`}
            />
            <span>{item.name}</span>
          </Chips>
        ))}
      </Row>
    </ChipsWrapper>
  );
}
export default InfiniteChips;
