import styled from "styled-components";
import {
  CenteredContentSection,
  StyledSectionTitle,
} from "../../styles/commonStyles";
import { StyledSubTitle } from "../../styles/commonStyles";
import { useEffect, useState } from "react";
import ProjectList from "../ui/ProjectList";
import { iconMap } from "../../constants/icons";

type IconMapKeys = keyof typeof iconMap;

export interface ProjectDataProps {
  category: string;
  title: string;
  date: string;
  src: string;
  description: string;
  skills: IconMapKeys[];
  siteUrl: string;
  githubUrl: string;
}

const ProjectSection = styled(CenteredContentSection)`
  padding: 120px 0;
`;

function Projects() {
  const [project, setProject] = useState<ProjectDataProps[]>();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch("/data/projectThumbnailData.json");
        const data: ProjectDataProps[] = await response.json();

        setProject(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjectData();
  }, []);

  return (
    <ProjectSection id="projects">
      <StyledSubTitle>Experiences</StyledSubTitle>
      <StyledSectionTitle>Projects</StyledSectionTitle>
      {project && <ProjectList project={project} />}
    </ProjectSection>
  );
}

export default Projects;
