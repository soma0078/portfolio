import { useState } from "react";
import Button from "@components/common/Button";
import ProjectList from "@components/ProjectList";
import { Project } from "src/type/types";

const VISIBLE_PROJECT_COUNT = 6;
const categories = ["all", "team", "personal", "work"] as const;
type Category = (typeof categories)[number];

const CHIP = [
  "relative overflow-hidden rounded border border-[#c7c7c7] py-1.5 pr-3 pl-6 font-medium",
  "before:absolute before:bottom-0 before:left-0 before:-z-10 before:h-0 before:w-full",
  "before:transition-all before:duration-300 before:content-['']",
  "after:absolute after:top-1/2 after:left-2 after:size-1.5 after:-translate-y-1/2",
  "after:rounded-[30px] after:border after:border-[#c7c7c7]",
  "after:transition-all after:duration-300 after:content-['']",
  "hover:text-white hover:before:h-full hover:before:bg-[image:var(--primary-gradient)] hover:after:border-white",
].join(" ");

const CHIP_ACTIVE = [
  "text-white before:h-full before:bg-[image:var(--primary-gradient)]",
  "after:border-white after:bg-white",
  "hover:text-black hover:after:border-black hover:after:bg-black",
].join(" ");

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

      <div
        className="fixed bottom-0 z-15 flex w-full justify-center gap-2 bg-[image:var(--legacy-filter-bar)] py-5"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`${CHIP} ${category === c ? CHIP_ACTIVE : ""}`}
          >
            {capitalize(c)}
          </button>
        ))}
      </div>

      {visibleCount < data.length && (
        <div className="flex w-full items-center justify-center">
          <Button onClick={handleClick}>LOAD MORE +</Button>
        </div>
      )}
    </div>
  );
}
