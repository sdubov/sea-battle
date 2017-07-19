import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Field } from '../model/field';
import { MockField } from './mock-field';

@Injectable()
export class BattleService {

  private battleUrl = 'api/battle';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: Http
  ) { }

  getField(): Field {
    // return this.http.get(this.battleUrl)
    //   .toPromise()
    //   .then(response => response.json().data as string)
    //   .catch(BattleService.handleError);
    return new MockField().get();
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
