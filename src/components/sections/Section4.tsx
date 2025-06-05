import ProjectThumbnail from "@components/common/ProjectThumbnail";
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

type Props = {
  data: Project[];
};

function Section4({ data }: Props) {
  console.log(data);
  return (
    <StyledSection>
      <h3>My Project</h3>
      <ProjectList>
        {data.map((item) => (
          <ProjectThumbnail key={item.id} data={item} />
        ))}
      </ProjectList>
    </StyledSection>
  );
}

export default Section4;
