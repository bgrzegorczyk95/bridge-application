import styled from "styled-components";

export const LobbyWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  box-sizing: border-box;
  background-color: rgb(60,59,103);
`;

export const LobbyContent = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const LobbyHeader = styled.div`
  width: 100%;
  color: #ffffff;
  background-color: #000000;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #cccccc;
`;

export const PlayerCard = styled.div<{ isReady: boolean }>`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 130px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 10px;
  background-color: ${({ isReady }) => (isReady ? '#009933' : '#ff471a')};
`;

export const Button = styled.button`
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 5px 0;

  p {
    font-weight: bold;
  }
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
  background-color: #004d00;
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

export const PlayerName = styled.p`
  overflow: hidden;
  max-width: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;