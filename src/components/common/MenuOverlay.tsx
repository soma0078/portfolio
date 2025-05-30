import styled from "styled-components";
import { Link } from "react-scroll";

const MENU_ITEM = [
  { menu: "HOME", id: "home" },
  { menu: "EXPERIENCE", id: "Experience" },
  { menu: "PROJECTS", id: "projects" },
  { menu: "CONTACT", id: "contact" },
];

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
