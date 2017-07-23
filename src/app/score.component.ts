import { Component, Input } from '@angular/core';
import { Game } from './model/game';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: [ './score.component.css' ]
})

export class ScoreComponent {

  @Input() game: Game;

  styleScore(score: number): string {
    return (score / 10)
      .toFixed(1)
      .replace('.','');
  }
}
