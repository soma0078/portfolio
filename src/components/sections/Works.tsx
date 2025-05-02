import styled from "styled-components";
import { useEffect, useRef, useState, WheelEvent } from "react";
import {
  fullViewportSection,
  StyledSectionTitle,
  StyledSubTitle,
} from "@styles/commonStyles";

import WorksItem from "@ui/WorksItem";
import devices from "@constants/devices";

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
      )}{" "}
      <LinkToNotion>
        더 많은 프로젝트는{" "}
        <a
          href="https://necessary-cost-1ab.notion.site/1cff1872069946b2a586b40f1af7670f"
          target="_blank"
        >
          여기로
        </a>{" "}
        방문하시면 확인 가능합니다!
      </LinkToNotion>
    </WorksSectoion>
  );
}

export default Works;

const WorksSectoion = styled(fullViewportSection)`
  padding: 0 50px 90px;
  max-width: 100vw;
  overflow: hidden;

  @media ${devices.lg} {
    padding: 0 24px 120px;
  }
`;

const StyledWorkList = styled.div`
  overscroll-behavior: contain;

  &.work-list {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 16px;
    scroll-behavior: smooth;
    touch-action: pan-x;

    &::-webkit-scrollbar {
      height: 0;
    }
  }
`;

const LinkToNotion = styled.p`
  margin-top: 24px;
  text-align: right;
`;
