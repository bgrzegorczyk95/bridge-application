import React from 'react';
import { CountDown } from '../../CountDown/CountDown';
import { NotReadyStyles, ReadyStatusStyles, ReadyStatusWrapperStyles, ReadyStyles, SectionStyles } from './ReadyStatusStyles';

interface Props {
  places: any;
  setIsReady: any;
  showCountDown: boolean;
  handleStartGame: any;
}

export const ReadyStatus = ({ places, setIsReady, showCountDown, handleStartGame }: Props) => (
  <ReadyStatusWrapperStyles>
    <SectionStyles>
      {places.map((place: any) => (
        <ReadyStatusStyles key={place.place}>
          {place?.name || 'Guest213'}
          {place.isReady ?
            <ReadyStyles onClick={() => setIsReady(place)}>Gotowy</ReadyStyles>
            : <NotReadyStyles onClick={() => setIsReady(place)}>Niegotowy</NotReadyStyles>}
        </ReadyStatusStyles>
      ))}
    </SectionStyles>
    {showCountDown && <CountDown color="white" text="Gra rozpocznie się za" seconds={5} handleEndTime={handleStartGame} />}
  </ReadyStatusWrapperStyles>
)