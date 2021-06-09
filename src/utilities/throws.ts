import { Trump, Card, Player, Turn } from "../@types/types";

export const checkIfThrowAllowed = (thrownCards: Card[], playerCards: Card[], card: Card) => {
  const firstCardColor = thrownCards[0]?.color;
  const playerCardColors = playerCards.map((card: Card) => card.color);
  const areAllCardThrows = thrownCards.length === 4;
  const hasFirstCardColor = playerCardColors.includes(firstCardColor);
  const isFirstColor = card.color === firstCardColor;

  return !thrownCards.length || (!areAllCardThrows && ((hasFirstCardColor && isFirstColor) || !hasFirstCardColor));
};

export const checkIfPlayerTurn = (turn: Turn, player: Player, dummy: 'N' | 'S' | 'E' | 'W', place: Player) => {
  const isCurrentPlayer = turn?.place === player?.place;
  const isDummy = dummy !== player.place;
  const isPlayerThrow = place.place === player.place;

  return isCurrentPlayer && isDummy && isPlayerThrow;
};

export const checkIfDummyTurn = (turn: Turn, trump: Trump, player: Player, dummy: 'N' | 'S' | 'E' | 'W', place: Player) => {
  const isDummy = turn.place === dummy;
  const isDeclarer = trump.place === player.place;
  const isDeclarerThrow = place.place === turn.place;

  return isDummy && (isDeclarer && isDeclarerThrow);
};
