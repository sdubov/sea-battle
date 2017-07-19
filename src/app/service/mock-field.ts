import { Field } from '../model/field';
import { Ship } from '../model/ship';
import { ShipType } from '../model/ship-type';
import { Cell } from '../model/cell';

export class MockField {

  ships: Ship[];
  shoots: Array<Array<Cell>>;

  constructor() {
    this.ships = [
      new Ship(ShipType.carrier,    [[2, 9], [3, 9], [4, 9], [5, 9], [6, 9]]),
      new Ship(ShipType.battleship, [[5, 2], [5, 3], [5, 4], [5, 5]]),
      new Ship(ShipType.cruiser,    [[8, 1], [8, 2], [8, 3]]),
      new Ship(ShipType.submarine,  [[3, 0], [3, 1], [3, 2]]),
      new Ship(ShipType.destroyer,  [[0, 0], [1, 0]])
    ];

    let sts: Array<Array<Cell>> = [];

    for (let i = 0; i < 10; i++) {
      sts[i] = [];
      for (let j = 0; j < 10; j++) {
        sts[i][j] = new Cell(i, j);
      }
    }

    this.shoots = sts;
  }

  get(): Field {
    return new Field(this.ships, this.shoots);
  }
}
