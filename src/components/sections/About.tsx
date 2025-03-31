import styled from "styled-components";
import {
  CenteredContentSection,
  LinkIconContainer,
} from "../../styles/commonStyles";
import MimoticonFront from "../../assets/images/mimoticon_front.png";
import MimoticonBack from "../../assets/images/mimoticon_back.png";
import MimoticonWink from "../..//assets/images/mimoticon_wink.png";

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
import Resume from "../../../public/assets/이송아_이력서.pdf";

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
          <p className="paragraph">
            웹 퍼블리셔 경험을 바탕으로 사용자 경험을 고려한 인터페이스를
            구현하며, 개발 역량을 확장하고 있습니다. 프로젝트를 진행하며 성능
            최적화와 유지보수를 고려한 구조적인 코드 작성에 집중하고 있으며,
            React와 TypeScript를 활용해 확장성과 안정성을 갖춘 애플리케이션을
            개발하고 있습니다.
          </p>
          <p className="paragraph bottom-paragraph">
            팀원들과 적극적으로 의견을 주고받으며 더 나은 해결책을 찾아가는
            과정에서 협업의 중요성을 실감했고, 이를 통해 단순한 기능 구현을 넘어
            서비스의 완성도를 높이는 데 기여하는 개발자로 성장하고 있습니다.
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
  @media ${devices.sm} {
    .mimoticon-img {
      width: 140px;
    }
  }
`;

const AboutRightContainer = styled.div`
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

  .paragraph {
    margin-bottom: 16px;
  }

  .bottom-paragraph {
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
    .paragraph {
      margin-bottom: 8px;
    }
    .bottom-paragraph {
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
