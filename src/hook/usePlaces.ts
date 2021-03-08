import { useEffect, useState } from 'react';

import { observerPositions, positions } from '../utilities/positions';
import { getRandomInt } from '../utilities/randomInt';

const initialPlaces = [
  { place: 'N', takenPlace: false, user: undefined, cards: [], position: undefined, isReady: false },
  { place: 'S', takenPlace: false, user: undefined, cards: [], position: undefined, isReady: false },
  { place: 'E', takenPlace: false, user: undefined, cards: [], position: undefined, isReady: false },
  { place: 'W', takenPlace: false, user: undefined, cards: [], position: undefined, isReady: false }
];

const initialUser = { place: undefined, takenPlace: false, name: undefined };

export const usePlaces = () => {
  const [gameStarted, setGameStarted] = useState(false);
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

  const setPosition = (place: any) => {
    if (place?.name === player?.name) {
      return 'BOTTOM';
    } else if (player.place) {
      return positions[player?.place][place.place];
    } else {
      return observerPositions[place.place];
    }
  }

  useEffect(() => {
    const allPlacesTaken = places.every((user) => user.name);
    setShowReadyModal(allPlacesTaken);

    const allPlayersReady = places.every((user) => user.isReady);
    setShowCountDown(allPlayersReady);
  }, [places]);

  // const setIsReady = (place: any) => {
  //   if (place.user === player.user) {
  //     socket.emit("readyStatus", { user: place.user, status: !place.isReady });
  //   }
  // };

  const handleStartGame = () => {
    setShowCountDown(false);
    setGameStarted(true);
  }

  return {
    player,
    places,
    userName,
    setPlaces,
    setPlayer,
    showReadyModal,
    gameStarted,
    showCountDown,
  //   setPlace,
    // setIsReady,
  //   cleanPlace,
    setUserName,
    setPosition,
    handleSubmit,
    handleStartGame,
  }
}
