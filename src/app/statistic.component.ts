import { Component } from '@angular/core';
import { ShipType } from './model/ship-type';
import { GameService } from './service/game.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: [ './statistic.component.css' ]
})

export class StatisticComponent {

  constructor(public gameService: GameService) { }

  getShipImagePath(type: ShipType): string {
    const map = {
      0: '',
      1: '../assets/destroyer.png',
      2: '../assets/submarine.png',
      3: '../assets/cruiser.png',
      4: '../assets/battleship.png',
      5: '../assets/carrier.png',
    };

    return map[type];
  }
}
