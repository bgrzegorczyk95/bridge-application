import { Game } from '../../../../@types/types';
import { CountDown } from '../../../CountDown/CountDown';
import { EndGameWrapper, EndGameContent } from './EndGameStyles';

interface Props {
  game: Game;
  resetGame: () => void;
}

export const EndGame = ({ game, resetGame }: Props) => {
  return (
    <EndGameWrapper>
      <EndGameContent>
        {game.gamePoints.NS.score !== game.gamePoints.EW.score ? (
          <span>
            Wygrana para: {game.gamePoints.NS.score > game.gamePoints.EW.score ? 'NS' : 'EW'}
          </span>
        ) : <span>Remis!</span>}
        <CountDown color="black" text="Zakończenie gry nastąpi za" seconds={20} handleEndTime={resetGame} />
      </EndGameContent>
    </EndGameWrapper>
  );
};
