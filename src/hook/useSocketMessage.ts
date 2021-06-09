import { useState } from 'react';
import { Game, Player } from '../@types/types';

const initialPlayer: Player = { place: undefined, takenPlace: false, uuid: undefined, name: undefined, cards: [], cardsAmount: 0, isReady: false };

const setCurrentPlayer = (players: Player[], clientId: string) => {
  let currentPlayer: Player = { ...initialPlayer };

  players.forEach((player: Player) => {
    if (player?.uuid === clientId) {
      currentPlayer = player;
    }
  });

  return currentPlayer;
};

const checkIfPlayerInGame = (game: Game, clientId: string) => {
  let isPlayerInGame = false;

  game?.players.forEach((player: Player) => {
    if (player?.uuid === clientId) {
      isPlayerInGame = true;
    }
  });

  return isPlayerInGame;
};

type setClientId = (id: string) => void;

export const useSocketMessage = (socket: WebSocket, gameId: number, clientId: string, setClientId: setClientId) => {
  const [player, setPlayer] = useState<Player>(initialPlayer);
  const [userName, setUserName] = useState<string | undefined>('');
  const [games, setGames] = useState<Game[]>([]);

  const resetGame = () => {
    socket.send(JSON.stringify({ method: 'resetGame', gameId }));
  };

  socket.onmessage = (message: WebSocketMessageEvent) => {
    const response = JSON.parse(message.data);
    let gamesChanged = [...games];

    if (response.method === 'connect') {
      gamesChanged = [...response.games];

      if (!clientId) {
        setClientId(response.clientId);
        localStorage.setItem('clientId', response.clientId);
        localStorage.removeItem('gameId');
      } else if (gameId || gameId === 0) {
        const isPlayerInGame = checkIfPlayerInGame(gamesChanged[gameId], clientId);

        if (isPlayerInGame) {
          const players = gamesChanged[gameId].players;
          const player = setCurrentPlayer(players, clientId);
  
          setPlayer(player);
          localStorage.setItem('clientId', clientId);
        } else {
          localStorage.removeItem('gameId');
        }
      }
    }

    if (response.method === 'update') {
      gamesChanged = [...response.games];

      if ((gameId || gameId === 0) && gameId === response.gameId) {
        const players = response.games[response.gameId].players;
        const player = setCurrentPlayer(players, clientId);

        setPlayer(player);
      }
    }

    if (response?.method === 'resetGame') {
      const { games } = response;
      gamesChanged[response.gameId] = { ...games[response.gameId] };

      if (response.gameId === gameId) {
        setPlayer(initialPlayer);
        localStorage.removeItem('gameId');
      }
    }

    if (response?.method === 'clean') {
      const { clientId } = response;
      gamesChanged[gameId].players = gamesChanged[gameId].players
        .map((player) => player.uuid === clientId ? ({...initialPlayer, place: player.place }) : player);

      setPlayer(initialPlayer);
      localStorage.removeItem('gameId');
    }

    setGames(gamesChanged);
  };

  return {
    games,
    game: games[gameId],
    statuses: games[gameId]?.statuses,
    player,
    userName,
    clientId,
    setPlayer,
    resetGame,
    setUserName,
  }
};
