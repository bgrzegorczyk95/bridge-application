import styled from "styled-components";

export const NarbarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 2px solid gray;
  background-color: #1976d2;
`;

export const ListStyles = styled.ul`
  display: flex;
  margin: 0;
  list-style: none;

  li > a {
    text-decoration: none;
    text-transform: uppercase;
    color: #ffffff;
    margin: 0 20px;
    
    :hover {
      color: orange;
      cursor: pointer;
      font-weight: bold;
    }
  }
`;