import { Project } from "src/type/types";

type Props = {
  data: Project;
  className: string;
  dataSpeed: number;
  onClick: () => void;
};

const STAGGER =
  "lg:[&:nth-child(3n+1)]:translate-y-[30px] lg:[&:nth-child(3n+3)]:translate-y-[50px]";

function ProjectThumbnail({ data, className, dataSpeed = 1, onClick }: Props) {
  return (
    <div
      className={`group relative w-full cursor-pointer ${STAGGER} ${className}`}
      data-speed={dataSpeed}
      onClick={onClick}
    >
      <div className="w-full overflow-hidden transition-all duration-500 group-hover:scale-95">
        <img
          src={`/images/sections/04/${data.imgSrc}.png`}
          alt={`${data.title} 썸네일 이미지`}
          className="w-full transition-all duration-500 group-hover:scale-110"
        />
      </div>

      <h5 className="relative my-2 inline-block text-xl font-semibold tracking-[-1px] before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-(--legacy-text) before:transition-[width] before:duration-500 before:content-[''] group-hover:before:w-full">
        {data.projectTitle}
      </h5>

      <span className="block font-['Gmarket_Sans'] text-sm">{data.title}</span>
    </div>
  );
}

export default ProjectThumbnail;
