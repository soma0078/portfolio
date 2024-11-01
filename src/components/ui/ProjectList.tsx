import styled from "styled-components";
import ProjectCard from "./ProjectCard";
import { ProjectDataProps } from "../sections/Projects";

export interface ProjectListProps {
  project: ProjectDataProps[];
}

const StyledProjectList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  > div {
    width: calc(100% / 3 - 32px);
  }
`;

function ProjectList({ project }: ProjectListProps) {
  return (
    <StyledProjectList>
      {project.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </StyledProjectList>
  );
}

export default ProjectList;
