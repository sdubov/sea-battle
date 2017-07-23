import { Component, Input, OnInit } from '@angular/core';
import { BattleService } from './service/battle.service';
import { Player } from './model/player';
import { ShipType } from './model/ship-type';
import { CellStatus } from './model/cell-status';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: [ './field.component.css' ]
})

export class FieldComponent implements OnInit {

  @Input() player: Player;

  constructor(private battleService: BattleService) { }

  ngOnInit(): void {
  }

  onCellClick(row: number, column: number): void {

    // We should not process the same cell twice. User should choose different cell.
    if (this.player.field.shoots[row][column].status === CellStatus.miss ||
      this.player.field.shoots[row][column].status === CellStatus.hit) { return; }

    // Process a player's shoot
    this.battleService.makeShoot(this.player.id, row, column).then(response => {

      switch (response.shootStatus) {
        case 'MISS':
          this.player.field.shoots[row][column].status = CellStatus.miss;
          break;

        case 'HIT':
          this.player.field.shoots[row][column].status = CellStatus.hit;
          this.hitShip(this.getShipTypeFromResponse(response.shipType));
          break;

        case 'KILL':
          this.player.field.shoots[row][column].status = CellStatus.hit;
          this.hitShip(this.getShipTypeFromResponse(response.shipType));
          this.frameKilledShip(row, column);
          break;
      }
    });
  }

  // Update a player's statistic for hit ship
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

  // Frame a killed ship with miss cells (ships cannot border each other)
  private frameKilledShip(row: number, column: number): void {
    let isVertical = true;
    const shoots = this.player.field.shoots;

    if ((column < 9 && shoots[row][column + 1].status === CellStatus.hit) ||
      (column > 0 && shoots[row][column - 1].status === CellStatus.hit)) {
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
      let status = CellStatus.hit;
      let indexX = row;
      while (status === CellStatus.hit) {
        min_x = indexX;
        indexX--;
        if (indexX < 0) { break; }
        status = this.player.field.shoots[indexX][column].status;
      }

      // Process bottom
      status = CellStatus.hit;
      indexX = row;
      while (status === CellStatus.hit) {
        max_x = indexX;
        indexX++;
        if (indexX > 9) { break; }
        status = this.player.field.shoots[indexX][column].status;
      }
    } else {

      min_x = max_x = row;

      // Process left
      let status = CellStatus.hit;
      let indexY = column;
      while (status === CellStatus.hit) {
        min_y = indexY;
        indexY--;
        if (indexY < 0) { break; }
        status = this.player.field.shoots[row][indexY].status;
      }

      // Process right
      status = CellStatus.hit;
      indexY = column;
      while (status === CellStatus.hit) {
        max_y = indexY;
        indexY++;
        if (indexY > 9) { break; }
        status = this.player.field.shoots[row][indexY].status;
      }
    }

    // Frame the ship
    min_x = min_x - 1 < 0 ? 0 : min_x - 1;
    max_x = max_x + 1 > 9 ? 9 : max_x + 1;
    min_y = min_y - 1 < 0 ? 0 : min_y - 1;
    max_y = max_y + 1 > 9 ? 9 : max_y + 1;

    for (let i = min_x; i <= max_x; i++) {
      for (let j = min_y; j <= max_y; j++) {
        if (this.player.field.shoots[i][j].status !== CellStatus.hit) {
          this.player.field.shoots[i][j].status = CellStatus.miss;
        }
      }
    }
  }

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
  }
}
