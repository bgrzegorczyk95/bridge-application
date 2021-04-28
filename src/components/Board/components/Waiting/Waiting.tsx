import React from 'react';
import { CountDown } from '../../../CountDown/CountDown';
import { WaitingWrapper, WaitingContent } from './WaitingStyles';

interface Props {
  resetGame: any;
}

export const Waiting = ({ resetGame }: Props) => {
  return (
    <WaitingWrapper>
      <WaitingContent>
        <CountDown
          color="black"
          text="Oczekiwanie na graczy"
          seconds={20}
          handleEndTime={resetGame}
        />
      </WaitingContent>
    </WaitingWrapper>
  );
};
