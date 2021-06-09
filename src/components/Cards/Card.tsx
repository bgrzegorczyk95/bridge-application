import { Card as CardInterface } from '../../@types/types';

import * as playerCards from '../../assets/img/cards';
import CardBack from '../../assets/img/cards/Card_back.svg';
import { CardWrapper, SingleCard, CardsWrapper, PlayerName, PlayerNameInitial } from './CardStyles';

interface Props {
  isVisible: number;
  position?: string;
  user?: string;
  cards: CardInterface[];
  place: string;
  cardsAmount: number;
  handleClickCard: (card: CardInterface) => void;
}

export const Card = ({ isVisible, position, user, cards, place, cardsAmount, handleClickCard }: Props) => {
  const cardsList: CardInterface[] = cardsAmount && !cards.length ? Array(cardsAmount).fill('') : cards;

  return (
    cardsList?.length ? (
      <CardsWrapper margin={`-${(((cards?.length || cardsAmount) / 2) * 40) - 20}px`} position={position} isVisible={isVisible}>
        <PlayerName isVisible={isVisible} position={position}>{`[${place}]${user}` || ''}</PlayerName>
        {cardsList?.map((card: CardInterface, index: number) => (
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
        ))}
      </CardsWrapper>
    ) : <PlayerNameInitial position={position}>{user || place}</PlayerNameInitial>
  );
};
