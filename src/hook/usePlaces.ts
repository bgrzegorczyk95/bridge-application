import { useEffect, useState } from 'react';

import { initialPlaces, initialUser } from '../utilities/initialValues';
import { getRandomInt } from '../utilities/randomInt';
import { checkIfDummyTurn, checkIfPlayerTurn, checkIfThrowAllowed } from '../utilities/throws';

let clientId;

const dummyType = {
  N: 'S',
  S: 'N',
  E: 'W',
  W: 'E',
};

const setCurrentPlayer = (users) => {
  let player = { ...initialUser };

  users.forEach((user) => {
    if (user?.uuid === clientId) {
      player = user;
    }
  });

  return player;
};

export const usePlaces = (socket: any) => {
  const [turn, setTurn] = useState({ name: undefined, place: undefined });
  const [auctionHistory, setAuctionHistory] = useState([]);
  const [auction, setAuction] = useState({ place: undefined, row: undefined, col: undefined });
  const [trump, setTrump] = useState({ userName: undefined, colorName: undefined, value: undefined, place: undefined });

  const [thrownCards, setThrownCards] = useState([]);

  const [gameStarted, setGameStarted] = useState(false);
  const [auctionStarted, setAuctionStarted] = useState(false);
  const [player, setPlayer] = useState<any>(initialUser);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [places, setPlaces] = useState<any>(initialPlaces);
  const [showCountDown, setShowCountDown] = useState(false);
  const [showReadyModal, setShowReadyModal] = useState(false);

  const handleSubmit = () => {
    if (userName) {
      setPlayer({ ...player, name: userName });
    } else {
      const randomUserName = getRandomInt(0, 100000);
      setPlayer({ ...player, name: `Guest${randomUserName}` });
    }
  }

  useEffect(() => {
    const isPlayer = places.some((user) => user.name === player.name);

    if (isPlayer) {
      const allPlacesTaken = places.every((user) => user.name);
      setShowReadyModal(allPlacesTaken);
  
      const allPlayersReady = places.every((user) => user.isReady);
      setShowCountDown(allPlayersReady);
    }
  }, [places]);

  const handleStartGame = () => {
    setShowCountDown(false);
    setShowReadyModal(false);
    setAuctionStarted(true);

    if (!turn?.place) {
      socket.send(JSON.stringify({ method: 'turn' }));
    }
  }

  const cleanPlace = () => {
    const payLoad = {
      method: "clean",
      clientId: clientId,
    }

    socket.send(JSON.stringify(payLoad));
  }

  const setPlace = (place: string) => {
    const payLoad = {
      method: "join",
      clientId,
      userName,
      place
    };

    setPlayer({ ...player, place });

    socket.send(JSON.stringify(payLoad));
  }

  const setIsReady = (place: any) => {
    if (place.name === player.name) {
      socket.send(JSON.stringify({ method: "ready", clientId }));
    }
  };

  const throwCard = (card, place) => {
    const payLoad = {
      method: "throw",
      turn,
      card: { name: place.name, place: place.place, value: card.value, color: card.color }
    };
    socket.send(JSON.stringify(payLoad));
  };

  const handleClickCard = (card: any, place: any) => {
    const isPlayerTurn = checkIfPlayerTurn(turn, player, dummyType[trump.place], place);
    const isDummyTurn = checkIfDummyTurn(turn, trump, player, dummyType[trump.place], place);
    console.log(isPlayerTurn, isDummyTurn);
    if (gameStarted && (isPlayerTurn || isDummyTurn)) {
      const isThrowAllowed = checkIfThrowAllowed(trump, thrownCards, place.cards, card);

      if (isThrowAllowed) {
        throwCard(card, place);
      }
    }
  };

  socket.onmessage = (message) => {
    const response = JSON.parse(message.data);

    if (response?.method === 'connect' && !clientId) {
      const users = response.users;
      clientId = response.clientId;
      setPlaces(users);
    }

    if (response?.method === 'updatePlaces') {
      const users = response.users;
      setPlaces(response.users);

      const player = setCurrentPlayer(users);
      setPlayer(player);
    }

    if (response?.method === 'bid') {
      const { bid, trump, turn, history, isAuctionFinished } = response;

      setAuction(bid);
      setTrump(trump);
      setTurn(turn);
      setAuctionHistory(history);

      if (isAuctionFinished) {
        setGameStarted(true);
        setAuctionStarted(false);
      }
    }

    if (response?.method === 'turn') {
      setTurn(response.turn);
    }

    if (response?.method === 'throw') {
      const { thrownCards, turn, users } = response;

      setThrownCards(thrownCards);
      setTurn(turn);
      setPlaces(users);

      const player = setCurrentPlayer(users);
      setPlayer(player);

      if (thrownCards.length === 4) {
        socket.send(JSON.stringify({ method: 'bestThrow' }));
      }
    }

    if (response?.method === 'bestThrow') {
      const { thrownCards, turn } = response;
      setTimeout(() => {
        setTurn(turn);
        setThrownCards(thrownCards);
      }, 2000);
    }

    if (response?.method === 'setPlayer') {
      const updatedPlaces = places.map((user) => user.name === response.player.name ? response.player : user);
      setPlaces(updatedPlaces);
    }

    if (response?.method === 'clean') {
      const users = response.users;
      setPlaces(users);
      setPlayer({ ...player, place: undefined });
    }
  };

  return {
    turn,
    trump,
    player,
    places,
    auction,
    clientId,
    auctionHistory,
    showReadyModal,
    auctionStarted,
    gameStarted,
    thrownCards,
    showCountDown,
    setPlace,
    cleanPlace,
    setIsReady,
    setUserName,
    handleSubmit,
    handleClickCard,
    handleStartGame,
  }
}
