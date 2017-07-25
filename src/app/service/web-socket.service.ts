import { Injectable } from '@angular/core';
import { StompService } from 'ng2-stomp-service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import 'stompjs';

declare let Stomp: any;

@Injectable()
export class WebSocketService {

  private socket: WebSocket;
  private stomp;
  private stompSubject: Subject<any> = new Subject<any>();

  // , handler: (frame) => {}
  connect(url: string): void {

    const self = this;
    this.socket = new WebSocket(url);
    this.stomp = Stomp.over(this.socket);

    this.stomp.connect({}, function (frame) {
      self.stomp.subscribe('/topic/game-status', function (stompResponse) {
        self.stompSubject.next(JSON.parse(stompResponse.body));
      });
    });
  }

  public getObservable(): Observable<any> {
    return this.stompSubject.asObservable();
  }

}
