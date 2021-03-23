const placeTypes = {
  N: 'S',
  S: 'N',
  E: 'W',
  W: 'E',
};

export const useAuction = (auction: any, socket: any, player: any, clientId: string, turn: string) => {
  const isDoubledEnabled = auction?.col >= 0 && !auction?.doubled && auction?.place !==  placeTypes[player.place];
  const isEnabledRedoubled = auction?.doubled && !auction?.redoubled && auction?.place !==  placeTypes[player.place];

  const setBid = (row: number, col: number, colorName: string, value: string) => {
    const payLoad = {
      method: "bid",
      turn,
      bid: { place: player.place, row, col, colorName, value }
    }

    socket.send(JSON.stringify(payLoad));
  };

  const setPass = () => {
    const payLoad = {
      method: "bid",
      bid: { ...auction, pass: true },
      turn,
    }

    socket.send(JSON.stringify(payLoad));
  };

  const setDoubled = () => {
    const payLoad = {
      method: "bid",
      bid: { ...auction, place: player.place, doubled: true },
      turn,
    }

    socket.send(JSON.stringify(payLoad));
  };

  const setRedoubled = () => {
    const payLoad = {
      method: "bid",
      bid: { ...auction, place: player.place, redoubled: true },
      turn,
    }

    socket.send(JSON.stringify(payLoad));
  }

  return {
    setBid,
    setPass,
    setDoubled,
    setRedoubled,
    isDoubledEnabled,
    isEnabledRedoubled,
  }
};
