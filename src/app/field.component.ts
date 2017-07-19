import { Component, OnInit } from '@angular/core';
import { Field } from './model/field';
import { BattleService } from './service/battle.service';
import { Ship } from './model/ship';
import { Player } from './model/player';
import {StatisticComponent} from "./statistic.component";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: [ './field.component.css' ]
})

export class FieldComponent implements OnInit {

  field: Field = null;
  player: Player = null;

  // Get the initial game field array
  constructor(private battleService: BattleService) { }

  ngOnInit(): void {
    this.field = this.battleService.getField();
    this.player = new Player();
  }

  onCellClick(row: number, column: number): void {
    if (this.field.shoots[row][column].status === 1 || this.field.shoots[row][column].status === 2) { return; }
    for (let shipIndex = 0; shipIndex < this.field.ships.length; shipIndex++) {
      const ship = this.field.ships[shipIndex];
      const shipCoordinates = ship.coordinates;

      for (let coordinateIndex = 0; coordinateIndex < shipCoordinates.length; coordinateIndex++) {
        const coordinate = shipCoordinates[coordinateIndex];

        if (row === coordinate[0] && column === coordinate[1]) {
          // We have shoot a ship
          this.field.shoots[row][column].status = 2;
          ship.shoots++;
          this.checkShipHit(ship);
          const isWin = this.isWin(this.field.ships);

          if (isWin) {
            this.player.win();
            // TODO: Update to click a button that will re-start the game
            this.field = this.battleService.getField();
          }

          return;
        }
      }
    }
    this.field.shoots[row][column].status = 1;
  }

  private checkShipHit(ship: Ship): void {
    if (ship.shoots !== ship.size) { return; }

    ship.isDead = true;

    // We kill the ship - update all surrounding cells with 'miss' value = 1
    let min_x = 9;
    let min_y = 9;
    let max_x = 0;
    let max_y = 0;

    for (let index = 0; index < ship.coordinates.length; index++) {
      const coordinate = ship.coordinates[index];
      const x = coordinate[0];
      const y = coordinate[1];

      if (x < min_x) {
        min_x = x;
      }
      if (x > max_x) {
        max_x = x;
      }
      if (y < min_y) {
        min_y = y;
      }
      if (y > max_y) {
        max_y = y;
      }
    }

    min_x = min_x - 1 < 0 ? 0 : min_x - 1;
    max_x = max_x + 1 > 9 ? 9 : max_x + 1;
    min_y = min_y - 1 < 0 ? 0 : min_y - 1;
    max_y = max_y + 1 > 9 ? 9 : max_y + 1;

    for (let i = min_x; i <= max_x; i++) {
      for (let j = min_y; j <= max_y; j++) {
        if (this.field.shoots[i][j].status !== 2) {
          this.field.shoots[i][j].status = 1;
        }
      }
    }
  }

  private isWin(ships: Ship[]): boolean {
    return ships.every((ship) => ship.isDead);
  }

}
