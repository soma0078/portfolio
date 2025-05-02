import styled from "styled-components";
import ProjectCard from "./ProjectCard";
import { ProjectDataProps } from "@sections/Projects";
import devices from "@constants/devices";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef } from "react";

export interface ProjectListProps {
  projects: ProjectDataProps[];
  selectedCategory: string;
}

const StyledProjectList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  > div {
    width: calc(100% / 3 - 24px);
  }

  @media ${devices.lg} {
    > div {
      width: calc(100% / 2 - 8px);
    }
  }

  @media ${devices.sm} {
    > div {
      width: 100%;
    }
  }
`;

function ProjectList({ projects, selectedCategory }: ProjectListProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const filteredProject =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <StyledProjectList ref={ref}>
      <AnimatePresence mode="wait">
        {filteredProject.map((project) => (
          <motion.div
            key={project.title}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
              duration: 0.5,
            }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </AnimatePresence>
    </StyledProjectList>
  );
}

export default ProjectList;
