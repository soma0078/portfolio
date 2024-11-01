import { IconType } from "react-icons";
import styled from "styled-components";
import { hoverPrimaryColor } from "../../styles/commonStyles";

interface LinkIconProps {
  href?: string;
  icon: IconType;
  target?: string;
}

const StyledIconLink = styled.a`
  ${hoverPrimaryColor}
  font-size: 1.5rem;
`;

function LinkIcon({ href, icon: Icon, target }: LinkIconProps) {
  return (
    <StyledIconLink href={href} target={target} rel="noopener noreferrer">
      <Icon />
    </StyledIconLink>
  );
}

export default LinkIcon;
