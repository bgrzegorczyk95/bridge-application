export interface Game {
  gameId: number;
  passCount: number;
  playersCount: number;
  players: Player[];
  throws: Throw[];
  thrownCards: Throw[];
  selectedCards: Card[];
  biddingHistory: Bid[];
  turn: Turn;
  trump: Trump;
  statuses: Statuses;
  gamePoints: GamePoints;
}

export interface Turn {
  name?: string;
  place?: string;
}

export interface Bid {
  place: string;
  row?: number;
  col?: number;
  colorName?: string;
  value?: string;
  pass?: boolean;
  doubled: boolean;
  redoubled: boolean;
  empty?: boolean;
}

export interface Throw {
  name: string;
  place: string;
  value: string;
  color: string;
}

export interface Card {
  color: string;
  value: string;
}

export interface Statuses {
  waitingForPlayers: boolean;
  gameStarted: boolean;
  auctionStarted: boolean;
  showCountDown: boolean;
  endGame: boolean;
}

export interface GamePoints {
  NS: GamePairPoints;
  EW: GamePairPoints;
  afterPart: string[];
  games: number;
}

interface GamePairPoints {
  score: number;
  under: number[];
  above: number;
  round: number;
  games: number;
}

export interface Player {
  place: 'N' | 'S' | 'E' | 'W';
  takenPlace: boolean;
  uuid?: string;
  name?: string,
  cards: Card[],
  cardsAmount: number;
  isReady: boolean;
}

export interface Trump {
  userName?: string;
  colorName?: string;
  value?: string;
  col?: number;
  row?: number;
  place?: string;
  doubled: boolean;
  redoubled: boolean;
}

export interface WaitingPlayer {
  clientId: string;
  gameId: number;
}

export interface SocketContextInterface {
  games: Game[];
  game: Game;
  statuses: Statuses,
  player: Player,
  userName: string,
  clientId: string,
  setPlayer: (player: Player) => void;
  resetGame: () => void,
  setUserName: (userName: string) => void,
}
