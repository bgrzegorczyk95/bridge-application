import { useState } from 'react';
import socketIOClient from 'socket.io-client';

import { observerPositions, positions } from '../utilities/positions';
import { getRandomInt } from '../utilities/randomInt';

const initialPlaces = [
  { place: 'N', takenPlace: false, user: undefined, cards: [], position: undefined },
  { place: 'S', takenPlace: false, user: undefined, cards: [], position: undefined },
  { place: 'E', takenPlace: false, user: undefined, cards: [], position: undefined },
  { place: 'W', takenPlace: false, user: undefined, cards: [], position: undefined }
];

const initialUser = { place: undefined, takenPlace: false, user: undefined };

const ENDPOINT = "http://127.0.0.1:5000";

const connectionOptions =  {
  forceNew: true,
  reconnection: true,
  reconnectionDelay: 2000,                  //starts with 2 secs delay, then 4, 6, 8, until 60 where it stays forever until it reconnects
  reconnectionDelayMax : 60000,             //1 minute maximum delay between connections
  reconnectionAttempts: Infinity,           //to prevent dead clients, having the user to having to manually reconnect after a server restart.
  timeout : 10000,                          //before connect_error and connect_timeout are emitted.
  transports : ['websocket']                //forces the transport to be only websocket. Server needs to be setup as well/
}

export const usePlaces = () => {
  const [player, setPlayer] = useState<any>(initialUser);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [places, setPlaces] = useState<any>(initialPlaces);
  const socket = socketIOClient(ENDPOINT, connectionOptions);

  // @ts-ignore
  useEffect(() => {
    socket.emit("places", player);
    socket.on("places", function (data: any) {
      setPlaces(data);
    });
    return () => socket.disconnect();
  }, [player]); // eslint-disable-line

  const setPlace = (place: string) => {
    const userPlace = { place, user: player.user };
    socket.emit("set place", userPlace);
    setPlayer(userPlace);
  }

  const cleanPlace = (userName: string) => {
    setPlayer({ ...initialUser, user: player.user });
    socket.emit("clean place", userName);
  }

  const handleSubmit = () => {
    if (userName) {
      setPlayer({ ...player, user: userName });
    } else {
      const randomUserName = getRandomInt(0, 100000);
      setPlayer({ ...player, user: `Guest${randomUserName}` });
    }
  }

  const setPosition = (place: any) => {
    if (place?.user === player?.user) {
      return 'BOTTOM';
    } else if (player.place) {
      return positions[player?.place][place.place];
    } else {
      return observerPositions[place.place];
    }
  }

  return {
    player,
    places,
    setPlace,
    cleanPlace,
    setUserName,
    setPosition,
    handleSubmit,
  }
}