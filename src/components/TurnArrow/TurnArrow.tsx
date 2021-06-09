import { Game } from '../../@types/types';
import { ArrowWrapperStyles } from './TurnArrowStyles';

interface Props {
  position: string;
  playerPlace: string;
  game: Game;
}

export const TurnArrow = ({ playerPlace, position, game }: Props) => (
  (game?.statuses.auctionStarted || game?.statuses.gameStarted) ? ( 
    <ArrowWrapperStyles trumpPlace={game.trump.place} playerPlace={playerPlace} position={position} />
  ) : null
);
