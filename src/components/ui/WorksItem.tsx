import { WorksDataProps } from "../sections/Works";
import styled from "styled-components";
import { MdOutlineArrowOutward } from "react-icons/md";

const StyledWorksItem = styled.div`
  position: relative;
  overflow: hidden;
  min-width: 500px;
  height: 490px;
  background-color: pink;

  img {
    width: 100%;
  }

  &:hover {
    button {
      opacity: 1;
    }

    .arrow-icon-wrapper {
      width: 90px;
      height: 90px;
      font-size: 2rem;
    }
  }
`;

const StyledCoveredButton = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  transition: all 0.5s;
  opacity: 0;

  .arrow-icon-wrapper {
    transition: all 0.5s;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #333;
    color: #fff;
    border-radius: 999px;
    align-items: center;
    justify-content: center;
    display: flex;
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
`;

function WorksItem({ mainImageSrc }: WorksDataProps) {
  return (
    <StyledWorksItem>
      <img src={mainImageSrc} />
      <StyledCoveredButton>
        <span className="arrow-icon-wrapper">
          <MdOutlineArrowOutward />
        </span>
      </StyledCoveredButton>
    </StyledWorksItem>
  );
}

export default WorksItem;
