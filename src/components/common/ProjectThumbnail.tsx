import { Project } from "src/type/types";
import styled from "styled-components";
import devices from "@constants/devices";

const Thumbnail = styled.div`
  width: 100%;
  position: relative;
  cursor: pointer;

  /* 3열 레이아웃용 스태거 오프셋 */
  &:nth-child(3n + 1) {
    transform: translateY(30px);
  }

  &:nth-child(3n + 3) {
    transform: translateY(50px);
  }

  /* 3열이 아닌 뷰포트(2열·1열)에선 오프셋 해제 (겹침 방지) */
  @media ${devices.lg} {
    &:nth-child(3n + 1),
    &:nth-child(3n + 3) {
      transform: none;
    }
  }

  h5 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0.5rem 0;
    letter-spacing: -1px;
    position: relative;
    display: inline-block;

    &:before {
      content: "";
      width: 0;
      height: 2px;
      background-color: ${({ theme }) => theme.textColor};
      position: absolute;
      left: 0;
      bottom: 0;
      transition: 0.5s;
    }
  }
  span {
    font-size: 0.875rem;
    font-family: "Gmarket Sans";
    display: block;
  }

  &:hover {
    .img-wrapper {
      transform: scale(0.95);
      img {
        transform: scale(1.1);
      }
    }
    h5:before {
      width: 100%;
    }
  }

  .img-wrapper {
    width: 100%;
    overflow: hidden;
    transition: all 0.5s;
  }
  img {
    width: 100%;
    transition: all 0.5s;
  }
`;

type Props = {
  data: Project;
  className: string;
  dataSpeed: number;
  onClick: () => void;
};

function ProjectThumbnail({ data, className, dataSpeed = 1, onClick }: Props) {
  return (
    <Thumbnail className={className} data-speed={dataSpeed} onClick={onClick}>
      <div className="img-wrapper">
        <img
          src={`/images/sections/04/${data.imgSrc}.png`}
          alt={`${data.title} 썸네일 이미지`}
        />
      </div>
      <h5>{data.projectTitle}</h5>
      <span>{data.title}</span>
    </Thumbnail>
  );
}

export default ProjectThumbnail;
