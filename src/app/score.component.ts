import { Component, Input } from '@angular/core';
import { Player } from './model/player';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: [ './score.component.css' ]
})

export class ScoreComponent {

  @Input() player: Player;

  styleScore(score: number): string {
    return (score / 10)
      .toFixed(1)
      .replace('.','');
  }
}
