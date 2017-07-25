import { GameStatus } from './game-status';

export class Game {

  status: GameStatus;
  player1Name: string;
  player1Score: number;
  player2Name: string;
  player2Score: number;
  namesDefined: boolean;

  constructor() {
    this.status = GameStatus.none;
    this.player1Name = 'player1';
    this.player1Score = 0;
    this.player2Name = 'player2';
    this.player2Score = 0;
    this.namesDefined = false;
  }

}
