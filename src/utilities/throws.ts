export const checkIfThrowAllowed = (trump, thrownCards, playerCards, card) => {
  const trumpColor = trump?.colorName;
  const firstCardColor = thrownCards[0]?.color;
  const playerCardColors = playerCards.map((card: any) => card.color);
  const areAllCardThrows = thrownCards.length === 4;
  const hasFirstCardColor = playerCardColors.includes(firstCardColor);
  const hasTrumpColor = playerCardColors.includes(trumpColor);
  const isFirstColor = card.color === firstCardColor;
  const isTrumpColor = card.color === trumpColor;
  console.log(thrownCards);
  return !thrownCards.length || (!areAllCardThrows && ((hasFirstCardColor && isFirstColor)
  || (!hasFirstCardColor && hasTrumpColor && isTrumpColor) || (!hasFirstCardColor && !hasTrumpColor)));
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