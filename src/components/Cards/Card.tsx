import React from 'react';
import * as playerCards from '../../assets/img/cards';
import CardBack from '../../assets/img/cards/Card_back.svg';
import { CardWrapper, SingleCard, CardsWrapper, PlayerName, PlayerNameInitial } from './CardStyles';

interface Props {
  isVisible: boolean;
  position?: string;
  user?: string;
  cards: string[];
  place: string;
  cardsAmount: number;
}

export const Card = ({ isVisible, position, user, cards, place, cardsAmount }: Props) => {
  const cardsList: any = cardsAmount && !cards.length ? Array(cardsAmount).fill('') : cards;
  console.log('ESA', cardsList);
  return (
    position ? (
      <CardsWrapper margin={`-${(((cards?.length || cardsAmount) / 2) * 40) - 20}px`} position={position}>
        {cardsList?.length ? <PlayerName position={position}>{user || ''}</PlayerName> : null}
        {cardsList?.length ? (
          cardsList?.map((card: string, index: number) => (
            <CardWrapper
              key={`${index}`}
              position={position}
              isVisible={isVisible}
              margin={`${index * 40}px`}
            >
              <SingleCard
                alt="card"
                isVisible={isVisible}
                position={position}
                src={isVisible ? playerCards.default[card] : CardBack}
              />
            </CardWrapper>
          ))
        ) : <PlayerNameInitial position={position}>{user || place}</PlayerNameInitial>}
      </CardsWrapper>
    ) : null
  );
}