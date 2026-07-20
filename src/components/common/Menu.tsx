import styled from "styled-components";
import devices from "@constants/devices";

interface HamburgerProps {
  onClick: () => void;
  isOpen: boolean;
}

const MenuContainer = styled.div`
  cursor: pointer;
  display: flex;
  gap: 0.5rem;

  &:hover {
    .menu-text {
      transform: translateY(-100%);
    }
    .menu-text-hover {
      transform: translateY(0);
    }
    .menu-text-close {
      opacity: 0;
    }
  }
`;

const MenuText = styled.div`
  overflow: hidden;
  position: relative;
  width: 45px;
  height: 20px;

  span {
    font-family: "Montserrat";
    font-weight: 600;
    font-size: 1rem;
    transition: all 300ms;
    position: absolute;
    left: 0;
    padding-top: 3px;
  }

  .menu-text-hover {
    transform: translateY(100%);
  }

  .menu-text-close,
  .menu-text.open,
  .menu-text-hover.open {
    opacity: 0;
  }

  .menu-text-close.open {
    opacity: 1;
  }
`;
const HamburgerMenu = styled.div`
  width: 24px;
  height: 21px;
  position: relative;
  cursor: pointer;

  .bar {
    background-color: ${(props) => props.theme.textColor};
    position: absolute;
    border-radius: 2px;
    transition: 0.3s cubic-bezier(0.8, 0.5, 0.2, 1.4);
    width: 100%;
    height: 3px;
    transition-duration: 500ms;
  }

  .bar1 {
    top: 0px;
    left: 0px;
  }

  .bar2 {
    top: 9px;
    left: 0px;
    opacity: 1;
  }

  .bar3 {
    bottom: 0px;
    left: 0px;
  }

  &:not(.open):hover .bar1 {
    transform: rotate(-3deg) scaleY(1.1);
  }
  &:not(.open):hover .bar2 {
    transform: rotate(3deg) scaleY(1.1);
  }
  &:not(.open):hover .bar3 {
    transform: rotate(-4deg) scaleY(1.1);
  }

  &.open .bar1 {
    transform: rotate(45deg);
    top: 11px;
  }
  &.open .bar2 {
    opacity: 0;
  }
  &.open .bar3 {
    transform: rotate(-45deg);
    top: 11px;
  }

  @media ${devices.lg} {
    display: inline-block;
  }
`;

function Menu({ onClick, isOpen }: HamburgerProps) {
  return (
    <MenuContainer onClick={onClick}>
      <MenuText>
        <span className={`menu-text ${isOpen ? "open" : ""}`}>Menu</span>
        <span className={`menu-text-hover ${isOpen ? "open" : ""}`}>Open</span>
        <span className={`menu-text-close ${isOpen ? "open" : ""}`}>Close</span>
      </MenuText>

      <HamburgerMenu className={isOpen ? "open" : ""}>
        <span className="bar bar1"></span>
        <span className="bar bar2"></span>
        <span className="bar bar3"></span>
      </HamburgerMenu>
    </MenuContainer>
  );
}

export default Menu;
