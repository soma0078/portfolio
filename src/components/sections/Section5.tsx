import { MY_EMAIL, MY_GITHUB_URL } from "@constants/urls";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledSection = styled.section`
  position: relative;
  height: 100vh;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;

  p {
    opacity: 0;
    font-size: 1.125rem;
    font-weight: 300;
  }

  p:first-child {
    font-size: 2.5rem;
    margin-bottom: 1.125rem;
    font-weight: 500;
  }
`;

const CopyRight = styled.div`
  font-family: "Pretendard";
  font-weight: 200;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  opacity: 0.5;
  line-height: 1.4;
`;

function Section5() {
  const textBoxRef = useRef<HTMLDivElement>(null);

  const texts = [
    "방문해 주셔서 감사합니다 :)",
    "함께 일하는 동료들과 협력하며 서로 배우고",
    "성장하는 과정에서 신뢰받는 사람이 되겠습니다.",
  ];

  // 각 문장 글자를 span으로 감싸기
  const wrappedTexts = texts.map((text) =>
    [...text].map((char, i) => (
      <span
        key={i}
        style={{
          display: "inline-block",
          opacity: 0,
          filter: "blur(6px)",
          willChange: "opacity, filter",
          whiteSpace: "pre", // 띄어쓰기 유지용
        }}
        className="word"
      >
        {char}
      </span>
    ))
  );

  useGSAP(() => {
    if (!textBoxRef.current) return;

    // p 태그들 보이도록 설정
    gsap.set(textBoxRef.current.querySelectorAll(".paragraph"), { opacity: 1 });

    // span 글자들에 대해 opacity와 blur 애니메이션 실행
    gsap.to(".word", {
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.5,
      stagger: {
        amount: 0.8,
        from: "start",
      },
      ease: "power2.out",
      scrollTrigger: {
        trigger: textBoxRef.current,
        start: "top 85%",
      },
    });
  }, []);

  return (
    <StyledSection>
      <TextBox ref={textBoxRef}>
        {wrappedTexts.map((spans, i) => (
          <p className="paragraph" key={i}>
            {spans}
          </p>
        ))}
      </TextBox>
      <div>
        <Link to={`mailto:${MY_EMAIL}`}>Contact me</Link>
        <Link to={MY_GITHUB_URL}>Github</Link>
      </div>
      <CopyRight>
        <span>© 2025 Createad by Songa. All Rights Reserved.</span>
        <span>React, GSAP, Tailwind CSS 기반으로 제작된 사이트입니다.</span>
      </CopyRight>
    </StyledSection>
  );
}
export default Section5;
