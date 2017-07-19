import {Component, Input, OnInit, Output } from '@angular/core';
import { Ship } from './model/ship';
import { ShipType } from './model/ship-type';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: [ './statistic.component.css' ]
})

export class StatisticComponent implements OnInit {

  @Input() ships: Ship[];

  ngOnInit(): void {
  }

  getShipImagePath(type: ShipType): string {
    const map = {
      0: '../assets/destroyer.png',
      1: '../assets/submarine.png',
      2: '../assets/cruiser.png',
      3: '../assets/battleship.png',
      4: '../assets/carrier.png',
    };

    return map[type];
  }
}
