import { Component, Input } from '@angular/core';
import { Game } from './model/game';
import {GameService} from "./service/game.service";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: [ './score.component.css' ]
})

export class ScoreComponent {

  constructor(public gameService: GameService) { }

  styleScore(score: number): string {
    return (score / 10)
      .toFixed(1)
      .replace('.','');
  }
}
