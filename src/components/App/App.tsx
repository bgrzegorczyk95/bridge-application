/* eslint-disable */

import React from 'react';
import { usePlaces } from '../../hook/usePlaces';
import { Card } from '../Cards/Card';
import { Modal } from '../Modal/Modal';
import { PlaceSelector } from '../PlaceSelector/PlaceSelector';
import { PlayerNameModal } from '../PlayerNameModal/PlayerNameModal';
import { Wrapper } from './AppStyles';
import { ReadyStatus } from '../Modal/components/ReadyStatus';
import { Auction } from '../Modal/Auction/Auction';
import { ThrownCards } from '../ThrownCards/ThrownCards';
import { setPosition } from '../../utilities/positions';
import { TurnArrow } from '../TurnArrow/TurnArrow';

const socket = new WebSocket('ws://localhost:5000');

export const App = () => {
  const {
    turn,
    trump,
    player,
    places,
    auction,
    clientId,
    showReadyModal,
    auctionStarted,
    gameStarted,
    thrownCards,
    showCountDown,
    auctionHistory,
    setPlace,
    cleanPlace,
    setIsReady,
    setUserName,
    handleSubmit,
    handleStartGame,
    handleClickCard,
} = usePlaces(socket);

  return (
    <Wrapper>
      <Modal isOpen={(showReadyModal || (auctionStarted && turn?.place === player?.place)) && !gameStarted}>
        <>
          {showReadyModal && (
            <ReadyStatus
              places={places}
              setIsReady={setIsReady}
              showCountDown={showCountDown}
              handleStartGame={handleStartGame}
            />
          )}
          {(auctionStarted && turn?.place === player?.place) && (
            <Auction
              turn={turn}
              auction={auction}
              socket={socket}
              player={player}
              clientId={clientId}
            />
          )}
        </>
      </Modal>
      <PlaceSelector setPlace={setPlace} places={places} user={player} closeUser={cleanPlace} />
      {places?.map((place: any, index: number) => (
        <Card
          key={index}
          place={place.place}
          cards={place.cards}
          user={place?.name}
          cardsAmount={place.cardsAmount}
          position={setPosition(place, player)}
          isVisible={place.cards.length}
          handleClickCard={(card: any) => handleClickCard(card, place)}
        />
      ))}
      <PlayerNameModal player={player} setUserName={setUserName} handleSubmit={handleSubmit} />
      {(auctionStarted || gameStarted) && <TurnArrow position={setPosition(turn, player)} />}
      <ThrownCards player={player} cards={thrownCards} />
    </Wrapper>
  );
}
