import { Ship } from './ship';
import { Cell } from './cell';

export class Field {

  ships: Ship[];
  shoots: Array<Array<Cell>>;

  constructor(ships: Ship[], shoots: Array<Array<Cell>>) {
    this.ships = ships;
    this.shoots = shoots;
  }

}
