import { NavLink } from 'react-router-dom';
import styled from "styled-components";


export const NarbarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 2px solid gray;
  background-color: rgb(60, 59, 103);
  
  @media (max-width: 400px) {
    justify-content: flex-start;
  }
`;

export const ListStyles = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  height: 100%;

  @media (max-width: 400px) {
    padding-left: 0;
  }

`;

export const NavLinkStyles = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0 20px;
  height: 100%;
  border-bottom: 2px solid gray;
  
  :hover {
    color: orange;
    cursor: pointer;
    border-bottom: 2px solid orange;
  }

  &.active {
    color: orange;
    border-bottom: 2px solid orange;
  }
`;
