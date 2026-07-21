import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styled from "styled-components";
import { Project } from "src/type/types";
import devices from "@constants/devices";

gsap.registerPlugin(ScrollTrigger);

const LOREM_SENTENCES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
  "Nulla pariatur. Vestibulum ante ipsum primis in faucibus orci luctus.",
  "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.",
  "Nullam varius, turpis molestie dictum semper, sem arcu dictum dui.",
];

const PLACEHOLDER_COLORS = [
  "#c9d4e8",
  "#c9e8d8",
  "#e8d4c9",
  "#d4c9e8",
  "#e8c9d4",
  "#d8e8c9",
  "#c9e0e8",
  "#e8e0c9",
];

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const CardStack = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
`;

const PlaceholderCard = styled.div<{ $color: string }>`
  position: absolute;
  inset: 0;
  background-color: ${({ $color }) => $color};
`;

const TextWrapper = styled.div`
  padding: 2.5rem 3rem;

  @media ${devices.md} {
    padding: 1.5rem;
  }
`;

const TextParagraph = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
`;

const TextSpan = styled.span`
  opacity: 0.2;
`;

type Props = {
  project: Project;
};

export default function ProjectDetailHero({ project }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const words = LOREM_SENTENCES.join(" ").split(" ");
  const cardCount = PLACEHOLDER_COLORS.length;

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const validCards = cardRefs.current.slice(0, cardCount).filter(Boolean);
      const validWords = textRefs.current.filter(Boolean);
      const wordCount = validWords.length;

      const steps = cardCount - 1;

      // 첫 카드 외에는 위에 대기시킨 뒤 한 장씩 아래로 내려와 덮음
      gsap.set(validCards.slice(1), { yPercent: -100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: `+=${steps * 100}vh`,
          scrub: 0.8,
          snap: {
            snapTo: 1 / steps,
            duration: { min: 0.3, max: 0.6 },
            ease: "power1.inOut",
          },
        },
      });

      // 카드 전환 — 다음 카드가 위에서 내려와 이전 카드를 덮음 (이전 카드는 고정)
      validCards.slice(1).forEach((card, i) => {
        tl.to(card, { yPercent: 0, ease: "none", duration: 1 }, i);
      });

      // 단어 highlight — 카드 스텝에 맞춰 균등 분배
      validWords.forEach((word, i) => {
        const pos = (i / (wordCount - 1)) * steps;
        tl.to(word, { opacity: 1, duration: 0.2 }, pos);
      });
    },
    { scope: containerRef },
  );

  return (
    <HeroSection ref={containerRef}>
      <CardStack>
        {PLACEHOLDER_COLORS.map((_, i) => (
          <PlaceholderCard
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            $color={PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length]}
            style={{ zIndex: i }}
          />
        ))}
      </CardStack>

      <TextWrapper>
        <TextParagraph>
          {words.map((word, i) => (
            <TextSpan
              key={i}
              ref={(el) => {
                textRefs.current[i] = el;
              }}
            >
              {word}{" "}
            </TextSpan>
          ))}
        </TextParagraph>
      </TextWrapper>
    </HeroSection>
  );
}
