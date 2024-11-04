import { BsGithub } from "react-icons/bs";
import Button from "./ui/Button";
import { ProjectCardProps } from "./ui/ProjectCard";
import { RiShareBoxLine } from "react-icons/ri";

function DetailPopupContent({ project }: ProjectCardProps) {
  return (
    <>
      <h5>{project.title}</h5>
      <span>{project.date}</span>
      <Button primary buttonText="Github 바로가기" icon={BsGithub} />
      <Button outline buttonText="사이트 바로가기" icon={RiShareBoxLine} />
      {/* TODO: 썸네일 갤러리 추가 */}
      {/* TODO: 프로젝트 상세 정보 추가 */}
    </>
  );
}

export default DetailPopupContent;
