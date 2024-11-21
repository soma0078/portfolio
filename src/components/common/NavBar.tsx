import styled, { keyframes } from "styled-components";
import { Link } from "react-scroll";
import devices from "../../constants/devices";

interface NavBarProps {
  isOpen: boolean;
}

const NAV_MENU = [
  { menu: "About", id: "about" },
  { menu: "Projects", id: "projects" },
  { menu: "Works", id: "works" },
  { menu: "Contact", id: "contact" },
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

const NavWrapper = styled.nav`
  display: flex;
  gap: 24px;

  @media ${devices.lg} {
    display: none;

    &.open {
      display: flex;
      flex-direction: column;
      position: absolute;
      right: 24px;
      text-align: right;
      top: 64px;
      gap: 8px;
    }
  }
`;

const NavBtn = styled.button<{ delay: number }>`
  border: 0px;
  font-size: 1.125rem;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  color: ${({ theme }) => theme.textColor};

  @media ${devices.lg} {
    opacity: 0;
    transform: translateX(20px);
    animation: ${slideIn} 0.5s ease-out forwards;
    animation-delay: ${({ delay }) => delay}s;
  }
`;

function NavBar({ isOpen }: NavBarProps) {
  return (
    <NavWrapper className={isOpen ? "open" : ""}>
      {NAV_MENU.map(({ menu, id }, index) => (
        <Link key={id} to={id} spy={true} smooth={true} duration={1000}>
          <NavBtn delay={index * 0.1}>{menu}</NavBtn>
        </Link>
      ))}
    </NavWrapper>
  );
}

export default NavBar;
