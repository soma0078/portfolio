import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

interface ButtonProps {
  type?: "button" | "link";
  to?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const commonStyle = css`
  position: relative;
  overflow: hidden;
  display: inline-block;

  padding: 10px 20px;
  font-size: 0.875rem;
  border-radius: 40px;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
  border: 1px solid ${({ theme }) => theme.textColor};
  text-decoration: none;
  transition: all 0.6s;

  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.6s;
    bottom: -50%;
    width: 0;
    height: 0;
    z-index: -1;
    border-radius: 999px;
    background: var(--primary-gradient);
  }
  &:hover {
    color: white;
  }
  &:hover:after {
    width: 140%;
    height: 240%;
    opacity: 0.5;
  }
  &:hover:before {
    width: 110%;
    height: 200%;
  }
`;

const StyledLink = styled(Link)`
  ${commonStyle}
`;

const StyledButton = styled.button`
  ${commonStyle}
`;

function Button({
  type = "button",
  to = "",
  children,
  className,
  onClick,
  ...rest
}: ButtonProps) {
  if (type === "link") {
    return (
      <StyledLink to={to} className={className}>
        {children}
      </StyledLink>
    );
  }
  return (
    <StyledButton className={className} onClick={onClick} {...rest}>
      {children}
    </StyledButton>
  );
}

export default Button;
