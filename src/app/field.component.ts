import { Component, Input, OnInit } from '@angular/core';
import { Field } from './model/field';
import { BattleService } from './service/battle.service';
import { Player } from './model/player';
import { ShipType } from './model/ship-type';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: [ './field.component.css' ]
})

export class FieldComponent implements OnInit {

  @Input() player: Player;
  field: Field;

  constructor(private battleService: BattleService) { }

  ngOnInit(): void {
    this.field = this.player.field;
  }

  onCellClick(row: number, column: number): void {
    if (this.field.shoots[row][column].status === 1 ||
      this.field.shoots[row][column].status === 2) { return; }

      // TODO: Need to get hits from service response and update the this.ships in Statistic Component
      this.battleService.makeShoot(row, column).then(response => {

      switch (response.status) {
        case 'MISS':
          this.field.shoots[row][column].status = 1;
          break;

        case 'HIT':
          this.field.shoots[row][column].status = 2;
          this.hitShip(this.getShipTypeFromResponse(response.shipType));
          break;

        case 'KILL':
          this.field.shoots[row][column].status = 2;
          this.hitShip(this.getShipTypeFromResponse(response.shipType));
          this.frameKilledShip(row, column);
          break;

        case 'WIN':
          alert(`Player ${this.player.name} win!`);
          // const alert = new AlertComponent(this.player.name);
          this.player.win();
          this.field = this.player.field;
          this.battleService.restartGame();
          return;
      }
    });

    // TODO: Switch user
  }

  hitShip(shipType: ShipType): void {
    this.player.ships.find(ship => ship.type === shipType).shoots++;
  }

  getImageForStatus(status: number): string {
    const map = {
      0: '',
      1: '../assets/miss.png',
      2: '../assets/hit.png'
    };

    return map[status];
  }

  // TODO: Update this method to get response form server with ship coordinates
  private frameKilledShip(row: number, column: number): void {
    let isVertical = true;
    const shoots = this.field.shoots;

    if ((column < 9 && shoots[row][column + 1].status === 2) ||
      (column > 0 && shoots[row][column - 1].status === 2)) {
      isVertical = false;
    }

    let min_x = 9;
    let min_y = 9;
    let max_x = 0;
    let max_y = 0;

    // Get hit ship
    if (isVertical) {
      min_y = max_y = column;

      // Process top
      let status = 2;
      let indexX = row;
      while (status === 2) {
        min_x = indexX;
        indexX--;
        if (indexX < 0) { break; }
        status = this.field.shoots[indexX][column].status;
      }

      // Process bottom
      status = 2;
      indexX = row;
      while (status === 2) {
        max_x = indexX;
        indexX++;
        if (indexX > 9) { break; }
        status = this.field.shoots[indexX][column].status;
      }
    } else {

      min_x = max_x = row;

      // Process left
      let status = 2;
      let indexY = column;
      while (status === 2) {
        min_y = indexY;
        indexY--;
        if (indexY < 0) { break; }
        status = this.field.shoots[row][indexY].status;
      }

      // Process right
      status = 2;
      indexY = column;
      while (status === 2) {
        max_y = indexY;
        indexY++;
        if (indexY > 9) { break; }
        status = this.field.shoots[row][indexY].status;
      }
    }

    // Frame the ship
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

  // TODO: Make correct deserialization
  private getShipTypeFromResponse(type: string): ShipType {
    switch (type) {
      case 'CARRIER':
        return ShipType.carrier;

      case 'BATTLESHIP':
        return ShipType.battleship;

      case 'CRUISER':
        return ShipType.cruiser;

      case 'SUBMARINE':
        return ShipType.submarine;

      case 'DESTROYER':
        return ShipType.destroyer;
    }

    // TODO: throw
  }
}
