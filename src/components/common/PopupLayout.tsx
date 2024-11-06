import { MdClose } from "react-icons/md";
import styled from "styled-components";
import { ReactNode, useEffect } from "react";

interface PopupProps {
  onClose: () => void;
  children: ReactNode;
}

const StyledPopupLayout = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

const PopupBackgound = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const PopupContentainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 1400px;
  padding: 64px;
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 24px;
  box-shadow: #666 0 0 15px;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 1.75rem;
  border-radius: 32px;

  color: ${({ theme }) => theme.textColor};

  &:hover {
    color: #333;
    background-color: #efefef;
  }
`;

function PopupLayout({ onClose, children }: PopupProps) {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <StyledPopupLayout>
      <PopupBackgound onClick={onClose} />
      <PopupContentainer>
        {children}
        <CloseButton onClick={onClose}>
          <MdClose />
        </CloseButton>
      </PopupContentainer>
    </StyledPopupLayout>
  );
}

export default PopupLayout;
