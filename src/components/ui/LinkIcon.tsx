import { IconType } from "react-icons";
import styled from "styled-components";
import { hoverPrimaryColor } from "../../styles/commonStyles";

export interface LinkIconProps {
  href?: string;
  icon: IconType;
  target?: string;
  onClick?: () => void;
}

const StyledIconLink = styled.a`
  ${hoverPrimaryColor}
  font-size: 1.5rem;
`;

function LinkIcon({ href, icon: Icon, target, onClick }: LinkIconProps) {
  return (
    <StyledIconLink
      href={href}
      target={target}
      rel="noopener noreferrer"
      onClick={onClick}
    >
      <Icon />
    </StyledIconLink>
  );
}

export default LinkIcon;
