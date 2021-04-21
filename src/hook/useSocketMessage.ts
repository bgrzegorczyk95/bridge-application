import { useState } from 'react';

const initialTrump = { userName: undefined, colorName: undefined, value: undefined, place: undefined };
const initialBestBid = { userName: undefined, colorName: undefined, value: undefined, place: undefined, doubled: false, redoubled: false };

const initialGamePoints = { NS: { under: [0], above: 0, round: 0, games: 0 }, EW: { under: [0], above: 0, round: 0, games: 0 }, afterPart: [], games: 0 };
const initialUser = { place: undefined, takenPlace: false, uuid: undefined, name: undefined, cards: [], cardsAmount: 0, isReady: false };

const players = [
  { place: 'N', takenPlace: false, uuid: undefined, name: undefined, cards: [], cardsAmount: 0, isReady: false },
  { place: 'S', takenPlace: false, uuid: undefined, name: undefined, cards: [], cardsAmount: 0, isReady: false },
  { place: 'E', takenPlace: false, uuid: undefined, name: undefined, cards: [], cardsAmount: 0, isReady: false },
  { place: 'W', takenPlace: false, uuid: undefined, name: undefined, cards: [], cardsAmount: 0, isReady: false },
];

let clientId;

const setCurrentPlayer = (users) => {
  let player = { ...initialUser };

  users.forEach((user) => {
    if (user?.uuid === clientId) {
      player = user;
    }
  });

  return player;
};

export const useSocketMessage = (socket: any, gameId: number) => {
  const [player, setPlayer] = useState<any>(initialUser);
  const [userName, setUserName] = useState<string | undefined>('Ziom');
  const [games, setGames] = useState([]);

  socket.onmessage = (message) => {
    const response = JSON.parse(message.data);
    let gamesChanged = [...games];

    if (response.method === 'connect') {
      clientId = response.clientId;
      gamesChanged = [...response.games];
    }

    if (response?.method === 'updatePlaces') {
      const users = response.users;
      gamesChanged[gameId] = { ...gamesChanged[gameId], players: users };

      const player = setCurrentPlayer(users);
      setPlayer(player);

      localStorage.setItem('player', JSON.stringify(player));
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

      const player = setCurrentPlayer(players);
      setPlayer(player);

      if (thrownCards.length === 4) {
        socket.send(JSON.stringify({ method: 'bestThrow', gameId }));
      }
    }

    if (response?.method === 'bestThrow') {
      const { thrownCards, turn, throws, gamePoints } = response;
      gamesChanged[gameId] = { ...gamesChanged[gameId], turn, thrownCards, gamePoints };

      console.log(throws, gamePoints);
    }

    if (response?.method === 'newDeal') {
      const { players, turn, points, statuses, gamePoints } = response;

      console.log('NEW', points);
      gamesChanged[gameId] = {
        ...gamesChanged[gameId],
        turn,
        statuses,
        players,
        gamePoints,
        biddingHistory: [],
        thrownCards: [],
        bestBid: { ...initialBestBid },
      };

      const player = setCurrentPlayer(players);
      setPlayer(player);
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
  }
};
