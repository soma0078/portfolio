import { BsGithub } from "react-icons/bs";
import Button from "./ui/Button";
import { ProjectCardProps } from "./ui/ProjectCard";
import { RiShareBoxLine } from "react-icons/ri";
import styled from "styled-components";
import { flexStyle } from "../styles/commonStyles";
import ThumbnailGallery from "./ui/ThumbnailGallery";

const ProjectTopBar = styled.div`
  text-align: center;

  .date {
    display: block;
    margin: 24px 0;
    color: #818181;
  }
`;

const ProjectContainer = styled.div`
  ${flexStyle}
  gap: 50px;
  margin-top: 32px;

  > div {
    width: calc(100% / 2);
  }

  img {
    width: 100%;
  }
`;

function DetailPopupContent({ project }: ProjectCardProps) {
  return (
    <>
      <ProjectTopBar>
        <h5 className="popup-project-title">{project.title}</h5>
        <span className="date">{project.date}</span>
        <Button primary buttonText="Github 바로가기" icon={BsGithub} />
        <Button outline buttonText="사이트 바로가기" icon={RiShareBoxLine} />
      </ProjectTopBar>
      <ProjectContainer>
        {/* TODO: 썸네일 갤러리 추가 */}
        <ThumbnailGallery
          title={project.title}
          thumbnailImages={project.thumbnailImages}
        />

        {/* TODO: 프로젝트 상세 정보 추가 */}
      </ProjectContainer>
    </>
  );
}

export default DetailPopupContent;
