import { Field } from './field';
import { Ship } from './ship';
import { ShipType } from './ship-type';
import { PlayerStatus } from './player-status';

export class Player {
  id: number;
  name: string;
  status: PlayerStatus;
  field: Field;
  ships: Field;
  // Array of ships that we compose from player field and will send to server when push [Ready] button
  shipsArray: Ship[];
  shipStatistic: Ship[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.field = new Field();
    this.ships = new Field();
    this.shipsArray = [];
    this.shipStatistic = this.initializeShips();
  }

  resetShips(): void {
    this.ships = new Field();
    this.shipsArray = [];
    this.status = PlayerStatus.joined;
    this.shipStatistic = this.initializeShips();
  }

  resetField(): void {
    this.field = new Field();
    this.status = PlayerStatus.joined;
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
