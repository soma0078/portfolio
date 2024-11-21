import styled from "styled-components";
import {
  fullViewportSection,
  StyledSectionTitle,
  StyledSubTitle,
} from "../../styles/commonStyles";

import { useEffect, useRef, useState, WheelEvent } from "react";
import WorksItem from "../ui/WorksItem";

export interface WorksDataProps {
  mainImageSrc: string;
  title: string;
  siteUrl: string;
  description: string[];
  desktopImageSrc: string;
  mobileImageSrc: string[];
  role: string;
  rate: number;
}

const WorksSectoion = styled(fullViewportSection)`
  padding: 0 50px 90px;
  max-width: 100vw;
  overflow: hidden;
`;

const StyledWorkList = styled.div`
  &.work-list {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 16px;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      height: 0;
    }
  }
`;

function Works() {
  const [worksData, setWorksData] = useState<WorksDataProps[]>();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchWorksData = async () => {
      const response = await fetch("/data/worksData.json");
      const data: WorksDataProps[] = await response.json();
      setWorksData(data);
    };
    fetchWorksData();
  }, []);

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <WorksSectoion id="works">
      <StyledSubTitle>Works</StyledSubTitle>
      <StyledSectionTitle>Design & Publishing</StyledSectionTitle>

      {worksData && (
        <StyledWorkList
          className="work-list"
          ref={scrollRef}
          onWheel={handleWheel}
        >
          {worksData.map((worksData) => (
            <WorksItem worksData={worksData} />
          ))}
        </StyledWorkList>
      )}
    </WorksSectoion>
  );
}

export default Works;
