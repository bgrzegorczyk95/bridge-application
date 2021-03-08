import styled from 'styled-components';

export const ReadyStatusWrapperStyles = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  margin: 10px;
`;

export const ReadyStatusStyles = styled.div`
  text-align: center;
  margin: 0 5px;
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