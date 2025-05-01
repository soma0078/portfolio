import styled, { css } from "styled-components";
import Intro from "./Intro";
import { SiGmail } from "react-icons/si";
import { FaArrowDown, FaGithub } from "react-icons/fa";
import ProfileImageSrc from "@images/profile-img.png";
import { bounce, ping, spin } from "@styles/animations";
import { fullViewportSection } from "@styles/commonStyles";
import { MY_EMAIL, MY_GITHUB_URL } from "@constants/urls";
import devices from "@constants/devices";

function VisualRe() {
  return (
    <>
      <Intro />
      <VisualSection>
        <VisualInner>
          <VisualTextBox>
            <h2>시맨틱한 마크업부터 인터랙션까지, 세심하게 완성합니다.</h2>
            <VisualTextList>
              <p>
                마크업 전문성과 프론트엔드 개발 역량을 바탕으로 디자인의 의도를
                이해하고 구현하는 일에 보람을 느낍니다. 웹 표준을 준수한 시맨틱
                코드 작성과 크로스 브라우징 대응에 강점을 가지고 있으며, 세밀한
                애니메이션과 인터랙션 효과를 통해 사용자의 시각적 경험을
                향상시키는 데 주력합니다.
              </p>
              <p>
                웹 접근성 원칙을 바탕으로 누구나 접근 가능한 인터페이스를
                설계하고, 반응형 웹 구현을 통해 최적화된 사용성을 제공합니다.
                또한, 사용자가 자연스럽게 흐름을 따라갈 수 있도록 디자인 시안에
                맞는 흐름과 인터랙션을 코드로 구현하는 데 주력하고 있습니다.
              </p>
            </VisualTextList>
            <SnsLinkList>
              <li>
                <a href={`mailto:${MY_EMAIL}`}>
                  <span>
                    <SiGmail />
                  </span>
                  e-mail
                  <br />
                  {MY_EMAIL}
                </a>
              </li>
              <li>
                <a href={MY_GITHUB_URL} target="_blank">
                  <span>
                    <FaGithub />
                  </span>
                  github
                  <br />
                  {MY_GITHUB_URL}
                </a>
              </li>
            </SnsLinkList>
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
              <JobTag1>
                <span>Web publisher</span>
                <span></span>
              </JobTag1>
              <JobTag2>
                <span>Front-end developer</span>
                <span></span>
              </JobTag2>
            </SvgWrapper>
            <ProfileImage />
          </ProfileImageBox>
        </VisualInner>

        <ScrollDown>
          Scroll down <FaArrowDown />
        </ScrollDown>
        <UpdatedText>updated 2025.05</UpdatedText>
      </VisualSection>
    </>
  );
}

const VisualSection = styled(fullViewportSection)`
  padding: 0 180px;
  position: relative;

  @media (max-width: 1400px) {
    padding: 0 24px;
  }
  @media ${devices.lg} {
    padding-bottom: 160px;
  }
`;

const VisualInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 80vh;

  & > div {
    width: 50%;
    height: 48vh;
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

  @media (amx-width: 1400px) {
  }

  @media ${devices.lg} {
    height: 100%;

    & > div {
      width: 100%;
      height: 100%;
    }

    & > div:last-child {
      height: 24vh;
      margin: 64px 0 32px;
    }
  }

  @media ${devices.md} {
    p {
      font-size: 1rem;
    }
  }
  @media ${devices.sm} {
    & > div:last-child {
      height: 240px;
    }
    p {
      font-size: 0.875rem;
    }
  }
`;

const VisualTextBox = styled.div`
  h2 {
    font-size: 2.4rem;
    font-family: "Montserrat", sans-serif;
    margin-bottom: 2rem;
    line-height: 1.2;
  }
  h2 b {
    font-weight: 600;
    display: block;
  }

  @media ${devices.lg} {
    h2 {
      font-size: 2rem;
      margin-bottom: 16px;
    }
  }
  @media ${devices.md} {
    h2 {
      font-size: 1.75rem;
    }
  }
  @media ${devices.sm} {
    h2 {
      font-size: 1.25rem;
      margin-bottom: 8px;
    }
  }
`;

const VisualTextList = styled.div`
  max-width: 760px;
  margin-bottom: 6rem;

  @media ${devices.lg} {
    margin-bottom: 4rem;
  }
  @media ${devices.sm} {
    margin-bottom: 2rem;
  }
`;

const SnsLinkList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  a {
    display: block;
    text-decoration: none;
    svg {
      color: black;
    }
    &:hover {
      span {
        background-color: var(--primary-color);
      }
      svg {
        color: white;
      }
    }
    span {
      background-color: #ececec;
      padding: 6px 10px 4px;
      border-radius: 25px;
      font-size: 1.2rem;
    }
  }
  li a {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    font-size: 0.75rem;
    margin-top: 8px;
  }
  li:first-child {
    padding-right: 36px;
    margin-right: 36px;
    position: relative;

    ::after {
      content: "";
      width: 2px;
      height: 24px;
      background-color: #ececec;
      position: absolute;
      right: 0;
      top: 35%;
      pointer-events: none;
    }
  }

  @media ${devices.lg} {
    li:first-child {
      padding-right: 24px;
      margin-right: 24px;
    }
  }
  @media ${devices.sm} {
    li:first-child {
      ::after {
        width: 0;
      }
    }
  }
`;

const ProfileImageBox = styled.div`
  justify-items: end;
  overflow: hidden;

  @media ${devices.lg} {
    order: -1;
  }
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
  width: 300px;
  height: 300px;
  border-radius: 100%;
  background: url(${ProfileImageSrc}) no-repeat 50% 50%;
  background-size: cover;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  @media ${devices.lg} {
    width: 200px;
    height: 200px;
  }
  @media ${devices.sm} {
    width: 140px;
    height: 140px;
  }
`;

const TagStyle = css`
  font-family: "Caveat", cursive;
  position: absolute;
  border-radius: 60px;
  color: white;
  font-size: 1.8rem;
  z-index: 10;

  span {
    border-radius: 60px;
  }

  span:first-child {
    padding: 8px 16px;
    position: relaitve;
  }

  span:last-child {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 24px 0;
    left: 0;
    top: -20%;
    z-index: -1;
    opacity: 0.1;
    animation: ${ping} 2s infinite;
  }

  @media ${devices.md} {
    font-size: 1rem;
    padding: 8px 0;
  }
`;

const JobTag1 = styled.div`
  ${TagStyle}
  background-color: rgba(72, 67, 75, 0.1);
  left: 18%;
  top: 20%;

  span {
    background-color: #483e4b;
  }
`;
const JobTag2 = styled.div`
  ${TagStyle}
  background-color: rgba(152, 94, 164, 0.1);
  right: 16%;
  bottom: 15%;

  span {
    background-color: #985ea4;
  }
`;

const ScrollDown = styled.div`
  font-family: "Caveat", cursive;
  position: absolute;
  left: 180px;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  bottom: 120px;
  font-size: 1.5rem;

  svg {
    display: block;
    margin-top: 4px;
    animation: ${bounce} 1s infinite;
  }

  @media (max-width: 1400px) {
    left: 24px;
  }
  @media ${devices.lg} {
    bottom: 60px;
    font-size: 1rem;
  }
`;

const UpdatedText = styled.span`
  font-family: "Caveat", cursive;
  font-size: 1.5rem;
  position: absolute;
  right: 180px;
  bottom: 120px;

  @media (max-width: 1400px) {
    right: 24px;
  }
  @media ${devices.lg} {
    bottom: 60px;
    font-size: 1rem;
  }
`;

export default VisualRe;
