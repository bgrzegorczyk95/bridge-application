import React from 'react';
import { ArrowWrapperStyles } from './TurnArrowStyles';

interface Props {
  position: string;
  playerPlace: string;
  game: any;
}

export const TurnArrow = ({ playerPlace, position, game }: Props) => (
  (game?.statuses.auctionStarted || game?.statuses.gameStarted) ? ( 
    <ArrowWrapperStyles bestBidPlace={game.bestBid.place} playerPlace={playerPlace} position={position} />
  ) : null
);
