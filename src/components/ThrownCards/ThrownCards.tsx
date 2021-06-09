import { Player, Throw } from '../../@types/types';
import * as playerCards from '../../assets/img/cards';
import { setPosition } from '../../utilities/positions';
import { WrapperStyles, CardWrapperStyles, CardStyles } from './ThrownCardsStyles';

interface Props {
  cards: Throw[];
  player: Player;
  trumpPlace: string;
  isGameStarted: boolean;
}

export const ThrownCards = ({ cards, player, trumpPlace, isGameStarted }: Props) => {
  return (
    isGameStarted ? (
      <WrapperStyles trumpPlace={trumpPlace} playerPlace={player.place || 'N'}>
        {cards.map((card: Throw, index: number) => (
          <CardWrapperStyles position={setPosition(card.place, player)} key={index}>
            <CardStyles src={playerCards.default[`${card.value}${card.color}`]} />
          </CardWrapperStyles>
        ))}
      </WrapperStyles>
    ) : null
  );
};
