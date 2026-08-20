import ProjectThumbnail from "./common/ProjectThumbnail";
import { useNavigate } from "react-router-dom";
import { Project } from "src/type/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const GRID =
  "grid grid-cols-1 gap-5 px-6 pb-[12vh] md:grid-cols-2 md:px-16 md:pb-[15vh] lg:grid-cols-3 lg:px-[164px]";

interface Props {
  data: Project[];
  visibleCount?: number;
  category?: string;
}

export default function ProjectList({
  data,
  visibleCount,
  category = "all",
}: Props) {
  const navigate = useNavigate();

  // 필터링
  const filteredData =
    category === "all"
      ? data
      : data.filter((item) => item.category === category);

  // 보여줄 데이터 (visibleCount가 있으면 제한, 없으면 전체)
  const displayData = visibleCount
    ? filteredData.slice(0, visibleCount)
    : filteredData;

  const handleProjectClick = (projectId: number) => {
    navigate(`/projects/${projectId}`);
  };

  useGSAP(() => {
    // 패럴랙스는 다열 레이아웃(태블릿·데스크톱)에서만 적용
    // 1열이 되는 모바일에선 카드가 서로 다른 속도로 겹치므로 제외
    const mm = gsap.matchMedia();
    mm.add("(min-width: 769px)", () => {
      const elements = gsap.utils.toArray(
        ".project-thumbnail",
      ) as HTMLElement[];
      elements.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-speed") || "1");

        gsap.to(el, {
          y: () => -window.innerHeight * speed * 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: ".project-list",
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });
  });

  return (
    <div className={`project-list ${GRID}`}>
      {displayData.map((item, index) => (
        <ProjectThumbnail
          key={item.id}
          data={item}
          className="project-thumbnail"
          dataSpeed={1 + (index % 3) * 0.5}
          onClick={() => handleProjectClick(item.id)}
        />
      ))}
    </div>
  );
}
