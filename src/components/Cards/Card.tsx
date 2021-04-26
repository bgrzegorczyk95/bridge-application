import React from 'react';
import * as playerCards from '../../assets/img/cards';
import CardBack from '../../assets/img/cards/Card_back.svg';
import { CardWrapper, SingleCard, CardsWrapper, PlayerName, PlayerNameInitial } from './CardStyles';

interface Props {
  isVisible: boolean;
  position?: string;
  user?: string;
  cards: Card[];
  place: string;
  cardsAmount: number;
  handleClickCard: (card: Card) => void;
}

interface Card {
  color: string;
  value: string;
}

export const Card = ({ isVisible, position, user, cards, place, cardsAmount, handleClickCard }: Props) => {
  const cardsList: any = cardsAmount && !cards.length ? Array(cardsAmount).fill('') : cards;

  return (
    position ? (
      <CardsWrapper margin={`-${(((cards?.length || cardsAmount) / 2) * 40) - 20}px`} position={position} isVisible={isVisible}>
        {cardsList?.length ? <PlayerName isVisible={isVisible} position={position}>{`[${place}]${user}` || ''}</PlayerName> : null}
        {cardsList?.length ? (
          cardsList?.map((card: Card, index: number) => (
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
                src={isVisible ? playerCards.default[`${card.value}${card.color}`] : CardBack}
                onClick={() => handleClickCard(card)}
              />
            </CardWrapper>
          ))
        ) : <PlayerNameInitial position={position}>{user || place}</PlayerNameInitial>}
      </CardsWrapper>
    ) : null
  );
}