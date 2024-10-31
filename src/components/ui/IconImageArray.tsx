import styled from "styled-components";
import { flexStyle } from "../../styles/commonStyles";

interface ImageAttrProps {
  src: string;
  alt: string;
}

interface ImageArrayProps {
  attrs: ImageAttrProps[];
}

const StyledIconArray = styled.span`
  ${flexStyle}

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
`;

function IconImageArray({ attrs }: ImageArrayProps) {
  return (
    <StyledIconArray>
      {attrs.map(({ src, alt }) => (
        <img src={src} alt={`Icon ${alt}`} key={alt} />
      ))}
    </StyledIconArray>
  );
}

export default IconImageArray;
