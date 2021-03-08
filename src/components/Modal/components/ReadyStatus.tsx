import React from 'react';
import { CountDown } from '../../CountDown/CountDown';
import { NotReadyStyles, ReadyStatusStyles, ReadyStatusWrapperStyles, ReadyStyles } from './ReadyStatusStyles';

interface Props {
  places: any;
  setIsReady: any;
  showCountDown: boolean;
  handleStartGame: any;
}

export const ReadyStatus = ({ places, setIsReady, showCountDown, handleStartGame }: Props) => (
  <ReadyStatusWrapperStyles>
    {places.map((place: any) => (
      <ReadyStatusStyles key={place.place}>
        {place?.name || 'Guest213'}
        {place.isReady ?
          <ReadyStyles onClick={() => setIsReady(place)}>Gotowy</ReadyStyles>
          : <NotReadyStyles onClick={() => setIsReady(place)}>Niegotowy</NotReadyStyles>}
      </ReadyStatusStyles>
    ))}
    {showCountDown && <CountDown seconds={5} startGame={handleStartGame} />}
  </ReadyStatusWrapperStyles>
)