import styled from "styled-components";
import { iconMap } from "../../constants/icons";
import LinkIcon from "./LinkIcon";
import { BsGithub, BsInfoCircleFill } from "react-icons/bs";
import { RiShareBoxLine } from "react-icons/ri";
import { ProjectDataProps } from "../sections/Projects";
import { useState } from "react";
import PopupContent from "../DetailProjectContent";
import PopupLayout from "../common/PopupLayout";

export interface ProjectCardProps {
  project: ProjectDataProps;
}

const StyledProjectCard = styled.div`
  position: relative;
  border: 1px solid #d9d9d9;
  border-radius: 32px;
  overflow: hidden;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
`;

const ThumbnailInfoContainer = styled.div`
  border-radius: 0 40px 0 0;
  background-color: ${({ theme }) => theme.bgColor};
  padding: 24px;
  margin-top: -34px;
  z-index: 1;
  position: relative;

  h5 {
    font-weight: 600;
    font-size: 1.25rem;
    margin-bottom: 12px;
  }

  span {
    color: #818181;
    font-size: 0.875rem;
  }

  p {
    margin: 12px 0 16px;
  }
`;

const LinkIconWrapper = styled.div`
  display: flex;
  gap: 8px;
  position: absolute;
  right: 24px;

  svg {
    cursor: pointer;
  }
`;

const SkillIconsArray = styled.div`
  display: flex;
  gap: 8px;
`;

function ProjectCard({ project }: ProjectCardProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);

  const linkIcons = [
    { icon: BsInfoCircleFill, onClick: openPopup },
    { href: project.githubUrl, icon: BsGithub },
    { href: project.siteUrl, icon: RiShareBoxLine },
  ];

  return (
    <>
      <StyledProjectCard>
        <ThumbnailImage
          src={project.src}
          alt={`${project.title} 썸네일 이미지`}
        />
        <ThumbnailInfoContainer>
          <LinkIconWrapper>
            {linkIcons.map((linkIcon) => (
              <LinkIcon
                icon={linkIcon.icon}
                href={linkIcon.href}
                target="_blank"
                onClick={openPopup}
              />
            ))}
          </LinkIconWrapper>
          <h5>{project.title}</h5>
          <span>{project.date}</span>
          <p>{project.description}</p>
          <SkillIconsArray>
            {project.skills.map(
              (skill) =>
                iconMap[skill] && (
                  <img src={iconMap[skill]} alt={`Icon ${skill}`} key={skill} />
                )
            )}
          </SkillIconsArray>
        </ThumbnailInfoContainer>
      </StyledProjectCard>

      {isPopupOpen && (
        <PopupLayout onClose={() => setIsPopupOpen(false)}>
          <PopupContent project={project} />
        </PopupLayout>
      )}
    </>
  );
}

export default ProjectCard;
