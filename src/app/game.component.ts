import { Component, OnInit } from '@angular/core';
import { Player } from './model/player';
import { BattleService } from './service/battle.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: [ './game.component.css' ]
})

export class GameComponent implements OnInit {

  player: Player;
  constructor(private battleService: BattleService) { }

  ngOnInit(): void {
    this.player = new Player();
    this.battleService.startGame();
  }
}
