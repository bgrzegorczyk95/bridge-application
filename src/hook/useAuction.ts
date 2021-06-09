import { Player, Turn } from "../@types/types";

export const useAuction = (socket: WebSocket, player: Player, gameId: number, turn: Turn) => {
  const setBid = (row: number, col: number, colorName: string, value: string) => {
    const payLoad = {
      method: "bid",
      turn,
      gameId,
      bid: { place: player.place, row, col, colorName, value }
    }

    socket.send(JSON.stringify(payLoad));
  };

  const setPass = () => {
    const payLoad = {
      method: "bid",
      gameId,
      bid: { place: player.place, pass: true },
      turn,
    }

    socket.send(JSON.stringify(payLoad));
  };

  const setDoubled = () => {
    const payLoad = {
      method: "bid",
      gameId,
      bid: { place: player.place, doubled: true },
      turn,
    }

    socket.send(JSON.stringify(payLoad));
  };

  const setRedoubled = () => {
    const payLoad = {
      method: "bid",
      gameId,
      bid: { place: player.place, doubled: false, redoubled: true },
      turn,
    }

    socket.send(JSON.stringify(payLoad));
  }

  return {
    setBid,
    setPass,
    setDoubled,
    setRedoubled,
  }
};
