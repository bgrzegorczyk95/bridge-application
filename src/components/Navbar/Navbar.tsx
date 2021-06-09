import { NarbarWrapper, ListStyles, NavLinkStyles } from './NavbarStyles';

export const Navbar = () => {
  return (
    <NarbarWrapper>
      <ListStyles>
        <NavLinkStyles to="/">Stoły</NavLinkStyles>
        <NavLinkStyles to="/change">Zmień nazwę</NavLinkStyles>
      </ListStyles>
    </NarbarWrapper>
  );
};
