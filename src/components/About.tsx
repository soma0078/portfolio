import styled from "styled-components";

const AboutSection = styled.section`
  width: 100%;
  height: 650px;
  background-color: #eee;
  padding: 50px;
`;

function About() {
  return <AboutSection id="about">About section</AboutSection>;
}

export default About;
