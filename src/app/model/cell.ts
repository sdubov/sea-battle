export class Cell {
  x: number;
  y: number;
  // 0 - closed, 1 - miss, 2 - hit
  status: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.status = 0;
  }
}
