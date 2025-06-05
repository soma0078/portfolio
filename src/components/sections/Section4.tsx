import ProjectThumbnail from "@components/common/ProjectThumbnail";
import { useState } from "react";
import { Project } from "src/type/types";
import styled from "styled-components";

const StyledSection = styled.section`
  position: relative;
  padding: 0 164px;
  margin-top: 240px;

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

const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2.25rem;
  gap: 1.5rem;

  button {
    font-size: 1.125rem;
    font-family: "Gmarket Sans";
    position: relative;

    &:before,
    &:after {
      content: "";
      position: absolute;
    }

    &:not(:last-child):after {
      width: 4px;
      height: 4px;
      border-radius: 30px;
      background-color: ${({ theme }) => theme.textColor};
      right: -15px;
      top: 50%;
      transform: translateY(-50%);
    }

    &:before {
      width: 100%;
      height: 0;
      left: 0;
      bottom: 0;
      z-index: -1;
      transition: all 0.3s;
    }

    &.active:before,
    &:hover:before {
      height: 55%;
      background: var(--primary-gradient);
    }
  }
`;

type Props = {
  data: Project[];
};

const VISIBLE_PROJECT_COUNT = 6;
const categories = ["all", "team", "personal", "work"] as const;
type Category = (typeof categories)[number];

function Section4({ data }: Props) {
  const [visibleCount, setVisibleCount] = useState(VISIBLE_PROJECT_COUNT);

  const [category, setCategory] = useState<Category>("all");

  // 카테고리 첫 글자 대문자
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const filterdData =
    category === "all"
      ? data
      : data.filter((item) => item.category === category);

  const handleClick = () => {
    setVisibleCount((prev) => prev + VISIBLE_PROJECT_COUNT);
  };

  return (
    <StyledSection>
      <h3>My Project</h3>

      <CategoryFilter>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={category === c ? "active" : ""}
          >
            {capitalize(c)}
          </button>
        ))}
      </CategoryFilter>

      <ProjectList>
        {filterdData.slice(0, visibleCount).map((item) => (
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
