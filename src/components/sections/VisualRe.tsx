import styled from "styled-components";
import Intro from "./Intro";
import ProfileImageSrc from "../../assets/images/profile-img.png";
import { spin } from "../../styles/animations";
import { fullViewportSection } from "../../styles/commonStyles";

function VisualRe() {
  return (
    <>
      <Intro />
      <VisualSection>
        <VisualInner>
          <VisualTextBox>
            <h2>
              <b>I Create Intuitive Web Experiences</b>
              Through Collaborative Development
            </h2>
            <VisualTextList>
              <p>
                사용자 중심의 기능 구현과 협업을 통해 프로젝트의 성장을 이끄는
                프론트엔드 개발자 이송아입니다.
              </p>
              <p>
                React와 TypeScript 기반의 웹 애플리케이션 개발 경험을 바탕으로,
                웹 표준과 접근성을 깊이 이해하고 성능 최적화와 반응형 디자인에
                열정을 가지고 있습니다.
              </p>
              <p>
                Git 워크플로우와 애자일 방법론을 활용한 체계적인 개발 프로세스와
                원활한 팀 커뮤니케이션을 통해 사용자 피드백 기반의 지속적인
                서비스 개선을 추구합니다.
              </p>
            </VisualTextList>
            <ul>
              <li>e-mail</li>
              <li>github</li>
            </ul>
          </VisualTextBox>
          <ProfileImageBox>
            <SvgWrapper>
              <OutsideSvg
                viewBox="0 0 1026 1026"
                fill="none"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full animate-spin-slow"
              >
                <path
                  d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
                  stroke="#D4D4D4"
                  stroke-opacity="0.7"
                ></path>
                <path
                  d="M513 1025C230.23 1025 1 795.77 1 513"
                  stroke="url(#:S1:-gradient-1)"
                  stroke-linecap="round"
                ></path>
                <defs>
                  <linearGradient
                    id=":S1:-gradient-1"
                    x1="1"
                    y1="513"
                    x2="1"
                    y2="1025"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#985EA4"></stop>
                    <stop
                      offset="1"
                      stop-color="#985EA4"
                      stop-opacity="0"
                    ></stop>
                  </linearGradient>
                </defs>
              </OutsideSvg>
              <InsideSvg viewBox="0 0 1026 1026" fill="none" aria-hidden="true">
                <path
                  d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
                  stroke="#D4D4D4"
                  stroke-opacity="0.7"
                ></path>
                <path
                  d="M913 513c0 220.914-179.086 400-400 400"
                  stroke="url(#:S1:-gradient-2)"
                  stroke-linecap="round"
                ></path>
                <defs>
                  <linearGradient
                    id=":S1:-gradient-2"
                    x1="913"
                    y1="513"
                    x2="913"
                    y2="913"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#985EA4"></stop>
                    <stop
                      offset="1"
                      stop-color="#985EA4"
                      stop-opacity="0"
                    ></stop>
                  </linearGradient>
                </defs>
              </InsideSvg>
            </SvgWrapper>
            <ProfileImage />
          </ProfileImageBox>
        </VisualInner>
      </VisualSection>
    </>
  );
}

const VisualSection = styled(fullViewportSection)`
  padding: 0 180px;
`;

const VisualInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100vh;

  & > div {
    width: 50%;
    height: 44vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  p {
    font-size: 1.125rem;
    word-break: keep-all;
    line-height: 1.6;
  }
`;

const VisualTextBox = styled.div`
  h2 {
    font-size: 3rem;
    font-family: "Montserrat", sans-serif;
    margin-bottom: 2rem;
    line-height: 1.2;
  }
  h2 b {
    font-weight: 600;
    display: block;
  }
`;

const VisualTextList = styled.div`
  max-width: 760px;
  margin-bottom: 6rem;
`;

const ProfileImageBox = styled.div`
  justify-items: end;
`;

const SvgWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const OutsideSvg = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  animation: ${spin} 5s linear infinite reverse;
`;

const InsideSvg = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  animation: ${spin} 3s linear infinite;
`;

const ProfileImage = styled.div`
  width: 325px;
  height: 325px;
  border-radius: 100%;
  background: url(${ProfileImageSrc}) no-repeat 50% 50%;
  background-size: cover;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default VisualRe;
