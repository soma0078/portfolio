import { ReactNode, useState } from "react";
import styled, { css } from "styled-components";
import { tooltip } from "../../styles/animations";
import Toast from "./Toast";
import { hoverPrimaryColor } from "../../styles/commonStyles";

interface TooltipProps {
  children: ReactNode;
  message: string;
  direction: "bottom" | "bottom-left" | "bottom-right";
}

const TooltipContainer = styled.div`
  position: relative;

  &:hover {
    ${hoverPrimaryColor}
  }

  &:hover > .tooltip {
    display: block;
    animation: ${tooltip} 0.8s ease-in-out;
    color: #333;
  }
`;

const TooltipContent = styled.p<{ direction: TooltipProps["direction"] }>`
  display: none;
  position: absolute;
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    background-color: #e9e9e9;
  }

  ${({ direction }) => {
    switch (direction) {
      case "bottom":
        return css`
          left: 50%;
          transform: translateX(-50%);
        `;
      case "bottom-left":
        return css`
          left: 80%;
          transform: translateX(-80%);
        `;
      case "bottom-right":
        return css`
          right: 80%;
          transform: translateX(80%);
        `;
    }
  }}
`;

function Tooltip({ children, message, direction }: TooltipProps) {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  return (
    <>
      <TooltipContainer>
        {children}
        <TooltipContent
          className="tooltip"
          direction={direction}
          onClick={handleCopy}
        >
          {message}
        </TooltipContent>
      </TooltipContainer>
      {showToast && <Toast toastMessage="복사되었습니다." />}
    </>
  );
}

export default Tooltip;
