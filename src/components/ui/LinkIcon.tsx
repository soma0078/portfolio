import { IconType } from "react-icons";
import styled from "styled-components";
import { hoverPrimaryColor } from "../../styles/commonStyles";
import { ReactElement } from "react";

export interface LinkIconProps {
  href?: string;
  icon?: IconType;
  target?: string;
  onClick?: () => void;
  children?: ReactElement;
}

const StyledIconLink = styled.a`
  ${hoverPrimaryColor}
  font-size: 1.5rem;
`;

function LinkIcon({
  href,
  icon: Icon,
  target,
  onClick,
  children,
}: LinkIconProps) {
  return (
    <StyledIconLink
      href={href}
      target={target}
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {Icon && <Icon />}
      {children}
    </StyledIconLink>
  );
}

export default LinkIcon;
