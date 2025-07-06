import Button from "@components/common/Button";
import ProjectList from "@components/ProjectList";
import { useState } from "react";
import { Project } from "src/type/types";
import styled from "styled-components";

const VISIBLE_PROJECT_COUNT = 6;
const categories = ["all", "team", "personal", "work"] as const;
type Category = (typeof categories)[number];

const CategoryFilter = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 20px 0;
  background: ${({ theme }) => theme.filterBar};
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  z-index: 15;
  will-change: transform;
  transform: translateZ(0);

  button {
    font-weight: 500;
    position: relative;
    border: 1px solid #c7c7c7;
    border-radius: 4px;
    padding: 6px 12px 6px 24px;
    overflow: hidden;

    &:before,
    &:after {
      content: "";
      position: absolute;
      transition: all 0.3s;
    }

    &:after {
      width: 6px;
      height: 6px;
      border-radius: 30px;
      border: 1px solid;
      border-color: #c7c7c7;
      left: 8px;
      top: 50%;
      transform: translateY(-50%);
    }

    &:before {
      width: 100%;
      height: 0;
      left: 0;
      bottom: 0;
      z-index: -1;
    }

    &.active:before,
    &:hover:before {
      height: 100%;
      background: var(--primary-gradient);
    }
    &.active,
    &:hover {
      color: white;
    }
    &:hover:after {
      border-color: white;
    }
    &.active:after {
      background-color: white;
      border-color: white;
    }
    &.active:hover:after {
      background-color: black;
      border-color: black;
    }
    &.active:hover {
      color: black;
    }
  }
`;

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

type Props = {
  data: Project[];
};

export default function ProjectPage({ data }: Props) {
  const [visibleCount, setVisibleCount] = useState(VISIBLE_PROJECT_COUNT);
  const [category, setCategory] = useState<Category>("all");

  // 카테고리 첫 글자 대문자
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const handleClick = () => {
    setVisibleCount((prev) => prev + VISIBLE_PROJECT_COUNT);
  };

  return (
    <div>
      <ProjectList
        data={data}
        visibleCount={visibleCount}
        category={category}
      />

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

      {visibleCount < data.length && (
        <ButtonWrapper>
          <Button onClick={handleClick}>LOAD MORE +</Button>
        </ButtonWrapper>
      )}
    </div>
  );
}
