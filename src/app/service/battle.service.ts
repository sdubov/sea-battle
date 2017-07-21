import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BattleService {

  private battleUrl = 'http://localhost:8080/';

  constructor(
    private http: Http
  ) { }

  startGame(): Promise<string> {

    return this.http
      .get(this.battleUrl)
      .toPromise()
      .then(resp => resp.json().status as string)
      .catch(this.handleError);
  }

  makeShoot(x: number, y: number): Promise<any> {

    return this.http
      .get(`${this.battleUrl}shoot?x=${x}&y=${y}`)
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

  restartGame(): Promise<void> {
    return this.http
      .get(`${this.battleUrl}restart`)
      .toPromise()
      .then(resp => resp.json().status as string)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
