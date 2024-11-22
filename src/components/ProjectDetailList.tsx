import styled from "styled-components";
import ProjectDetailItem from "./ProjectDetailItem";
import { ProjectDetailProps } from "./sections/Projects";
import devices from "../constants/devices";

export interface ProjectDetailListProps {
  implementation: string[];
  contribution: ProjectDetailProps[];
  troubleshooting: ProjectDetailProps[];
}

const StyledProjectDetailList = styled.div`
  height: auto;
  overflow-y: auto;
  max-height: 560px;

  @media ${devices.lg} {
    overflow-y: visible;
    max-height: auto;
  }
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
