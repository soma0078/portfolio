import styled, { keyframes } from "styled-components";
import { Link } from "react-scroll";

const MENU_ITEM = [
  { menu: "HOME", id: "home" },
  { menu: "EXPERIENCE", id: "Experience" },
  { menu: "PROJECTS", id: "projects" },
  { menu: "CONTACT", id: "contact" },
];

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
	
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(20px);
  }
`;

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
    transition: all 700ms cubic-bezier(0.77, 0, 0.175, 1),
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

  a:hover {
    cursor: pointer;
    transition: all 300ms;
    transform: skewX(-15deg);

    span {
      background: var(--primary-gradient);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;

const Menu = styled.span<{ delay: number; isOpen: boolean }>`
  font-family: "Montserrat";
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textColor};
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 500ms ease-out
    forwards;
  animation-delay: ${({ isOpen, delay }) => (isOpen ? delay + 0.5 : 0)}s;
  opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
`;

function MenuOverlay({ isOpen }: { isOpen: boolean }) {
  return (
    <Overlay isOpen={isOpen}>
      {MENU_ITEM.map(({ menu, id }, index) => (
        <Link key={id} to={id} spy={true} smooth={true} duration={600}>
          <Menu delay={index * 0.1} isOpen={isOpen}>
            {menu}
          </Menu>
        </Link>
      ))}
    </Overlay>
  );
}

export default MenuOverlay;
