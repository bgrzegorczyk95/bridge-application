import { useContext, useEffect, useState } from 'react';
import { LobbyWrapper, PlayerCard, Button, CloseIcon, ReadyStyles, NotReadyStyles, LobbyContent, LobbyHeader, PlayerName } from './LobbyStyles';
import { SocketContext } from '../App/App';
import { CountDown } from '../CountDown/CountDown';
import { Player } from '../../@types/types';

interface Props {
  gameId: number;
  socket: WebSocket;
}

export const Lobby = ({ gameId, socket }: Props) => {
  const { clientId, userName, player, games, setPlayer } = useContext(SocketContext);
  const game = games[gameId];
  const allPlacesTaken = game.players.every((user) => user.name);
  const allPlayersReady = game.players.every((user) => user.isReady);
  const [isStarted, setIsStarted] = useState(game.statuses.auctionStarted || game.statuses.gameStarted);

  useEffect(() => {
    setIsStarted(game.statuses.auctionStarted || game.statuses.gameStarted);
  }, [game?.statuses.auctionStarted, game?.statuses.gameStarted]);

  const handleSelectPosition = (selectedPlace: Player) => {
    const payLoad = {
      method: "join",
      clientId,
      gameId,
      userName,
      place: selectedPlace.place,
    };

    setPlayer({ ...player, ...selectedPlace });
    localStorage.setItem('gameId', gameId.toString());
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
      socket.send(JSON.stringify({ method: 'startBidding', gameId }));
    }
  }

  const setIsReady = (item: Player) => {
    if (item?.uuid === clientId) {
      socket.send(JSON.stringify({ method: "ready", clientId, gameId }));
    }
  };

  const handleClose = () => {
    socket.send(JSON.stringify({ method: "clean", clientId, gameId }));
  }

  return (
    <LobbyWrapper>
      <LobbyHeader>Miejsca</LobbyHeader>
      <LobbyContent>
        {game?.players.map((item: Player) => (
          <PlayerCard key={item.place} isReady={item.isReady}>
            <PlayerName>{item.name ? item.name : item.place}</PlayerName>
            {!item.name && (
              <Button disabled={checkIfDisabled(item.place)} onClick={() => handleSelectPosition(item)}>
                Wybierz
              </Button>
            )}
            {(item.uuid === player.uuid && item.place === player.place && !isStarted) && (
              <CloseIcon onClick={handleClose}>&#10006;</CloseIcon>
            )}
            {(!game.statuses.auctionStarted && !game.statuses.gameStarted && allPlacesTaken) && (
              item.isReady ? (
                <ReadyStyles onClick={() => setIsReady(item)}>Gotowy</ReadyStyles>
              ) : <NotReadyStyles onClick={() => setIsReady(item)}>Niegotowy</NotReadyStyles>
            )}
          </PlayerCard>
        ))}
      </LobbyContent>
      {(allPlayersReady && !isStarted) && (
        <CountDown color="white" text="Gra rozpocznie się za" seconds={5} handleEndTime={handleStartGame} />
      )}
    </LobbyWrapper>
  );
};
