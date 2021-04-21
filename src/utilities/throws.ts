export const checkIfThrowAllowed = (thrownCards, playerCards, card) => {
  const firstCardColor = thrownCards[0]?.color;
  const playerCardColors = playerCards.map((card: any) => card.color);
  const areAllCardThrows = thrownCards.length === 4;
  const hasFirstCardColor = playerCardColors.includes(firstCardColor);
  const isFirstColor = card.color === firstCardColor;

  return !thrownCards.length || (!areAllCardThrows && ((hasFirstCardColor && isFirstColor) || !hasFirstCardColor));
};

export const checkIfPlayerTurn = (turn, player, dummy, place) => {
  const isCurrentPlayer = turn?.place === player?.place;
  const isDummy = dummy !== player.place;
  const isPlayerThrow = place.place === player.place;

  return isCurrentPlayer && isDummy && isPlayerThrow;
};

export const checkIfDummyTurn = (turn, trump, player, dummy, place) => {
  const isDummy = turn.place === dummy;
  const isDeclarer = trump.place === player.place;
  const isDeclarerThrow = place.place === turn.place;

  return isDummy && (isDeclarer && isDeclarerThrow);
};