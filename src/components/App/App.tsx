import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import { useSocketMessage } from '../../hook/useSocketMessage';
import { Board } from '../Board/Board';
import { Lobby } from '../Lobby/Lobby';
import { Main } from '../Main/Main';
import { Navbar } from '../Navbar/Navbar';
import { Tables } from '../Tables/Tables';

const socket = new WebSocket('ws://localhost:5000');
export const SocketContext = React.createContext(null);

export const App = () => {
  const history = useHistory();
  const [gameId, setGameId] = useState<number | undefined>();
  const socketMessage = useSocketMessage(socket, gameId);

  socket.onopen = (() => {
    const clientId = localStorage.getItem('clientId');

    const payload = {
      method: 'connect',
      clientId,
    };

    socket.send(JSON.stringify(payload));
  });

  const handleSelect = (id: number) => {
    setGameId(id);
    history.push(`/board/${id}`);
  };

  return (
    <>
      <Navbar />
      <SocketContext.Provider value={socketMessage}>
        <Switch>
          <Route exact path="/tables">
            <Tables handleSelect={handleSelect} tabs={socketMessage.games} />
          </Route>
          <Route exact path="/board/:id">
            <Board gameId={gameId} socket={socket} />
          </Route>
          <Route exact path="/">
            <p>Es</p>
          </Route>
        </Switch>
      </SocketContext.Provider>
    </>
  );
}
