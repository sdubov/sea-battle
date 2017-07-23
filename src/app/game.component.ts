import { Component, Input, OnInit } from '@angular/core';
import { Player } from './model/player';
import { BattleService } from './service/battle.service';
import { GameStatus } from './model/game-status';
import { Game } from './model/game';
import { WebSocketService } from './service/web-socket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: [ './game.component.css' ]
})

export class GameComponent implements OnInit {

  @Input() name: string;
  details: string;
  @Input() player: Player;
  @Input() game: Game;

  constructor(private battleService: BattleService,
              private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.battleService.startGame();
    this.game = new Game();
  }

  join(): void {
    if (this.name.trim() === '') {
      alert('Please fill user name');
      return;
    }

    // Set up the web socket connection before joining to update the status and notify others
    this.webSocketService.connect('ws://localhost:8080/websocket');
    this.webSocketService.getObservable().subscribe(payload => {

      const gameStatus = this.mapServerStatus(payload.status);

      if (gameStatus === GameStatus.finished) {
        const activePlayer = payload.activePlayer;
        this.game.player1Score = payload.player1Score;
        this.game.player2Score = payload.player2Score;
        this.player.resetPlayer();

        if (activePlayer.id === this.player.id) {
          this.battleService.restartGame().then(response => {});
        }

        alert(`${activePlayer.name} win the game`);
      }

      if (!this.game.namesDefined && gameStatus === GameStatus.in_progress) {
        this.game.player1Name = payload.player1Name;
        this.game.player2Name = payload.player2Name;
        this.game.namesDefined = true;
      }

      this.game.status = gameStatus;
      this.details = `>> ${payload.activePlayer.name} make a shoot`;
    });

    // Join the game
    this.battleService.joinGame(this.name).then(response => {
      const gameStatus = this.mapServerStatus(response.status);

      if (gameStatus === GameStatus.booked) {
        alert('Game is already booked. Please try again later');
        return;
      }

      this.game.player1Name = response.player1Name;

      if (gameStatus !== GameStatus.waiting_for_opponent) {
        this.game.player2Name = response.player2Name;
        this.details = `>> ${response.player1Name} make a shoot`;
      }

      this.player = new Player(response.activePlayer.id, this.name);
      this.game.status = gameStatus;
    });
  }

  displayGameStatus(status: GameStatus): string {
    switch (status) {
      case 0:
        return 'STARTED';

      case 1:
        return 'WAITING FOR OPPONENT';

      case 2:
        return 'GAME IN PROGRESS';

      case 3:
        return 'WAIT FOR YOU TURN';

      case 4:
        return 'GAME IS BOOKED';

      case 5:
        return 'GAME IS FINISHED';
    }
  }

  mapServerStatus(status: string): GameStatus {
    switch (status) {
      case 'STARTED':
        return GameStatus.started;

      case 'WAITING_FOR_OPPONENT':
        return GameStatus.waiting_for_opponent;

      case 'IN_PROGRESS':
        return GameStatus.in_progress;

      case 'BOOKED':
        return GameStatus.booked;

      case 'FINISHED':
        return GameStatus.finished;
    }
  }
}
