import { Cell } from './cell';

export class Field {

  shoots: Array<Array<Cell>>;

  // Initialize all cells as 'closed' by default
  constructor() {

    const stoots: Array<Array<Cell>> = [];

    for (let i = 0; i < 10; i++) {
      stoots[i] = [];
      for (let j = 0; j < 10; j++) {
        stoots[i][j] = new Cell(i, j);
      }
    }

    this.shoots = stoots;
  }

}
