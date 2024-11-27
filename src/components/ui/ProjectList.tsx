import styled from "styled-components";
import ProjectCard from "./ProjectCard";
import { ProjectDataProps } from "../sections/Projects";
import devices from "../../constants/devices";

export interface ProjectListProps {
  projects: ProjectDataProps[];
  selectedCategory: string;
}

const StyledProjectList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;

  > div {
    width: calc(100% / 3 - 24px);
  }

  @media ${devices.lg} {
    > div {
      width: calc(100% / 2 - 8px);
    }
  }

  @media ${devices.sm} {
    > div {
      width: 100%;
    }
  }
`;

function ProjectList({ projects, selectedCategory }: ProjectListProps) {
  const filteredProject =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <StyledProjectList>
      {filteredProject.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </StyledProjectList>
  );
}

export default ProjectList;
