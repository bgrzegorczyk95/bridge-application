import { useState } from 'react';

import { initialPlaces, initialUser } from '../utilities/initialValues';
import { getRandomInt } from '../utilities/randomInt';
import { checkIfDummyTurn, checkIfPlayerTurn, checkIfThrowAllowed } from '../utilities/throws';

let clientId;
let gameId;

const dummyType = {
  N: 'S',
  S: 'N',
  E: 'W',
  W: 'E',
};

export const usePlaces = (socket: any, game: any, player: any, gameId: number) => {
  // const [turn, setTurn] = useState({ name: undefined, place: undefined });
  // const [auctionHistory, setAuctionHistory] = useState([]);
  // const [auction, setAuction] = useState(initialAuction);
  // const [trump, setTrump] = useState(initialTrump);

  // const [thrownCards, setThrownCards] = useState([]);

  // const [gameStarted, setGameStarted] = useState(false);
  // const [auctionStarted, setAuctionStarted] = useState(false);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  // const [places, setPlaces] = useState<any>(initialPlaces);
  // const [showCountDown, setShowCountDown] = useState(false);
  // const [showReadyModal, setShowReadyModal] = useState(false);

  // const handleSubmit = () => {
  //   if (userName) {
  //     setPlayer({ ...player, name: userName });
  //   } else {
  //     const randomUserName = getRandomInt(0, 100000);
  //     setPlayer({ ...player, name: `Guest${randomUserName}` });
  //   }
  // }

  // const checkOccupiedSeats = (users) => {
  //   const isPlayer = users.some((user) => user.name === player.name);

  //   if (isPlayer) {
  //     const allPlacesTaken = users.every((user) => user.name);
  //     setShowReadyModal(allPlacesTaken);
  
  //     const allPlayersReady = users.every((user) => user.isReady);
  //     setShowCountDown(allPlayersReady);
  //   }
  // }

  // const handleStartGame = () => {
  //   setShowCountDown(false);
  //   setShowReadyModal(false);
  //   setAuctionStarted(true);

  //   if (!turn?.place) {
  //     socket.send(JSON.stringify({ method: 'turn', gameId }));
  //   }
  // }

  // const cleanPlace = () => {
  //   const payLoad = {
  //     method: "clean",
  //     clientId: clientId,
  //   }

  //   socket.send(JSON.stringify(payLoad));
  // }

  // const setPlace = (place: string) => {
  //   const payLoad = {
  //     method: "join",
  //     clientId,
  //     gameId,
  //     userName,
  //     place
  //   };

  //   setPlayer({ ...player, place });
  //   localStorage.setItem('player', JSON.stringify({ ...player, place }));

  //   socket.send(JSON.stringify(payLoad));
  // }

  // const setIsReady = (place: any) => {
  //   if (place.name === player.name) {
  //     socket.send(JSON.stringify({ method: "ready", clientId }));
  //   }
  // };

  const throwCard = (card, place) => {
    const payLoad = {
      method: "throw",
      turn: game.turn,
      gameId,
      card: { name: place.name, place: place.place, value: card.value, color: card.color }
    };
    socket.send(JSON.stringify(payLoad));
  };

  const handleClickCard = (card: any, place: any) => {
    const isPlayerTurn = checkIfPlayerTurn(game.turn, player, dummyType[game.bestBid.place], place);
    const isDummyTurn = checkIfDummyTurn(game.turn, game.bestBid, player, dummyType[game.bestBid.place], place);

    if (game.statuses.gameStarted && (isPlayerTurn || isDummyTurn)) {
      const isThrowAllowed = checkIfThrowAllowed(game.thrownCards, place.cards, card);

      if (isThrowAllowed) {
        throwCard(card, place);
      }
    }
  };

  // socket.onmessage = (message) => {
  //   const response = JSON.parse(message.data);

  //   if (response?.method === 'connect' && !clientId) {
  //     const users = response.users;
  //     clientId = response.clientId;
  //     setPlaces(users);
  //     localStorage.setItem('clientId', clientId);
  //     console.log(response);
  //   }

  //   if (response?.method === 'updatePlaces') {
  //     const users = response.users;
  //     setPlaces(response.users);

  //     const player = setCurrentPlayer(users);
  //     setPlayer(player);
  //     localStorage.setItem('player', JSON.stringify(player));

  //     checkOccupiedSeats(users);
  //   }

  //   if (response?.method === 'bid') {
  //     const { bid, trump, turn, history, isAuctionFinished } = response;

  //     setAuction(bid);
  //     setTrump(trump);
  //     setTurn(turn);
  //     setAuctionHistory(history);
  //     console.log(response);

  //     if (isAuctionFinished) {
  //       setGameStarted(true);
  //       setAuctionStarted(false);
  //     }
  //   }

  //   if (response?.method === 'turn') {
  //     setTurn(response.turn);
  //   }

  //   if (response?.method === 'newDeal') {
  //     const { users, turn, points } = response;

  //     console.log('NEW', points);

  //     setAuctionHistory([]);
  //     setThrownCards([]);
  //     setTurn(turn);
  //     setTrump(initialTrump);
  //     setAuction(initialAuction);

  //     setPlaces(users);

  //     const player = setCurrentPlayer(users);
  //     setPlayer(player);
  //     localStorage.setItem('player', JSON.stringify(player));

  //     setGameStarted(false);
  //     setAuctionStarted(true);
  //   }

  //   if (response?.method === 'throw') {
  //     const { thrownCards, turn, users } = response;

  //     setThrownCards(thrownCards);
  //     setTurn(turn);
  //     setPlaces(users);

  //     const player = setCurrentPlayer(users);
  //     setPlayer(player);
  //     localStorage.setItem('player', JSON.stringify(player));

  //     if (thrownCards.length === 4) {
  //       socket.send(JSON.stringify({ method: 'bestThrow', gameId }));
  //     }
  //   }

  //   if (response?.method === 'bestThrow') {
  //     const { thrownCards, turn, throws, gamePoints } = response;
  //     console.log(throws, gamePoints);
  //     setTimeout(() => {
  //       setTurn(turn);
  //       setThrownCards(thrownCards);
  //     }, 2000);
  //   }

  //   if (response?.method === 'endGame') {
  //     const { winningPair, gamePoints } = response;
  //     console.log(winningPair, gamePoints, 'TO JUZ JEST KONIEC, WYPIERDALAĆ');
  //     setIsEndGame(true);
  //   }

  //   if (response?.method === 'clean') {
  //     const users = response.users;
  //     setPlaces(users);
  //     setPlayer({ ...player, place: undefined });
  //     localStorage.setItem('player', JSON.stringify({ ...player, place: undefined }));
  //   }
  // };

  return {
    // turn,
    // trump,
    // player,
    // places,
    // auction,
    clientId,
    handleClickCard,
    // auctionHistory,
    // showReadyModal,
    // auctionStarted,
    // gameStarted,
    // thrownCards,
    // showCountDown,
    // setPlace,
    // setPlayer,
    // cleanPlace,
    // setIsReady,
    // setUserName,
    // handleSubmit,
    // handleClickCard,
    // handleStartGame,
  }
}
