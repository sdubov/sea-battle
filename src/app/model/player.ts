import { Field } from './field';
import { Ship } from './ship';
import { ShipType } from './ship-type';

export class Player {
  id: number;
  name: string;
  field: Field;
  ships: Ship[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.field = new Field();
    this.ships = this.initializeShips();
  }

  resetPlayer(): void {
    this.field = new Field();
    this.ships = this.initializeShips();
  }

  private initializeShips(): Ship[] {
    return [
      new Ship(ShipType.carrier),
      new Ship(ShipType.battleship),
      new Ship(ShipType.cruiser),
      new Ship(ShipType.submarine),
      new Ship(ShipType.destroyer) ];
  }
}
