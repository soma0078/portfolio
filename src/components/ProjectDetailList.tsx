import ProjectDetailItem from "./ProjectDetailItem";
import { ProjectDetailProps } from "./sections/Projects";

export interface ProjectDetailListProps {
  implementation: string[];
  contribution: ProjectDetailProps[];
  troubleshooting: ProjectDetailProps[];
}

function ProjectDetailList({
  implementation,
  contribution,
  troubleshooting,
}: ProjectDetailListProps) {
  return (
    <div>
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
    </div>
  );
}

export default ProjectDetailList;
