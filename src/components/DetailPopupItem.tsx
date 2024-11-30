import { BsGithub } from "react-icons/bs";
import Button from "./ui/Button";
import { ProjectCardProps } from "./ui/ProjectCard";
import { RiShareBoxLine } from "react-icons/ri";
import styled from "styled-components";
import { flexStyle } from "../styles/commonStyles";
import ThumbnailGallery from "./ui/ThumbnailGallery";
import ProjectDetailList from "./ProjectDetailList";
import devices from "../constants/devices";

const StyledPopupContainer = styled.div`
  position: relative;
`;

const ProjectTopBar = styled.div`
  text-align: center;

  .date {
    display: block;
    margin: 24px 0;
    color: #818181;
  }

  .buttons {
    ${flexStyle}
    justify-content: center;
    flex-wrap: wrap;
  }

  @media ${devices.lg} {
    position: sticky;
    top: 0;
    background-color: ${({ theme }) => theme.bgColor};
    padding: 24px 0;
  }

  @media ${devices.sm} {
    .date {
      font-size: 0.85rem;
      margin: 12px 0;
    }
  }
`;

const ProjectContainer = styled.div`
  ${flexStyle}
  gap: 50px;
  margin-top: 32px;
  overflow-y: scroll;

  > div {
    width: calc(100% / 2);
  }

  img {
    width: 100%;
  }

  @media ${devices.lg} {
    flex-direction: column-reverse;
    max-height: 560px;
    padding-right: 8px;
    margin-bottom: 44px;
    margin-top: 8px;

    > div {
      width: 100%;
    }
  }

  @media ${devices.sm} {
    gap: 32px;
  }
`;

function DetailPopupItem({ project }: ProjectCardProps) {
  return (
    <StyledPopupContainer>
      <ProjectTopBar>
        <h5 className="popup-project-title">{project.title}</h5>
        <span className="date">{project.date}</span>
        <div className="buttons">
          <Button
            primary
            buttonText="Github 바로가기"
            icon={BsGithub}
            onClick={() => window.open(project.githubUrl)}
          />
          <Button
            outline
            buttonText="사이트 바로가기"
            icon={RiShareBoxLine}
            onClick={() => window.open(project.siteUrl)}
          />
        </div>
      </ProjectTopBar>
      <ProjectContainer>
        <ThumbnailGallery
          title={project.title}
          thumbnailImages={project.thumbnailImages}
        />

        <ProjectDetailList
          implementation={project.implementation}
          contribution={project.contribution}
          troubleshooting={project.troubleshooting}
        />
      </ProjectContainer>
    </StyledPopupContainer>
  );
}

export default DetailPopupItem;
