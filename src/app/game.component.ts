import { Component, OnInit } from '@angular/core';
import { GameStatus } from './model/game-status';
import { ResponseUtil } from './utils/response-util';
import { Field } from './model/field';
import { Ship } from './model/ship';
import { ShipType } from './model/ship-type';
import { Point } from './model/point';
import { PlayerStatus } from './model/player-status';

import { BattleService } from './service/battle.service';
import { GameService } from './service/game.service';
import { WebSocketService } from './service/web-socket.service';
import { CellStatus } from './model/cell-status';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: [ './game.component.css' ]
})

export class GameComponent implements OnInit {

  details: string;
  showOpponentField: boolean;

  constructor(private gameService: GameService,
              private battleService: BattleService,
              private webSocketService: WebSocketService,
              private responseUtil: ResponseUtil) { }

  ngOnInit(): void {

    this.showOpponentField = false;
    this.details = `${this.gameService.player.name}, please set up your ships`;

    // Set up the web socket connection before joining to update the status and notify others
    this.webSocketService.connect('ws://battleship-service.us-west-2.elasticbeanstalk.com/websocket/game-status');
    this.webSocketService.getObservable().subscribe(response => this.onMessage(response));
  }

  ready(): void {

    // Reset player to clean up his field when he starts the game
    this.gameService.player.resetField();

    if (!this.validateShipsField()) {
      alert('You should set 1 carrier (5), 1 battleship (4), 1 cruiser (3), 1 submarine (3) and 1 destroyer (2)');
      return;
    }

    this.battleService.ready(this.gameService.player.id, this.gameService.player.shipsArray).then(response => {
      const gameStatus = this.responseUtil.mapGameStatus(response.gameStatus);
      this.gameService.game.status = gameStatus;

      this.gameService.game.player1Name = response.player1.name;
      this.gameService.game.player1Score = response.player1.score;

      let activeUser = response.player1;

      if (response.player2) {
        this.gameService.game.player2Name = response.player2.name;
        this.gameService.game.player2Score = response.player2.score;

        activeUser = response.player1.isActive ? response.player1 : response.player2;
      }

      this.gameService.player.status = PlayerStatus.ready;

      this.details = `>> ${activeUser.name} make a shot`;
      this.showOpponentField = true;
    });
  }

  private onMessage(value: any): void {

    const gameStatus = this.responseUtil.mapGameStatus(value.gameStatus);
    const activePlayer = value.player1.isActive ? value.player1 : value.player2;

    const opponent = this.gameService.player.id === value.player1.id ? value.player2 : value.player1;

    if (opponent) {
      this.updatePlayerShips(this.gameService.getFieldFromResponse(opponent.field));
      this.updateShipsStatistic(this.gameService.getShipsFromResponse(opponent.ships));
    }

    if (gameStatus === GameStatus.finished) {

      this.finishTheGame(value);

      alert(`${activePlayer.name} win the game`);
      this.details = `${this.gameService.player.name}, please set up your ships`;

      return;
    }

    if (!this.gameService.game.namesDefined && gameStatus === GameStatus.in_progress) {
      this.gameService.game.player1Name = value.player1.name;
      this.gameService.game.player2Name = value.player2.name;
      this.gameService.game.namesDefined = true;
    }

    this.gameService.game.status = gameStatus;
    this.details = `>> ${activePlayer.name} make a shot`;
  }

  private displayGameStatus(): string {
    const status = this.gameService.game.status;

    switch (status) {
      case 0:
        return 'NONE';

      case 1:
        return 'STARTED';

      case 2:
        return 'WAITING FOR OPPONENT';

      case 3:
        return 'SET UP';

      case 4:
        return 'GAME IN PROGRESS';

      case 5:
        return 'GAME IS BOOKED';

      case 6:
        return 'GAME IS FINISHED';
    }
  }

  private validateShipsField(): boolean {

    const ships: Ship[] = [];
    const field = this.gameService.player.ships;

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {

        if (field.shoots[x][y].status === CellStatus.miss) {
          // Do not process same ship twice
          if (ships.find(ship => ship.coordinates.find(point => point.x === x && point.y === y) != null)) {
            continue;
          }

          // Get the ship size
          let min_x = x;
          while (min_x - 1 >= 0 && field.shoots[min_x - 1][y].status === CellStatus.miss) {
            min_x--;
          }

          let min_y = y;
          while (min_y - 1 >= 0 && field.shoots[x][min_y - 1].status === CellStatus.miss) {
            min_y--;
          }

          let max_x = x;
          while (max_x + 1 <= 9 && field.shoots[max_x + 1][y].status === CellStatus.miss) {
            max_x++;
          }

          let max_y = y;
          while (max_y + 1 <= 9 && field.shoots[x][max_y + 1].status === CellStatus.miss) {
            max_y++;
          }

          let size = max_x - min_x;
          if (size === 0) {
            size = max_y - min_y;
          }

          size++;

          // Add coordinates
          const coordinates: Point[] = [];

          for (let i = min_x; i <= max_x; i++) {
            for (let j = min_y; j <= max_y; j++) {
              coordinates.push(new Point(i, j));
            }
          }

          let shipType = ShipType.none;
          if (size === 3) {
            shipType = ships.find(ship => ship.type === ShipType.submarine) ? ShipType.cruiser : ShipType.submarine;
          } else {
            shipType = this.gameService.convertSizeToShipType(size);
          }

          // Add ship
          const shipToAdd = new Ship(shipType);
          shipToAdd.coordinates = coordinates;
          ships.push(shipToAdd);
        }
      }
    }

    if (ships.length !== 5) { return false; }
    if (ships.filter(ship => ship.type === ShipType.destroyer).length !== 1) { return false; }
    if (ships.filter(ship => ship.type === ShipType.submarine).length !== 1) { return false; }
    if (ships.filter(ship => ship.type === ShipType.cruiser).length !== 1) { return false; }
    if (ships.filter(ship => ship.type === ShipType.battleship).length !== 1) { return false; }
    if (ships.filter(ship => ship.type === ShipType.carrier).length !== 1) { return false; }

    this.gameService.player.shipsArray = ships;

    return true;
  }

  private updatePlayerShips(opponentField: Field): void {
    const ships = this.gameService.player.ships;

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const cellStatus = opponentField.shoots[x][y].status;
        if (cellStatus === CellStatus.hit || cellStatus === CellStatus.miss) {
          this.gameService.player.ships.shoots[x][y].status = cellStatus;
        }
      }
    }

  }

  private updateShipsStatistic(shipStatistic: Ship[]) {
    this.gameService.player.shipStatistic = shipStatistic;
  }

  private finishTheGame(value: any): void {
    const activePlayer = value.player1.isActive ? value.player1 : value.player2;

    // Update score
    this.gameService.game.player1Score = value.player1.score;
    this.gameService.game.player2Score = value.player2.score;

    // Restart the game only once
    if (activePlayer.id === this.gameService.player.id) {
      this.battleService.restartGame();
    }

    this.gameService.player.resetShips();
  }
}
