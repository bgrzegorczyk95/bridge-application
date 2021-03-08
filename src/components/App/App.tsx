/* eslint-disable */

import React from 'react';
import { usePlaces } from '../../hook/usePlaces';
import { useModal } from '../../hook/useModal';
import { Card } from '../Cards/Card';
import { Modal } from '../Modal/Modal';
import { PlaceSelector } from '../PlaceSelector/PlaceSelector';
import { PlayerNameModal } from '../PlayerNameModal/PlayerNameModal';
import { Wrapper } from './AppStyles';
import { ReadyStatus } from '../Modal/components/ReadyStatus';

const socket = new WebSocket('ws://localhost:5000');
let clientId = null;

export const App = () => {
  // const { isOpen } = useModal();

  const {
    player,
    places,
    userName,
    showReadyModal,
    setPlaces,
    setPlayer,
    gameStarted,
    showCountDown,
    // setPlace,
    // cleanPlace,
    // setIsReady,
    setUserName,
    setPosition,
    handleSubmit,
    handleStartGame,
  } = usePlaces();

  socket.onmessage = (message) => {
    const response = JSON.parse(message.data);
    console.log(response);
    if (response?.method === 'connect' && !clientId) {
      const users = response.users;
      clientId = response.clientId;
      console.log("Client id Set successfully " + clientId);
      setPlaces(users);
    }

    if (response?.method === 'join') {
      const users = response.users;
      setPlaces(users);

      users.forEach((user) => {
        if (user.uuid === clientId) {
          setPlayer(user);
        }
      })
    }

    if (response?.method === 'updatePlaces') {
      const currentPlaces = places;
      const updatePlaces = response.users;
      const updatedPlaces = updatePlaces.map((user, index) => user.name === player.name ? { ...currentPlaces[index], isReady: user.isReady } : user);

      setPlaces(updatedPlaces);
    }

    if (response?.method === 'ready') {
      const users = response.users;
      const currentPlaces = places;
      const updatedPlaces = users.map((user, index) => user.name === player.name ? currentPlaces[index] : user);

      setPlaces(updatedPlaces);
    }

    if (response?.method === 'clean') {
      const users = response.users;
      setPlaces(users);
      setPlayer({ ...player, place: undefined });
    }
  }

  const cleanPlace = (name: string) => {
    const payLoad = {
      method: "clean",
      clientId: clientId,
      userName: name,
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
      const payLoad = {
        method: "ready",
        clientId,
        userName,
      };
    
      socket.send(JSON.stringify(payLoad));
    }
  };

  return (
    <Wrapper>
      <Modal isOpen={showReadyModal && !gameStarted}>
        <ReadyStatus
          places={places}
          setIsReady={setIsReady}
          showCountDown={showCountDown}
          handleStartGame={handleStartGame}
        />
      </Modal>
      <PlaceSelector setPlace={setPlace} places={places} user={player} closeUser={cleanPlace} />
      {places?.map((place: any, index: number) => (
        <Card
          key={index}
          place={place.place}
          cards={place.cards}
          user={place?.name}
          cardsAmount={place.cardsAmount}
          position={setPosition(place)}
          isVisible={place?.name === player?.name}
        />
      ))}
      <PlayerNameModal player={player} setUserName={setUserName} handleSubmit={handleSubmit} />
    </Wrapper>
  );
}
