import { WorksDataProps } from "../sections/Works";
import styled from "styled-components";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useState } from "react";
import PopupLayout from "../common/PopupLayout";
import WorksPopupContent from "../WorksPopupContent";

export interface WorksProps {
  worksData: WorksDataProps;
}

const StyledWorksItem = styled.div`
  position: relative;
  overflow: hidden;
  min-width: 500px;
  height: 490px;

  img {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transition: all 3s;
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
    img {
      top: 100%;
      transform: translateY(-100%);
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

function WorksItem({ worksData }: WorksProps) {
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const openPopup = () => setIsOpenPopup(true);

  const handleClose = () => {
    setIsOpenPopup(false);
  };

  return (
    <>
      <StyledWorksItem onClick={openPopup}>
        <img src={worksData.mainImageSrc} />
        <StyledCoveredButton>
          <span className="arrow-icon-wrapper">
            <MdOutlineArrowOutward />
          </span>
        </StyledCoveredButton>
      </StyledWorksItem>

      {isOpenPopup && (
        <PopupLayout onClose={handleClose}>
          <WorksPopupContent worksData={worksData} />
        </PopupLayout>
      )}
    </>
  );
}

export default WorksItem;
