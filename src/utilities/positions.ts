export const positions: { [key: string]: { [key: string]: string } } = {
  S: {
    N: 'TOP',
    E: 'RIGHT',
    W: 'LEFT',
  },
  N: {
    S: 'TOP',
    E: 'LEFT',
    W: 'RIGHT',
  },
  E: {
    N: 'RIGHT',
    S: 'LEFT',
    W: 'TOP',
  },
  W: {
    N: 'LEFT',
    S: 'RIGHT',
    E: 'TOP',
  },
};

export const observerPositions: { [key: string]: string } = {
  N: 'TOP',
  S: 'BOTTOM',
  E: 'LEFT',
  W: 'RIGHT',
}