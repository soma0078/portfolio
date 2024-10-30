import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";

interface ToastProps {
  toastMessage: string;
}

const ToastContainer = styled.div`
  background-color: rgba(238, 238, 238, 0.8);
  border-radius: 8px;
  gap: 8px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  color: #333;
  box-shadow: #bcbcbc 0 2px 8px;
`;

function Toast({ toastMessage }: ToastProps) {
  return (
    <ToastContainer>
      <FaCheckCircle color="#985EA4" /> {toastMessage}
    </ToastContainer>
  );
}

export default Toast;
