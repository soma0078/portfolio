import { RiShareBoxLine } from "react-icons/ri";
import LinkIcon from "./ui/LinkIcon";
import { WorksProps } from "./ui/WorksItem";
import styled from "styled-components";
import { flexStyle } from "../styles/commonStyles";
import devices from "../constants/devices";

const StyledPopupContent = styled.div`
  p {
    line-height: 1.4;
  }
  .title-wrapper {
    display: flex;
    gap: 2px;
  }

  .works-detail {
    ${flexStyle}
    margin-bottom: 8px;

    .primary-color-text {
      color: var(--primary-color);
    }
  }

  @media ${devices.lg} {
    .title-wrapper {
      padding-top: 24px;
    }
  }
`;

const ImagesWrapper = styled.div`
  ${flexStyle}
  margin-top: 32px;

  img {
    width: 100%;
    border-radius: 12px;
    border: 1px solid #d9d9d9;
  }

  .image-box {
    border-radius: 12px;
    border: 1px solid #d9d9d9;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  @media ${devices.lg} {
    flex-direction: column;
    max-height: 520px;
    overflow-y: scroll;
    padding-right: 10px;
    margin-bottom: 44px;
    gap: 16px;
  }
`;

const DesktopImage = styled.div`
  width: 38%;

  @media ${devices.lg} {
    width: 100%;
  }
`;
const MobileImages = styled.div`
  ${flexStyle}
  width: 60%;

  img {
    min-width: 140px;
    max-width: 210px;
    width: 100%;
  }

  @media ${devices.lg} {
    width: 100%;
  }
`;

function WorksPopup({ worksData }: WorksProps) {
  return (
    <StyledPopupContent>
      <div className="title-wrapper">
        <h3 className="popup-project-title">{worksData.title}</h3>
        <LinkIcon
          href={worksData.siteUrl}
          icon={RiShareBoxLine}
          target="_blank"
        />
      </div>
      <div className="works-detail">
        <p>
          <span className="primary-color-text">담당역할 </span>
          {worksData.role}
        </p>
        |
        <p>
          <span className="primary-color-text">기여도 </span>
          {worksData.rate}%
        </p>
      </div>
      {worksData.description.map((des) => (
        <p>{des}</p>
      ))}
      <ImagesWrapper>
        <DesktopImage className="image-box">
          <img src={worksData.desktopImageSrc} />
        </DesktopImage>
        <MobileImages className="image-box">
          {worksData.mobileImageSrc.map((imageUrl) => (
            <img src={imageUrl} />
          ))}
        </MobileImages>
      </ImagesWrapper>
    </StyledPopupContent>
  );
}

export default WorksPopup;
