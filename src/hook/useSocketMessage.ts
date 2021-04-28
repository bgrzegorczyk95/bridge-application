import { useState } from 'react';

const initialPlayer = { place: undefined, takenPlace: false, uuid: undefined, name: undefined, cards: [], cardsAmount: 0, isReady: false };

const setCurrentPlayer = (users, clientId: string) => {
  let player = { ...initialPlayer };

  users.forEach((user) => {
    if (user?.uuid === clientId) {
      player = user;
    }
  });

  return player;
};

const checkIfPlayerInGame = (game, clientId) => {
  let isPlayerInGame = false;

  game?.players.forEach((player: any) => {
    if (player?.uuid === clientId) {
      isPlayerInGame = true;
    }
  });

  return isPlayerInGame;
};

export const useSocketMessage = (socket: any, gameId: number, clientId: string, setId: any) => {
  const [player, setPlayer] = useState<any>(initialPlayer);
  const [userName, setUserName] = useState<string | undefined>('');
  const [games, setGames] = useState([]);

  const resetGame = () => {
    socket.send(JSON.stringify({ method: 'resetGame', gameId }));
  };

  socket.onmessage = (message) => {
    const response = JSON.parse(message.data);
    let gamesChanged = [...games];

    if (response.method === 'connect') {
      gamesChanged = [...response.games];

      if (!clientId) {
        setId(response.clientId);
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

    if (response?.method === 'updatePlaces') {
      const users = response.users;
      gamesChanged[gameId] = { ...gamesChanged[gameId], players: users };

      const player = setCurrentPlayer(users, clientId);
      setPlayer(player);
    }

    if (response.method === 'update') {
      gamesChanged = [...response.games];

      if ((gameId || gameId === 0) && gameId === response.gameId) {
        const players = response.games[response.gameId].players;
        const player = setCurrentPlayer(players, clientId);

        setPlayer(player);
      }
    }

    if (response?.method === 'startBidding') {
      const { turn, statuses } = response;
      gamesChanged[gameId] = { ...gamesChanged[gameId], turn, statuses };
    }

    if (response?.method === 'bid') {
      const { turn, bestBid, biddingHistory, statuses } = response;
      gamesChanged[gameId] = { ...gamesChanged[gameId], turn, bestBid, biddingHistory, statuses };
    }

    if (response?.method === 'throw') {
      const { thrownCards, turn, players } = response;

      gamesChanged[gameId] = { ...gamesChanged[gameId], turn, thrownCards, players };

      const player = setCurrentPlayer(players, clientId);
      setPlayer(player);

      if (thrownCards.length === 4) {
        socket.send(JSON.stringify({ method: 'bestThrow', gameId }));
      }
    }

    if (response?.method === 'bestThrow') {
      const { thrownCards, turn, gamePoints } = response;
      gamesChanged[gameId] = { ...gamesChanged[gameId], turn, thrownCards, gamePoints };
    }

    if (response?.method === 'endGame') {
      const { statuses, gamePoints } = response;
      gamesChanged[gameId] = { ...gamesChanged[gameId], statuses, gamePoints };
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
