import styled from "styled-components";
import ProjectDetailItem from "./ProjectDetailItem";
import { ProjectDetailProps } from "./sections/Projects";

export interface ProjectDetailListProps {
  implementation: string[];
  contribution: ProjectDetailProps[];
  troubleshooting: ProjectDetailProps[];
}

const StyledProjectDetailList = styled.div`
  height: auto;
  overflow-y: auto;
  max-height: 560px;
`;

function ProjectDetailList({
  implementation,
  contribution,
  troubleshooting,
}: ProjectDetailListProps) {
  return (
    <StyledProjectDetailList>
      {implementation && (
        <ProjectDetailItem title="구현사항" contents={implementation} />
      )}
      {contribution && (
        <ProjectDetailItem
          title="작업기여도"
          contents={contribution}
          isDetailSection
        />
      )}
      {troubleshooting && (
        <ProjectDetailItem
          title="트러블슈팅"
          contents={troubleshooting}
          isDetailSection
        />
      )}
    </StyledProjectDetailList>
  );
}

export default ProjectDetailList;
