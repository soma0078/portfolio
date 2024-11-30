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
import Resume from "../../assets/fe_resume.pdf";

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
            웹 퍼블리셔에서 프론트엔드 개발자로 전향하며, 사용자 경험을
            최우선으로 고려한 직관적이고 기능적인 인터페이스를 만드는 데
            집중하고 있습니다. React와 JavaScript를 활용하여 동적인 웹
            애플리케이션을 개발하며, 항상 실용적이고 효과적인 해결책을 찾아가고
            있습니다.
          </p>
          <p>
            협업 프로젝트를 경험하면서 팀원들과의 소통을 통해 더 나은 결과물을
            만들어가는 것에 큰 보람을 느꼈습니다. 다양한 의견을 반영해 개선점을
            찾고, 함께 성장하는 과정에서 더 나은 개발자로 발전하고 있습니다.
          </p>
          <div className="buttons">
            <LinkIcon href={`${Resume}`} target="_blank">
              <Button
                primary
                buttonText="이력서 보러가기"
                icon={RiShareBoxLine}
                onMouseEnter={() => handleMouseEnter("first")}
                onMouseLeave={handleMouseLeave}
              />
            </LinkIcon>
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
