import { useParams } from "react-router-dom";
import { data } from "src/assets/data";
import ProjectDetailHero from "@components/ProjectDetailHero";

function ProjectDetailPage() {
  const { projectId } = useParams();

  const project = data.projects.find((item) => String(item.id) === projectId);

  if (!project) return <div>프로젝트를 찾을 수 없습니다.</div>;

  return (
    <>
      <ProjectDetailHero project={project} />
    </>
  );
}

export default ProjectDetailPage;
