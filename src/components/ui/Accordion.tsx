import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";
import { useState } from "react";

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

  button {
    color: #818181;
    font-size: 1.25rem;
    border-radius: 32px;

    &:hover {
      background-color: #efefef;
    }
  }

  .title-content {
    min-width: 240px;
  }

  .accordion-top {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    b {
      font-weight: 600;
    }
  }

  .edu-logo {
    border-radius: 99px;
    border: 1px solid #d9d9d9;
    padding: 2px 4px;
    overflow: hidden;
    background-color: #fff;
  }

  .date {
    color: #818181;
  }

  .accordion-bottom {
    padding: 16px 8px 0;
    margin-top: 16px;
    border-top: 1px solid #d9d9d9;
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

        <button onClick={toggleAccordion}>
          {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </div>
      {isOpen && (
        <div className="accordion-bottom">
          <p>{infoData.detailContent}</p>
        </div>
      )}
    </StyledAccordion>
  );
}

export default Accordion;
