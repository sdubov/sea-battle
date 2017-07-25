import { GameStatus } from '../model/game-status';

export class ResponseUtil {

  mapGameStatus(status: string): GameStatus {
    switch (status) {
      case 'NONE':
        return GameStatus.none;

      case 'STARTED':
        return GameStatus.started;

      case 'WAITING_FOR_OPPONENT':
        return GameStatus.waiting_for_opponent;

      case 'SET_UP':
        return GameStatus.set_up;

      case 'IN_PROGRESS':
        return GameStatus.in_progress;

      case 'BOOKED':
        return GameStatus.booked;

      case 'FINISHED':
        return GameStatus.finished;
    }
  }

}
