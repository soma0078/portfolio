import styled from "styled-components";
import devices from "../../constants/devices";

interface HamburgerProps {
  onClick: () => void;
  isOpen: boolean;
}

const HamburgerMenu = styled.div`
  display: none;
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

function MobileMenu({ onClick, isOpen }: HamburgerProps) {
  return (
    <HamburgerMenu onClick={onClick} className={isOpen ? "open" : ""}>
      <span className="bar bar1"></span>
      <span className="bar bar2"></span>
      <span className="bar bar3"></span>
    </HamburgerMenu>
  );
}

export default MobileMenu;
