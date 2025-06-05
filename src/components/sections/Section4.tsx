import ProjectThumbnail from "@components/common/ProjectThumbnail";
import { useState } from "react";
import { Project } from "src/type/types";
import styled from "styled-components";

const StyledSection = styled.section`
  position: relative;
  padding: 0 164px;

  h3 {
    font-size: 3.5rem;
    font-weight: 500;
    text-align: center;
    margin-bottom: 4rem;
  }
`;

const ProjectList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1.875rem;
  row-gap: 2.75rem;
`;

const MoreButton = styled.button`
  padding: 0.75rem 1.25rem;
  border-radius: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
  border: 1px solid ${({ theme }) => theme.textColor};
`;

type Props = {
  data: Project[];
};

const VISIBLE_PROJECT_COUNT = 6;

function Section4({ data }: Props) {
  const [visibleCount, setVisibleCount] = useState(VISIBLE_PROJECT_COUNT);

  const handleClick = () => {
    setVisibleCount((prev) => prev + VISIBLE_PROJECT_COUNT);
  };

  return (
    <StyledSection>
      <h3>My Project</h3>
      <ProjectList>
        {data.slice(0, visibleCount).map((item) => (
          <ProjectThumbnail key={item.id} data={item} />
        ))}
      </ProjectList>

      {visibleCount < data.length && (
        <MoreButton onClick={handleClick}>LOAD MORE +</MoreButton>
      )}
    </StyledSection>
  );
}

export default Section4;
