import { ShipType } from './ship-type';

export class Ship {

  type: ShipType;
  size: number;
  shoots: number;
  isDead: boolean;

  constructor(type: ShipType) {
    this.type = type;
    switch (this.type) {
      case 0: { this.size = 2; break; }
      case 1: { this.size = 3; break; }
      case 2: { this.size = 3; break; }
      case 3: { this.size = 4; break; }
      case 4: { this.size = 5; break; }
    }
    this.shoots = 0;
    this.isDead = false;
  }
}
