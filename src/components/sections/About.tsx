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
import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-scroll";
import { skillImageArray, toolImageArray } from "../../constants/icons";
import IconImageArray from "../ui/IconImageArray";
import Accordion, { InfoDataProps } from "../ui/Accordion";
import devices from "../../constants/devices";

const AboutSection = styled(CenteredContentSection)`
  position: relative;
  padding: 50px;
  display: flex;

  .content-section {
    width: 50%;
  }

  @media ${devices.lg} {
    padding: 0 24px;
    gap: 24px;
    justify-content: space-between;

    .left-section {
      width: 25%;
    }
    .right-section {
      width: 65%;
    }
  }

  @media ${devices.md} {
    flex-direction: column;

    .content-section {
      width: 100%;
    }
  }
`;

const CenteredIconContainer = styled(LinkIconContainer)`
  justify-content: center;
  margin-top: 44px;
`;

const AboutLeftContainer = styled.div`
  position: relative;
  height: 800px;

  @media ${devices.md} {
    height: auto;
  }
`;

const AboutLeftInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 80px;

  @media ${devices.lg} {
    .mimoticon-img {
      width: 220px;
    }
  }

  @media ${devices.md} {
    position: relative;
    top: 0;

    .mimoticon-img {
      width: 180px;
    }
  }
`;

const AboutRightContainer = styled.div`
  height: 1200px;
  @media ${devices.md} {
    height: auto;
    .buttons {
      display: flex;
      justify-content: center;
    }
  }
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

  @media ${devices.lg} {
    h2 {
      font-size: 1.25rem;
    }
    h3 {
      font-size: 1.75rem;
      margin: 24px 0 16px;
    }
  }
  @media ${devices.sm} {
    padding-bottom: 32px;

    h2 {
      font-size: 1.125rem;
    }
    h3 {
      font-size: 1.25rem;
      margin: 16px 0 8px;
    }
    p {
      margin-bottom: 24px;
    }
  }
`;

const InfoContent = styled.div`
  &:not(:last-child) {
    margin-bottom: 40px;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 16px;
  }

  .stack-wrapper {
    display: flex;
    gap: 40px;
    flex-wrap: wrap;

    h5 {
      font-family: "Caveat";
      margin-bottom: 8px;
    }
  }

  @media ${devices.lg} {
    h3 {
      font-size: 1.125rem;
    }
  }

  @media ${devices.md} {
    &:not(:last-child) {
      margin-bottom: 32px;
    }

    h3 {
      text-align: center;
      margin-bottom: 12px;
    }

    .stack-wrapper {
      justify-content: center;
      text-align: center;
    }
  }
`;

function About() {
  const [infoData, setInfoData] = useState<InfoDataProps[]>();
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

  useEffect(() => {
    const fetchInfoData = async () => {
      try {
        const response = await fetch("/data/infoData.json");
        const data: InfoDataProps[] = await response.json();
        setInfoData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInfoData();
  }, []);

  const workExperience = infoData?.filter((item) => item.type === "work");
  const education = infoData?.filter((item) => item.type === "education");

  return (
    <AboutSection id="about">
      <AboutLeftContainer className="content-section left-section">
        <AboutLeftInner>
          <img src={imageSrc} alt="미모티콘" className="mimoticon-img" />
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

      <AboutRightContainer className="content-section right-section">
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
          <div className="buttons">
            <Button
              primary
              buttonText="이력서 보러가기"
              icon={RiShareBoxLine}
              onMouseEnter={() => handleMouseEnter("first")}
              onMouseLeave={handleMouseLeave}
            />
            <Link to={"projects"} spy={true} smooth={true} duration={1000}>
              <Button
                outline
                buttonText="프로젝트 바로가기"
                icon={IoArrowDownSharp}
                onMouseEnter={() => handleMouseEnter("second")}
                onMouseLeave={handleMouseLeave}
              />
            </Link>
          </div>
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
            {workExperience?.map((infoData) => (
              <Accordion key={infoData.title} infoData={infoData} />
            ))}
          </InfoContent>

          <InfoContent>
            <h3>EDUCATION</h3>
            {education?.map((infoData) => (
              <Accordion key={infoData.title} infoData={infoData} />
            ))}
          </InfoContent>
        </div>
      </AboutRightContainer>
    </AboutSection>
  );
}

export default About;
