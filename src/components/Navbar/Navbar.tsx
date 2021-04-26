import React from 'react';
import { NavLink } from 'react-router-dom';
import { NarbarWrapper, ListStyles } from './NavbarStyles';

export const Navbar = () => {
  return (
    <NarbarWrapper>
      <ListStyles>
        <li><NavLink to="/">Strona główna</NavLink></li>
        <li><NavLink to="/tables">Stoły</NavLink></li>
      </ListStyles>
    </NarbarWrapper>
  );
};
