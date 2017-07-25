import { Component } from '@angular/core';
import { BattleService } from './service/battle.service';
import { ShipType } from './model/ship-type';
import { CellStatus } from './model/cell-status';
import { Field } from './model/field';
import { GameService } from './service/game.service';
import { GameStatus } from './model/game-status';

@Component({
  selector: 'app-opponent-field',
  templateUrl: './opponent-field.component.html',
  styleUrls: [ './opponent-field.component.css' ]
})

export class OpponentFieldComponent {

  constructor(private gameService: GameService,
              private battleService: BattleService) {
  }

  onCellClick(row: number, column: number): void {

    // Game should be "in progress" to make shoots
    if (this.gameService.game.status !== GameStatus.in_progress) { return; }

    // We should not process the same cell twice. User should choose different cell.
    const shoots = this.gameService.player.field.shoots;
    if (shoots[row][column].status === CellStatus.miss || shoots[row][column].status === CellStatus.hit) { return; }

    // Process a player's shoot
    this.battleService.makeShoot(this.gameService.player.id, row, column).then(response => {
      if (this.gameService.game.status !== GameStatus.in_progress) { return; }

      this.gameService.player.field = this.gameService.getFieldFromResponse(response.field);
    });
  }

  // Update a player's statistic for hit ship
  hitShip(shipType: ShipType): void {
    this.gameService.player.shipStatistic.find(ship => ship.type === shipType).hits++;
  }

  getImageForStatus(status: number): string {
    const map = {
      0: '',
      1: '../assets/miss.png',
      2: '../assets/hit.png'
    };

    return map[status];
  }

  private getField(): Field {
    return this.gameService.player.field;
  }

  // Method display client field from server response
  private displayField(field: any): void {
    for (const row of field.shoots) {
      for (const cell of row) {

        const x = cell.point.x;
        const y = cell.point.y;

        switch (cell.status) {
          case 'CLOSED':
            this.gameService.player.field.shoots[x][y].status = CellStatus.closed;
            break;
          case 'MISS':
            this.gameService.player.field.shoots[x][y].status = CellStatus.miss;
            break;
          case 'HIT':
            this.gameService.player.field.shoots[x][y].status = CellStatus.hit;
            break;
        }
      }
    }
  }

  // Frame a killed ship with miss cells (ships cannot border each other)
  private frameKilledShip(row: number, column: number): void {
    let isVertical = true;
    const shoots = this.gameService.player.field.shoots;

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
        if (--indexX < 0) { break; }
        status = this.gameService.player.field.shoots[indexX][column].status;
      }

      // Process bottom
      status = CellStatus.hit;
      indexX = row;
      while (status === CellStatus.hit) {
        max_x = indexX;
        if (++indexX > 9) { break; }
        status = this.gameService.player.field.shoots[indexX][column].status;
      }
    } else {

      min_x = max_x = row;

      // Process left
      let status = CellStatus.hit;
      let indexY = column;
      while (status === CellStatus.hit) {
        min_y = indexY;
        if (--indexY < 0) { break; }
        status = this.gameService.player.field.shoots[row][indexY].status;
      }

      // Process right
      status = CellStatus.hit;
      indexY = column;
      while (status === CellStatus.hit) {
        max_y = indexY;
        if (++indexY > 9) { break; }
        status = this.gameService.player.field.shoots[row][indexY].status;
      }
    }

    // Frame the ship
    min_x = min_x - 1 < 0 ? 0 : min_x - 1;
    max_x = max_x + 1 > 9 ? 9 : max_x + 1;
    min_y = min_y - 1 < 0 ? 0 : min_y - 1;
    max_y = max_y + 1 > 9 ? 9 : max_y + 1;

    for (let i = min_x; i <= max_x; i++) {
      for (let j = min_y; j <= max_y; j++) {
        if (this.gameService.player.field.shoots[i][j].status !== CellStatus.hit) {
          this.gameService.player.field.shoots[i][j].status = CellStatus.miss;
        }
      }
    }
  }
}

