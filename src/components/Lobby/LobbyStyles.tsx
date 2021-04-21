import styled from "styled-components";

export const LobbyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100% - 52px);
`;

export const PlayerCard = styled.div<{ isReady: boolean }>`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 200px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 10px;
  background-color: ${({ isReady }) => (isReady ? '#b3ffcc' : '#ffcccc')};
`;

export const Button = styled.button`
  position: relative;
  width: 45%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 5px 0;
`;

export const CloseIcon = styled.span`
  position: absolute;
  cursor: pointer;
  color:  #404040;
  top: 5px;
  right: 10px;
`;

export const ReadyStyles = styled.div`
  color: #ffffff;
  background-color: #009914;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
`;

export const NotReadyStyles = styled.div`
  color: #ffffff;
  background-color: #aa052b;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
`;
