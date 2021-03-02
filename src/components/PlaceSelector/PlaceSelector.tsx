import React, { useState } from 'react';
import Place from '../../assets/img/place.svg';
import { Wrapper, Title, Row, Btn, CloseIcon, PlaceIcon } from './PlaceSelectorStyles';

export const PlaceSelector = ({ places, setPlace, user, closeUser }: any) => {
  const [showPlaces, setShowPlaces] = useState(false);

  const checkIfDisabled = (pos: string): boolean => {
    let isPlaceTaken = false;

    for (let place of places) {
      if (((place.place === pos) && place.takenPlace) || user.place) {
        isPlaceTaken = true;
      }
    }

    return isPlaceTaken;
  }

  return (
    <Wrapper visible={showPlaces}>
      <PlaceIcon src={Place} alt="place icon" onClick={() => setShowPlaces(!showPlaces)} />
      <Title visible={showPlaces}>Wybierz miejsce</Title>
      <Row visible={showPlaces}>
        {places.map((place: any) => (
          <Btn
            key={place.place}
            onClick={() => setPlace(place.place)}
            disabled={checkIfDisabled(place.place)}
          >
            {place.user ? place.user : place.place}
            {place.user === user.user && place.place === user.place && (
              <CloseIcon onClick={() => closeUser(place.user)}>&#10006;</CloseIcon>
            )}
          </Btn>
        ))}
      </Row>
    </Wrapper>
  )
}