import styled from "styled-components";
import { ProjectDetailProps } from "./sections/Projects";
import devices from "../constants/devices";

interface ProjectDetailItemProps {
  title: string;
  contents: string[] | ProjectDetailProps[];
  isDetailSection?: boolean;
}

const StyledProjectDetailItem = styled.div`
  &:not(:last-child) {
    margin-bottom: 24px;
    padding-bottom: 24px;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #d9d9d9;
  }

  h6 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 12px;
  }

  @media ${devices.lg} {
    h6 {
      font-size: 1.125rem;
    }
  }

  @media ${devices.sm} {
    h6 {
      font-size: 1rem;
    }
  }
`;

const StyledUl = styled.ul`
  padding-left: 25px;
  li {
    list-style: disc;
  }
`;

const StyledDepthUl = styled.ul`
  padding-left: 15px;
  margin-bottom: 8px;

  li {
    list-style: circle;
    margin-bottom: 4px;
  }
`;

const Subtitle = styled.li`
  font-weight: 500;
  list-style: disc;
  margin-bottom: 4px;
`;

function ProjectDetailItem({
  title,
  contents,
  isDetailSection = false,
}: ProjectDetailItemProps) {
  return (
    <StyledProjectDetailItem>
      <h6>{title}</h6>

      {isDetailSection ? (
        <div>
          {(contents as ProjectDetailProps[]).map((content) => (
            <>
              <StyledUl>
                <Subtitle>[{content.subtitle}]</Subtitle>
                <StyledDepthUl>
                  {content.details.map((detail) => (
                    <li>{detail}</li>
                  ))}
                </StyledDepthUl>
              </StyledUl>
            </>
          ))}
        </div>
      ) : (
        <StyledUl>
          {(contents as string[])?.map((content) => (
            <li>{content}</li>
          ))}
        </StyledUl>
      )}
    </StyledProjectDetailItem>
  );
}

export default ProjectDetailItem;
