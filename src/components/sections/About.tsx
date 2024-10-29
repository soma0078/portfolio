import styled from "styled-components";
import { CommonSection } from "../../styles/commonStyles";

const AboutSection = styled(CommonSection)`
  background-color: #eee;
  padding: 50px;
`;

function About() {
  return <AboutSection id="about">About section</AboutSection>;
}

export default About;
