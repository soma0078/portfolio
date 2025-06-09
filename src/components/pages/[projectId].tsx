import { useParams } from "react-router-dom";
import { data } from "src/assets/data";

function ProjectDetailPage() {
  const { projectId } = useParams();

  const project = data.projects.find((item) => String(item.id) === projectId);

  if (!project) return <div>프로젝트를 찾을 수 없습니다.</div>;

  return (
    <>
      <h2>{project.title}</h2>
      <div>프로젝트 디테일 페이지</div>
    </>
  );
}

export default ProjectDetailPage;
