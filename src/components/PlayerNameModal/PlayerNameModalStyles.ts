import styled from 'styled-components';

export const PlayerNameModalStyles = styled.div`
  position: absolute;
  top: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: radial-gradient(green, rgb(40,72,79));  align-items: center;
`;

export const Input = styled.input`
  padding: 5px;
  height: 30px;
  margin: 5px 0;
`;

export const ModalWrapperStyles = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
`;

export const Button = styled.button`
  width: 100%;
  margin: 0;
  height: 30px;
  cursor: pointer;
  background: rgb(60, 40, 103);
  color: #FFFFFF;
  border: 1px solid #FFFFFF;
  transition: linear 0.25s;

  &:hover {
    transition: linear 0.25s;
    color: #e5ff60;
    border: 1px solid #e5ff60;
    box-shadow: 0 0.5em 0.5em -0.4em #e5ff60;
  }
`;

export const ErrorInfo = styled.p`
  color: yellow;
  font-size: 12px;
  margin: 0 0 5px 0;
  font-weight: bold;
`;
