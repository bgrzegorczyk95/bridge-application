import React from 'react';
import * as playerCards from '../../assets/img/cards';
import { setPosition } from '../../utilities/positions';
import { WrapperStyles, BorderStyles, CardWrapperStyles, CardStyles } from './ThrownCardsStyles';

interface Props {
  cards: any;
  player: any;
}

export const ThrownCards = ({ cards, player }: Props) => {
  return (
    <WrapperStyles>
      <BorderStyles>
        {cards.map((card: any, index: number) => (
          <CardWrapperStyles position={setPosition(card, player)} key={index}>
            <CardStyles src={playerCards.default[`${card.value}${card.color}`]} />
          </CardWrapperStyles>
        ))}
      </BorderStyles>
    </WrapperStyles>
  )
}