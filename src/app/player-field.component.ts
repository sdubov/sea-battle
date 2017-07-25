import { Component } from '@angular/core';
import { GameService } from './service/game.service';
import { CellStatus } from './model/cell-status';
import { GameStatus } from './model/game-status';

@Component({
  selector: 'app-player-field',
  templateUrl: './player-field.component.html',
  styleUrls: [ './player-field.component.css' ]
})

export class PlayerFieldComponent {

  constructor(public gameService: GameService) { }

  setupShip(x: number, y: number): void {

    // User can only setup ships on initialization phase
    const gameStatus = this.gameService.game.status;
    if (gameStatus !== GameStatus.waiting_for_opponent && gameStatus !== GameStatus.set_up) { return; }

    const cells = this.gameService.player.ships.shoots;

    // Don't allow to set ship that border with other ships
    if (x - 1 >= 0 && y - 1 >= 0 && cells[x - 1][y - 1].status !== CellStatus.closed) { return; }
    if (x - 1 >= 0 && y + 1 <= 9 && cells[x - 1][y + 1].status !== CellStatus.closed) { return; }
    if (x + 1 <= 9 && y - 1 >= 0 && cells[x + 1][y - 1].status !== CellStatus.closed) { return; }
    if (x + 1 <= 9 && y + 1 <= 9 && cells[x + 1][y + 1].status !== CellStatus.closed) { return; }

    // Validation against ship size.
    let min_x = x;
    while (min_x - 1 >= 0 && cells[min_x - 1][y].status === CellStatus.miss) {
      min_x--;
    }

    let min_y = y;
    while (min_y - 1 >= 0 && cells[x][min_y - 1].status === CellStatus.miss) {
      min_y--;
    }

    let max_x = x;
    while (max_x + 1 <= 9 && cells[max_x + 1][y].status === CellStatus.miss) {
      max_x++;
    }

    let max_y = y;
    while (max_y + 1 <= 9 && cells[x][max_y + 1].status === CellStatus.miss) {
      max_y++;
    }

    let size = max_x - min_x;
    if (size === 0) {
      size = max_y - min_y;
    }

    // Index is 0-based. Get the right initial size by increment
    let sizeOriginal = size;
    if (sizeOriginal + 1 > 5) { return; }

    const selectedCell = cells[x][y];

    let sizeNew = sizeOriginal;
    let cellStatus = CellStatus.closed;

    switch (selectedCell.status) {
      case CellStatus.closed:
        sizeNew++;
        cellStatus = CellStatus.miss;
        break;

      case CellStatus.miss:
        sizeOriginal++;
        cellStatus = CellStatus.closed;
        break;
    }

    // Update the cell on the field
    selectedCell.status = cellStatus;
  }

  private getImageForStatus(status: number): string {
    const map = {
      0: '',
      1: '../assets/miss.png',
      2: '../assets/hit.png',
      3: '../assets/miss_small.png'
    };

    return map[status];
  }
}
