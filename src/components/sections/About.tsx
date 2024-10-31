import styled from "styled-components";
import {
  CenteredContentSection,
  LinkIconContainer,
} from "../../styles/commonStyles";
import MimoticonFront from "../../assets/images/mimoticon_front.png";
import MimoticonBack from "../../assets/images/mimoticon_back.png";
import MimoticonWink from "../../assets/images/mimoticon_wink.png";

import { FaGithub } from "react-icons/fa";
import { SiVelog, SiGmail } from "react-icons/si";
import { IoArrowDownSharp } from "react-icons/io5";
import { RiShareBoxLine } from "react-icons/ri";
import LinkIcon from "../ui/LinkIcon";
import { MY_EMAIL, MY_GITHUB_URL, MY_VELOG_URL } from "../../constants/urls";
import Tooltip from "../ui/Tooltip";
import IntroTextStyle from "../../styles/introTextStyle";
import Button from "../ui/Button";
import { ReactNode, useState } from "react";
import { Link } from "react-scroll";
import {
  skillImageArray,
  toolImageArray,
} from "../../constants/iconImageArrays";
import IconImageArray from "../ui/IconImageArray";

const AboutSection = styled(CenteredContentSection)`
  position: relative;
  padding: 50px;
  display: flex;

  > div {
    width: 50%;
  }
`;

const CenteredIconContainer = styled(LinkIconContainer)`
  justify-content: center;
  margin-top: 44px;
`;

const AboutLeftContainer = styled.div`
  position: relative;
  height: 800px;
`;

const AboutLeftInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 80px;
`;

const AboutRightContainer = styled.div`
  height: 1200px;
`;

const AboutTextContainer = styled.div`
  padding-bottom: 64px;
  margin-bottom: 32px;
  border-bottom: 1px solid #d9d9d9;

  h2 {
    font-size: 1.5rem;
    font-weight: 300;

    b {
      font-weight: bold;
    }
  }

  h3 {
    ${IntroTextStyle}
    display: flex;
    flex-direction: column;
    font-size: 2rem;
    margin: 32px 0 24px;
    font-weight: 400;
  }

  p {
    margin-bottom: 47px;
  }
`;

const InfoContent = styled.div`
  margin-bottom: 40px;

  h3 {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 16px;
  }

  .stack-wrapper {
    display: flex;
    gap: 40px;

    h5 {
      font-weight: 500;
      margin-bottom: 8px;
    }
  }
`;

function About() {
  const [imageSrc, setImageSrc] = useState(MimoticonFront);

  const handleMouseEnter = (button: ReactNode) => {
    if (button === "first") {
      setImageSrc(MimoticonBack);
    } else if (button === "second") {
      setImageSrc(MimoticonWink);
    }
  };

  const handleMouseLeave = () => {
    setImageSrc(MimoticonFront);
  };

  return (
    <AboutSection id="about">
      <AboutLeftContainer>
        <AboutLeftInner>
          <img src={imageSrc} alt="미모티콘" />
          <CenteredIconContainer>
            <Tooltip message={`${MY_EMAIL}`} direction="bottom-left">
              <LinkIcon href={`mailto:${MY_EMAIL}`} icon={SiGmail} />
            </Tooltip>
            <Tooltip message={`${MY_GITHUB_URL}`} direction="bottom">
              <LinkIcon href={MY_GITHUB_URL} icon={FaGithub} target="_blank" />
            </Tooltip>
            <Tooltip message={`${MY_VELOG_URL}`} direction="bottom-right">
              <LinkIcon href={MY_VELOG_URL} icon={SiVelog} target="_blank" />
            </Tooltip>
          </CenteredIconContainer>
        </AboutLeftInner>
      </AboutLeftContainer>

      <AboutRightContainer>
        <AboutTextContainer>
          <h2>
            ABOUT <b>ME</b>
          </h2>
          <h3>
            <span>함께 협력하고 같이 성장하는</span>
            <span>
              프론트엔드 개발자 <b>이송아</b>입니다.
            </span>
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae magnam
            non eos quos ratione quas sint. Excepturi itaque tempore, similique,
            nihil doloremque unde suscipit nesciunt at repudiandae dolores,
            necessitatibus cumque?
          </p>
          {/* TODO: 이력서 외부 링크 추가 */}
          <Button
            primary
            buttonText="이력서 보러가기"
            icon={RiShareBoxLine}
            onMouseEnter={() => handleMouseEnter("first")}
            onMouseLeave={handleMouseLeave}
          />
          <Link to={"project"}>
            <Button
              outline
              buttonText="프로젝트 바로가기"
              icon={IoArrowDownSharp}
              onMouseEnter={() => handleMouseEnter("second")}
              onMouseLeave={handleMouseLeave}
            />
          </Link>
        </AboutTextContainer>

        <div className="info-container">
          <InfoContent>
            <h3>TECH STACK</h3>
            <div className="stack-wrapper">
              <div>
                <h5>FRONT-END SKILL</h5>
                <IconImageArray attrs={skillImageArray} />
              </div>
              <div>
                <h5>USING TOOL</h5>
                <IconImageArray attrs={toolImageArray} />
              </div>
            </div>
          </InfoContent>

          <InfoContent>
            <h3>WORK EXPERIENCE</h3>
          </InfoContent>

          <InfoContent>
            <h3>EDUCATION</h3>
          </InfoContent>
        </div>
      </AboutRightContainer>
    </AboutSection>
  );
}

export default About;
