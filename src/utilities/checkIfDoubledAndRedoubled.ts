import { Trump, Player } from "../@types/types";

const placeTypes = {
  N: 'S',
  S: 'N',
  E: 'W',
  W: 'E',
};

export const checkIfDoubledAndRedoubled = (trump: Trump, player: Player) => {
  const isDoubled = trump?.col >= 0 && !trump?.doubled && !trump?.redoubled && trump?.place !== placeTypes[player.place];
  const isRedoubled = trump?.doubled && !trump?.redoubled && (trump?.place === placeTypes[player.place] || trump?.place === player.place);

  return { isDoubled, isRedoubled };
}
