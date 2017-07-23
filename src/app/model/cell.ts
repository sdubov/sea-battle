import { CellStatus } from './cell-status';

export class Cell {
  x: number;
  y: number;
  status: CellStatus;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.status = CellStatus.closed;
  }
}
