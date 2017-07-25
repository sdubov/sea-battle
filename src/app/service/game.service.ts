import { Injectable } from '@angular/core';
import { Game } from '../model/game';
import { Player } from '../model/player';
import { ShipType } from '../model/ship-type';
import { Field } from '../model/field';
import { CellStatus } from '../model/cell-status';
import { Ship } from '../model/ship';

@Injectable()
export class GameService {

  game: Game;
  player: Player;

  public getFieldFromResponse(responseField: any): Field {

    const field = new Field();

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        field.shoots[i][j].status = this.mapCellStatus(responseField.shoots[i][j].status);
      }
    }

    return field;
  }

  public getShipsFromResponse(responseShips: any): Ship[] {
    const ships: Ship[] = [];

    responseShips.forEach(ship => {
      const shipToAdd = new Ship(this.mapShipType(ship.type));
      shipToAdd.hits = ship.hits;
      ships.push(shipToAdd);
    });

    return ships;
  }

  public convertSizeToShipType(size: number): ShipType {
    switch (size) {
      case 2:
        return ShipType.destroyer;

      case 3:
        // Default value
        return ShipType.submarine;

      case 4:
        return ShipType.battleship;

      case 5:
        return ShipType.carrier;
    }
  }

  public convertShipTypeToSize(type: ShipType): number {
    switch (type) {
      case ShipType.none:
        return 0;

      case ShipType.destroyer:
        return 2;

      case ShipType.submarine:
      case ShipType.cruiser:
        return 3;

      case ShipType.battleship:
        return 4;

      case ShipType.carrier:
        return 5;
    }
  }

  private mapCellStatus(status: string): CellStatus {
    switch (status) {
      case 'CLOSED':
        return CellStatus.closed;

      case 'MISS':
        return CellStatus.miss;

      case 'HIT':
        return CellStatus.hit;
    }
  }

  // Map ship type string from response to ShipType object
  private mapShipType(type: string): ShipType {
    switch (type) {
      case 'CARRIER':
        return ShipType.carrier;

      case 'BATTLESHIP':
        return ShipType.battleship;

      case 'CRUISER':
        return ShipType.cruiser;

      case 'SUBMARINE':
        return ShipType.submarine;

      case 'DESTROYER':
        return ShipType.destroyer;
    }
  }
}
