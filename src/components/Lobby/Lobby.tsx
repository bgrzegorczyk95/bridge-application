import React, { useContext, useState } from 'react';
import { LobbyWrapper, PlayerCard, Button, CloseIcon, ReadyStyles, NotReadyStyles } from './LobbyStyles';
import { SocketContext } from '../App/App';
import { CountDown } from '../CountDown/CountDown';
import { useHistory } from 'react-router';

interface Props {
  gameId: number;
  socket: any;
}

export const Lobby = ({ gameId, socket }: Props) => {
  const history = useHistory();
  const { clientId, userName, player, games, setPlayer } = useContext(SocketContext);
  const game = games[gameId];
  const allPlacesTaken = game.players.every((user) => user.name);
  const allPlayersReady = game.players.every((user) => user.isReady);

  const [isStarted, setIsStarted] = useState(game.statuses.auctionStarted || game.statuses.gameStarted);

  const handleSelectPosition = (place: any) => {
    const payLoad = {
      method: "join",
      clientId,
      gameId,
      userName,
      place: place.place,
    };

    setPlayer({ ...player, place });
    socket.send(JSON.stringify(payLoad));
  };

  const checkIfDisabled = (pos: string): boolean => {
    let isPlaceTaken = false;

    for (const item of game.players) {
      if (((item.place === pos) && item.takenPlace) || player.place) {
        isPlaceTaken = true;
      }
    }

    return isPlaceTaken;
  };

  const handleStartGame = () => {
    if (!isStarted) {
      setIsStarted(true);
      history.push(`/board/${gameId}`);
    }
  }

  const setIsReady = (item: any) => {
    if (item?.uuid === clientId) {
      socket.send(JSON.stringify({ method: "ready", clientId, gameId }));
    }
  };

  return (
    <LobbyWrapper>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {game.players.map((item: any) => (
          <PlayerCard key={item.place} isReady={item.isReady}>
            <p>{item.name ? item.name : item.place}</p>
            {!item.name && (
              <Button disabled={checkIfDisabled(item.place)} onClick={() => handleSelectPosition(item)}>
                Wybierz
              </Button>
            )}
            {(item.name === player.name && item.place === player.place && !isStarted) && (
              <CloseIcon onClick={() => console.log('es')}>&#10006;</CloseIcon>
            )}
            {allPlacesTaken && (
              item.isReady ? (
                <ReadyStyles onClick={() => setIsReady(item)}>Gotowy</ReadyStyles>
              ) : <NotReadyStyles onClick={() => setIsReady(item)}>Niegotowy</NotReadyStyles>
            )}
          </PlayerCard>
        ))}
      </div>
      {(allPlayersReady && !isStarted) && (
        <CountDown seconds={5} startGame={handleStartGame} />
      )}
    </LobbyWrapper>
  );
};
