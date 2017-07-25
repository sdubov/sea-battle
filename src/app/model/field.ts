import { Cell } from './cell';

export class Field {

  shoots: Array<Array<Cell>>;

  // Initialize all cells as 'closed' by default
  constructor() {

    const shoots: Array<Array<Cell>> = [];

    for (let i = 0; i < 10; i++) {
      shoots[i] = [];
      for (let j = 0; j < 10; j++) {
        shoots[i][j] = new Cell(i, j);
      }
    }

    this.shoots = shoots;
  }

}
