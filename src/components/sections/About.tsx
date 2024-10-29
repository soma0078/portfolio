import styled from "styled-components";
import { CenteredContentSection } from "../../styles/commonStyles";

const AboutSection = styled(CenteredContentSection)`
  background-color: #eee;
  padding: 50px;
`;

function About() {
  return <AboutSection id="about">About section</AboutSection>;
}

export default About;
