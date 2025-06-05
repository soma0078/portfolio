import { Project } from "src/type/types";
import styled from "styled-components";

const Thumbnail = styled.div`
  width: 100%;

  h5 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0.375rem;
  }
  span {
    font-size: 0.875rem;
    font-family: "Gmarket Sans";
  }

  img {
    width: 100%;
  }
`;

type Props = {
  data: Project;
};

function ProjectThumbnail({ data }: Props) {
  return (
    <Thumbnail>
      <img
        src={`/images/sections/04/${data.imgSrc}.png`}
        alt={`${data.title} 썸네일 이미지`}
      />
      <h5>{data.projectTitle}</h5>
      <span>{data.title}</span>
    </Thumbnail>
  );
}

export default ProjectThumbnail;
