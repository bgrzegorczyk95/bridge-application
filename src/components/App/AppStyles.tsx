import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: rgb(40, 120, 64);
  align-items: center;
  overflow: hidden;
`;

export const PlayerNameModal = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: #ffffff;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

export const Input = styled.input`
  padding: 5px;
  height: 30px;
  margin: 5px 0;
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
`;

export const Button = styled.button`
  width: 100%;
  margin: 0;
  height: 30px;
  cursor: pointer;
  background: none;
  color: #ffa260;
  border: 1px solid #ffa260;
  transition: linear 0.25s;

  &:hover {
    transition: linear 0.25s;
    color: #e5ff60;
    border: 1px solid #e5ff60;
    box-shadow: 0 0.5em 0.5em -0.4em #e5ff60;
  }
`;