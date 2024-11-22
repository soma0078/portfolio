import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";
import { useState } from "react";
import devices from "../../constants/devices";

export interface InfoDataProps {
  type: string;
  img: string;
  title: "work" | "education";
  companyName: string;
  date: string;
  detailContent: string;
}

interface AccordionProps {
  infoData: InfoDataProps;
}

const StyledAccordion = styled.div`
  border-radius: 32px;
  border: 1px solid #d9d9d9;
  padding: 28px 24px;
  margin-bottom: 16px;

  .toggle-btn {
    grid-area: "button";
    color: #818181;
    font-size: 1.25rem;
    border-radius: 32px;

    &:hover {
      background-color: #efefef;
    }
  }

  .title-content {
    grid-area: "title";
    min-width: 240px;
    line-height: 1.4;
  }

  .accordion-top {
    display: grid;
    grid-template-areas: "logo title date button";
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 4px;

    b {
      font-weight: 600;
    }
  }

  .edu-logo {
    grid-area: "logo";
    border-radius: 99px;
    border: 1px solid #d9d9d9;
    padding: 2px 4px;
    overflow: hidden;
    background-color: #fff;
  }

  .date {
    grid-area: "date";
    color: #818181;
    font-size: 0.875rem;
  }

  .accordion-bottom {
    height: 0;
    opacity: 0;
    transition: all 0.3s;

    p {
      display: none;
    }
  }

  .accordion-bottom.open {
    border-top: 1px solid #d9d9d9;
    padding: 16px 8px 0;
    margin-top: 16px;
    height: 100%;
    opacity: 1;

    p {
      display: block;
    }
  }

  @media ${devices.lg} {
    .edu-logo {
      width: 40px;
      height: 40px;
      line-height: 40px;
      img {
        width: 100%;
      }
    }
  }

  @media ${devices.md} {
    .title-content {
      min-width: auto;
    }

    .date {
      font-size: 0.75rem;
    }
  }

  @media ${devices.sm} {
    padding: 24px;

    .accordion-top {
      grid-template-columns: 2fr 32px;
      gap: 8px 0;
    }
    .title-content {
      grid-row: 2;
    }
    .date {
      grid-row: 3;
    }
    .toggle-btn {
      grid-row: 2;
    }
  }
`;

function Accordion({ infoData }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <StyledAccordion>
      <div className="accordion-top">
        <span className="edu-logo">
          <img src={infoData.img} alt={`${infoData.companyName} 로고`} />
        </span>
        <div className="title-content">
          <p>{infoData.title}</p>
          <b>{infoData.companyName}</b>
        </div>
        <span className="date">{infoData.date}</span>

        <button onClick={toggleAccordion} className="toggle-btn">
          {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </div>

      <div className={`accordion-bottom ${isOpen ? "open" : ""}`}>
        <p>{infoData.detailContent}</p>
      </div>
    </StyledAccordion>
  );
}

export default Accordion;
