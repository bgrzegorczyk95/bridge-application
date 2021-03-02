import React from 'react';
import { usePlaces } from '../../hook/usePlaces';
import { Card } from '../Cards/Card';
import { PlaceSelector } from '../PlaceSelector/PlaceSelector';
import { Wrapper, PlayerNameModal, Input, ModalWrapper, Button } from './AppStyles';

export const App = () => {
  const {
    player,
    places,
    setPlace,
    cleanPlace,
    setUserName,
    setPosition,
    handleSubmit,
  } = usePlaces();

  return (
    <Wrapper>
      <PlaceSelector setPlace={setPlace} places={places} user={player} closeUser={cleanPlace} />
      {places?.map((place: any, index: number) => (
        <Card
          key={index}
          place={place.place}
          cards={place.cards}
          user={place?.user}
          position={setPosition(place)}
          isVisible={place.cards.length}
        />
      ))}
      {!player?.user ? (
        <PlayerNameModal>
          <ModalWrapper>
            <label htmlFor="player-name">Wpisz nazwę użytkownika:</label>
            <Input
              type="text"
              id="player-name"
              placeholder="wpisz imię"
              onChange={(e: any) => setUserName(e.target.value)}
            />
            <Button type="submit" onClick={handleSubmit}>
              Zatwierdź
            </Button>
          </ModalWrapper>
        </PlayerNameModal>
      ) : null}
    </Wrapper>
  );
}
