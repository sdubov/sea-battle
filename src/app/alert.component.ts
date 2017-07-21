import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: [ './alert.component.css' ]
})

export class AlertComponent {

  name: string;

  // constructor(name: string) {
  //   this.name = name;
  // }

  onCloseWinDialog(): void {
    // TODO: Restart the game
  }

  show(): void {
  }

}
