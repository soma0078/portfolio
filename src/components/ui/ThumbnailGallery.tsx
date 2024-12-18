import styled from "styled-components";
import { flexStyle, imgOutlineStyle } from "../../styles/commonStyles";
import { useState } from "react";
import devices from "../../constants/devices";

interface ThumbnailGalleryProps {
  title: string;
  thumbnailImages: string[];
}

const StyledThumbnailGallery = styled.div`
  @media ${devices.lg} {
    order: 2;
  }
`;

const MainThumbnailImage = styled.div`
  ${imgOutlineStyle}
  border-radius: 24px;
  height: 440px;

  img {
    width: 100%;
    transition: transform 0.5s ease;
  }

  @media ${devices.lg} {
    height: 320px;
  }

  @media ${devices.sm} {
    height: 220px;
  }
`;

const ThumbnailImageList = styled.div`
  ${flexStyle}
  margin-top: 16px;
  gap: 12px;
  flex-wrap: wrap;
`;

const ThumbnailImage = styled.div`
  ${imgOutlineStyle}
  width: 96px;
  height: 56px;
`;

function ThumbnailGallery({ title, thumbnailImages }: ThumbnailGalleryProps) {
  const [thumbnail, setThumbnail] = useState(thumbnailImages[0]);

  const handleClickImage = (image: string) => {
    setThumbnail(image);
  };

  return (
    <StyledThumbnailGallery>
      <MainThumbnailImage>
        <img src={thumbnail} alt={`${title} 썸네일 이미지`} />
      </MainThumbnailImage>

      <ThumbnailImageList>
        {thumbnailImages.map((image) => (
          <ThumbnailImage onClick={() => handleClickImage(image)}>
            <img src={image} alt={`${title} 썸네일 이미지`} />
          </ThumbnailImage>
        ))}
      </ThumbnailImageList>
    </StyledThumbnailGallery>
  );
}

export default ThumbnailGallery;
