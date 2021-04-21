const placeTypes = {
  N: 'S',
  S: 'N',
  E: 'W',
  W: 'E',
};

export const checkIfDoubledAndRedoubled = (bestBid: any, player: any) => {
  const isDoubled = bestBid?.col >= 0 && !bestBid?.doubled && !bestBid?.redoubled && bestBid?.place !== placeTypes[player.place];
  const isRedoubled = bestBid?.doubled && !bestBid?.redoubled && (bestBid?.place === placeTypes[player.place] || bestBid?.place === player.place);

  return { isDoubled, isRedoubled };
}