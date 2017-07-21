import { Field } from './field';
import { Ship } from './ship';
import { ShipType } from './ship-type';

export class Player {
  name: string;
  score: number;
  field: Field;
  ships: Ship[];

  constructor(name: string) {
    this.name = name;
    this.score = 0;
    this.field = new Field();
    this.ships = this.initializeShips();
  }

  win(): void {
    this.score++;
    this.field = new Field();
    this.ships = this.initializeShips();
  }

  initializeShips(): Ship[] {

    return [
      new Ship(ShipType.carrier),
      new Ship(ShipType.battleship),
      new Ship(ShipType.cruiser),
      new Ship(ShipType.submarine),
      new Ship(ShipType.destroyer) ];
  }
}
