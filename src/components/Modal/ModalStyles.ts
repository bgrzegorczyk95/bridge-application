import styled from "styled-components";

export const ModalStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContentStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  min-height: 80px;
  border-radius: 5px;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 0px 10px -2px #000000;
  box-shadow: 0px 0px 10px -2px #000000;
  margin: 0 10px;
`;
