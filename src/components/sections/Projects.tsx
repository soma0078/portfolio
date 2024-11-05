import styled from "styled-components";
import {
  CenteredContentSection,
  StyledSectionTitle,
} from "../../styles/commonStyles";
import { StyledSubTitle } from "../../styles/commonStyles";
import { useEffect, useState } from "react";
import ProjectList from "../ui/ProjectList";
import { iconMap } from "../../constants/icons";
import Filter from "../Filter";

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
  const [projects, setProjects] = useState<ProjectDataProps[]>();
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch("/data/projectThumbnailData.json");
        const data: ProjectDataProps[] = await response.json();

        setProjects(data);
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
      <Filter
        selectedCategory={selectedCategory}
        setSelectedCatergory={setSelectedCategory}
      />
      {projects && (
        <ProjectList projects={projects} selectedCategory={selectedCategory} />
      )}
    </ProjectSection>
  );
}

export default Projects;
