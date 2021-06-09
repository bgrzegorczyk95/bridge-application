import { Player } from "../@types/types";

const positions: { [key: string]: { [key: string]: string } } = {
  S: { N: 'TOP', E: 'RIGHT', W: 'LEFT' },
  N: { S: 'TOP', E: 'LEFT', W: 'RIGHT' },
  E: { N: 'RIGHT', S: 'LEFT', W: 'TOP' },
  W: { N: 'LEFT', S: 'RIGHT', E: 'TOP' },
};

const observerPositions: { [key: string]: string } = {
  N: 'TOP',
  S: 'BOTTOM',
  E: 'RIGHT',
  W: 'LEFT',
};

export const setPosition = (place: string, player: Player) => {
  if (place === player?.place) {
    return 'BOTTOM';
  } else if (player?.place) {
    return positions[player?.place][place];
  } else {
    return observerPositions[place];
  }
};
