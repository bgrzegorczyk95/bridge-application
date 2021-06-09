import { Card, Game, Player } from '../@types/types';
import { checkIfDummyTurn, checkIfPlayerTurn, checkIfThrowAllowed } from '../utilities/throws';

const dummyType: { [key: string]: 'S' | 'N' | 'E' | 'W' } = {
  N: 'S',
  S: 'N',
  E: 'W',
  W: 'E',
};

export const usePlaces = (socket: WebSocket, game: Game, player: Player, gameId: number) => {
  const throwCard = (card: Card, place: Player) => {
    const payLoad = {
      method: "throw",
      turn: game.turn,
      gameId,
      card: { name: place.name, place: place.place, value: card.value, color: card.color }
    };
    socket.send(JSON.stringify(payLoad));
  };

  const handleClickCard = (card: Card, place: Player) => {
    const isPlayerTurn = checkIfPlayerTurn(game.turn, player, dummyType[game.trump.place], place);
    const isDummyTurn = checkIfDummyTurn(game.turn, game.trump, player, dummyType[game.trump.place], place);

    if (game.thrownCards.length !== 4 && game.statuses.gameStarted && (isPlayerTurn || isDummyTurn)) {
      const isThrowAllowed = checkIfThrowAllowed(game.thrownCards, place.cards, card);

      if (isThrowAllowed) {
        throwCard(card, place);
      }
    }
  };

  return {
    handleClickCard,
  }
}
