import { ShipType } from './ship-type';
import { Point } from './point';

export class Ship {

  type: ShipType;
  size: number;
  hits: number;
  coordinates: Point[];
  isDead: boolean;

  constructor(type: ShipType = null) {
    this.type = type;
    switch (this.type) {
      case 0: { this.size = 0; break; }
      case 1: { this.size = 2; break; }
      case 2: { this.size = 3; break; }
      case 3: { this.size = 3; break; }
      case 4: { this.size = 4; break; }
      case 5: { this.size = 5; break; }
    }
    this.hits = 0;
    this.isDead = false;
  }
}
