import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { SocketContextInterface } from '../../@types/types';

import { useSocketMessage } from '../../hook/useSocketMessage';
import { Board } from '../Board/Board';
import { ChangeName } from '../ChangeName/ChangeName';
import { Navbar } from '../Navbar/Navbar';
import { Tables } from '../Tables/Tables';
import { UserNameCheck } from '../UserNameCheck/UserNameCheck';
import { AppWrapper } from './AppStyles';

const socket: WebSocket = new WebSocket('ws://localhost:5000/');
export const SocketContext = React.createContext<SocketContextInterface | null>(null);

export const App = () => {
  const history = useHistory();
  const [gameId, setGameId] = useState<number | undefined>();
  const [clientId, setClientId] = useState<string | undefined>();
  const socketMessage = useSocketMessage(socket, gameId, clientId, setClientId);

  socket.onopen = (() => {
    const client = localStorage.getItem('clientId');
    const gameId = localStorage.getItem('gameId');

    if (gameId) setGameId(parseInt(gameId, 10));
    setClientId(client);

    const payload = {
      method: 'connect',
      clientId: client,
      gameId,
    };

    socket.send(JSON.stringify(payload));
  });

  window.onbeforeunload = function() {
    const payload = {
      method: 'disconnect',
      clientId,
      gameId,
    };

    socket.send(JSON.stringify(payload));
  };

  const handleSelect = (id: number) => {
    setGameId(id);
    history.push(`/board/${id}`);
  };

  return (
    <AppWrapper>
      <SocketContext.Provider value={socketMessage}>
        <UserNameCheck>
          <Navbar />
          <Switch>
              <Route exact path="/">
                <Tables handleSelect={handleSelect} games={socketMessage.games} />
              </Route>
              <Route exact path="/board/:id">
                <Board gameId={gameId} socket={socket} />
              </Route>
              <Route exact path="/change">
                <ChangeName />
              </Route>
          </Switch>
        </UserNameCheck>
      </SocketContext.Provider>
    </AppWrapper>
  );
};
