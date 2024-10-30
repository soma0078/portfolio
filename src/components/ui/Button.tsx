import { IconType } from "react-icons";
import styled, { css } from "styled-components";

interface ButtonProps {
  buttonText: string;
  icon: IconType;
  primary?: boolean;
  outline?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const StyledButton = styled.button<{ primary?: boolean; outline?: boolean }>`
  display: inline-block;
  border-radius: 999px;
  margin-right: 8px;
  background-color: transparent;
  padding: 12px 24px;
  font-size: 1.125rem;
  cursor: pointer;
  border: 0;
  transition: all 0.3s;

  ${(props) =>
    props.primary &&
    css`
      color: #fff;
      background-color: var(--primary-color);

      &:hover {
        background-color: var(--primary-color-dark);
      }
    `}

  ${(props) =>
    props.outline &&
    css`
      color: ${({ theme }) => theme.textColor};
      border: 1px solid #aaa;

      svg {
        color: #aaa;
      }
      &:hover {
        background-color: rgba(238, 238, 238, 0.5);
      }
    `}
`;

const ButtonInner = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

function Button({ buttonText, icon: Icon, ...props }: ButtonProps) {
  return (
    <StyledButton {...props}>
      <ButtonInner>
        {buttonText}
        <Icon />
      </ButtonInner>
    </StyledButton>
  );
}

export default Button;
