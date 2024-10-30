import styled from "styled-components";
import {
  CenteredContentSection,
  LinkIconContainer,
} from "../../styles/commonStyles";
import MimoticontFront from "../../assets/images/mimoticon_front.png";

import { FaGithub } from "react-icons/fa";
import { SiVelog } from "react-icons/si";
import { SiGmail } from "react-icons/si";
import LinkIcon from "../ui/LinkIcon";
import { MY_EMAIL, MY_GITHUB_URL, MY_VELOG_URL } from "../../constants/urls";
import Tooltip from "../ui/Tooltip";

const AboutSection = styled(CenteredContentSection)`
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AboutRightContainer = styled.div``;

function About() {
  return (
    <AboutSection id="about">
      <AboutLeftContainer>
        <img src={MimoticontFront} alt="미모티콘" />
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
      </AboutLeftContainer>
      <AboutRightContainer></AboutRightContainer>
    </AboutSection>
  );
}

export default About;
