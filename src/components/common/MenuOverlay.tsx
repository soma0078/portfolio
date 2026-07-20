import styled from "styled-components";
import { Link } from "react-scroll";
import MENU_ITEMS from "@constants/menuItems";
import {
  ResumeButton,
  LangButton,
  SocialLinks,
} from "@components/common/ProfileLinks";

const Overlay = styled.nav<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 24px;
  width: 100vw;
  height: 100dvh;
  z-index: -1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    z-index: -2;
    width: ${({ isOpen }) => (isOpen ? "100vw" : "0")};
    height: ${({ isOpen }) => (isOpen ? "100dvh" : "0")};
    pointer-events: none;

    border-bottom-left-radius: ${({ isOpen }) => (isOpen ? "0%" : "200%")};
    transition:
      all 700ms cubic-bezier(0.77, 0, 0.175, 1),
      border-radius 900ms linear;
  }

  &::before {
    background-color: ${({ theme }) => theme.bgColorOpacity};
    transition-delay: ${({ isOpen }) => (isOpen ? "0s" : "200ms")};
  }

  &::after {
    background-color: ${({ theme }) => theme.bgColor};
    transition-delay: ${({ isOpen }) => (isOpen ? "200ms" : "0s")};
  }

  /* skew 호버는 nav 메뉴 링크에만 적용 (이력서/SNS 등 새 요소 제외) */
  .nav-link:hover {
    cursor: pointer;
    transition: all 300ms;
    transform: skewX(-15deg);

    div {
      background: var(--primary-gradient);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;

const Menu = styled.div<{ delay: number; isOpen: boolean }>`
  font-family: "Montserrat";
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textColor};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(20px)")};
  transition: all 500ms ease-out;
  transition-delay: ${({ delay, isOpen }) => (isOpen ? delay + 0.5 : 0)}s;
`;

/* 메뉴 항목과 이어지는 fade-in 래퍼 */
const ExtraArea = styled.div<{ delay: number; isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 24px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(20px)")};
  transition: all 500ms ease-out;
  transition-delay: ${({ delay, isOpen }) => (isOpen ? delay + 0.5 : 0)}s;
`;

function MenuOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Overlay isOpen={isOpen}>
      {MENU_ITEMS.map(({ menu, id }, index) => (
        <Link
          key={id}
          to={id}
          spy={true}
          smooth={true}
          duration={600}
          onClick={onClose}
          className="nav-link"
        >
          <Menu delay={index * 0.1} isOpen={isOpen}>
            {menu}
          </Menu>
        </Link>
      ))}

      <ExtraArea delay={MENU_ITEMS.length * 0.1} isOpen={isOpen}>
        <ResumeButton onClick={onClose} />
        <SocialLinks />
        <LangButton />
      </ExtraArea>
    </Overlay>
  );
}

export default MenuOverlay;
