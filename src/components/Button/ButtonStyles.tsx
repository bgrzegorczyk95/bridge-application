import styled from "styled-components";

export const ButtonStyles = styled.button`
  border: none;
  background-color: #8F001E;
  border-radius: 25px;
  padding: 5px 15px;
  margin: 5px;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #aa052b;
    -webkit-box-shadow: 0px 0px 2px 0px #000000; 
    box-shadow: 0px 0px 2px 0px #000000;
  }
`;
