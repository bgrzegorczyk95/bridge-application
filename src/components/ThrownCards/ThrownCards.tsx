import React from 'react';
import * as playerCards from '../../assets/img/cards';
import { setPosition } from '../../utilities/positions';
import { WrapperStyles, BorderStyles, CardWrapperStyles, CardStyles } from './ThrownCardsStyles';

interface Props {
  cards: any;
  player: any;
  clientId: string;
}

export const ThrownCards = ({ cards, player, clientId }: Props) => {
  return (
    <WrapperStyles>
      {cards.map((card: any, index: number) => (
        <CardWrapperStyles position={setPosition(card, clientId, player)} key={index}>
          {console.log(setPosition(card, clientId, player))}
          <CardStyles src={playerCards.default[`${card.value}${card.color}`]} />
        </CardWrapperStyles>
      ))}
    </WrapperStyles>
  )
}