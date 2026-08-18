import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

/** 텍스트 색 전환과 채워지는 원의 확장 속도 — 둘이 같은 리듬으로 움직여야 자연스럽다 */
const HOVER_DURATION = "1.2s";

interface ButtonProps {
  type?: "button" | "link";
  to?: string;
  target?: string;
  rel?: string;
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
  transition: all ${HOVER_DURATION};

  /*
   * 채워지는 원의 중심을 마우스가 들어온 지점(--hover-x/--hover-y)에 두고,
   * 지름은 --hover-diameter(버튼의 대각선 기준 px, JS가 mouseenter에서 채움)로
   * 준다. width/height를 버튼 자신의 %로 주면 가로가 긴 알약 버튼에서
   * 가로세로 비율이 달라 타원이 되므로, 두 축에 같은 px 값을 써서 원을 유지한다.
   * 어느 지점에서 들어와도 버튼 전체를 덮어야 하므로, 대각선 길이를 반지름
   * 기준으로 잡아 모서리에서 시작하는 최악의 경우까지 커버한다.
   */
  &:before,
  &:after {
    content: "";
    position: absolute;
    left: var(--hover-x, 50%);
    top: var(--hover-y, 50%);
    transform: translate(-50%, -50%);
    transition: all ${HOVER_DURATION};
    width: 0;
    height: 0;
    z-index: -1;
    border-radius: 50%;
    background: var(--primary-gradient);
  }
  &:hover {
    color: white;
  }
  &:hover:after {
    width: var(--hover-diameter, 260%);
    height: var(--hover-diameter, 260%);
    opacity: 0.5;
  }
  &:hover:before {
    width: calc(var(--hover-diameter, 260%) * 0.85);
    height: calc(var(--hover-diameter, 260%) * 0.85);
  }
`;

const StyledLink = styled(Link)`
  ${commonStyle}
`;

const StyledButton = styled.button`
  ${commonStyle}
`;

// 마우스가 들어온 지점과, 그 지점에서 시작해도 버튼 전체를 덮을 원의
// 지름(대각선 길이 기준)을 CSS 변수로 남긴다
function handleMouseEnter(event: React.MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  const diagonal = Math.hypot(rect.width, rect.height);

  event.currentTarget.style.setProperty(
    "--hover-x",
    `${((event.clientX - rect.left) / rect.width) * 100}%`,
  );
  event.currentTarget.style.setProperty(
    "--hover-y",
    `${((event.clientY - rect.top) / rect.height) * 100}%`,
  );
  event.currentTarget.style.setProperty(
    "--hover-diameter",
    `${diagonal * 2}px`,
  );
}

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
      <StyledLink
        to={to}
        className={className}
        onMouseEnter={handleMouseEnter}
        {...rest}
      >
        {children}
      </StyledLink>
    );
  }
  return (
    <StyledButton
      className={className}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
