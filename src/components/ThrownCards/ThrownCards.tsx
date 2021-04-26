import React from 'react';
import * as playerCards from '../../assets/img/cards';
import { setPosition } from '../../utilities/positions';
import { WrapperStyles, CardWrapperStyles, CardStyles } from './ThrownCardsStyles';

interface Props {
  cards: any;
  player: any;
  clientId: string;
  bestBidPlace: string;
  isGameStarted: boolean;
}

export const ThrownCards = ({ cards, player, clientId, bestBidPlace, isGameStarted }: Props) => {
  return (
    isGameStarted ? (
      <WrapperStyles bestBidPlace={bestBidPlace} playerPlace={player.place || 'N'}>
        {cards.map((card: any, index: number) => (
          <CardWrapperStyles position={setPosition(card, clientId, player)} key={index}>
            <CardStyles src={playerCards.default[`${card.value}${card.color}`]} />
          </CardWrapperStyles>
        ))}
      </WrapperStyles>
    ) : null
  );
};
