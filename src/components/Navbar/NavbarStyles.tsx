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

  @media (max-width: 400px) {
    padding-left: 0;
  }

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