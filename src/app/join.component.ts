import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameStatus } from './model/game-status';
import { Player } from './model/player';
import { Game } from './model/game';
import { ResponseUtil } from './utils/response-util';

import { BattleService } from './service/battle.service';
import { GameService } from './service/game.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: [ './join.component.css' ]
})

export class JoinComponent implements OnInit {

  name: string;

  constructor(private gameService: GameService,
              private battleService: BattleService,
              private responseUtil: ResponseUtil,
              private router: Router) { }

  ngOnInit(): void {
    this.battleService.getGameStatus().then(response => {
      if (this.responseUtil.mapGameStatus(response.gameStatus) === GameStatus.none) {
        this.battleService.startGame().then(resp => {});
      }
      this.gameService.game = new Game();
    });
  }

  // Join the game
  private join(): void {

    // Handle user name
    if (this.name.trim() === '') {
      alert('Please fill user name');
      return;
    }

    this.battleService.joinGame(this.name).then(response => {
      const gameStatus = this.responseUtil.mapGameStatus(response.gameStatus);

      if (gameStatus === GameStatus.booked) {
        alert('Game is already booked. Please try again later');
        return;
      }

      this.gameService.player = new Player(response.player.id, response.player.name);
      this.gameService.game.status = gameStatus;

      this.router.navigate(['/game']);
    });
  }

}
