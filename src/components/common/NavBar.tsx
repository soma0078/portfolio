import styled from "styled-components";
import { Link } from "react-scroll";

const NAV_MENU = [
  { menu: "About", id: "about" },
  { menu: "Projects", id: "projects" },
  { menu: "Works", id: "works" },
  { menu: "Contact", id: "contact" },
];

const NavWrapper = styled.nav`
  display: flex;
  gap: 24px;
`;

const NavBtn = styled.button`
  border: 0px;
  font-size: 1.125rem;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  color: ${({ theme }) => theme.textColor};
`;

function NavBar() {
  return (
    <NavWrapper>
      {NAV_MENU.map(({ menu, id }) => (
        <Link key={id} to={id} spy={true} smooth={true} duration={1000}>
          <NavBtn>{menu}</NavBtn>
        </Link>
      ))}
    </NavWrapper>
  );
}

export default NavBar;
