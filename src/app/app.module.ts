// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { GameComponent } from './game.component';
import { FieldComponent } from './field.component';
import { StatisticComponent } from './statistic.component';
import { ScoreComponent } from './score.component';

// Service
import { BattleService } from './service/battle.service';
import { WebSocketService } from './service/web-socket.service';
import { StompService } from 'ng2-stomp-service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    GameComponent,
    FieldComponent,
    StatisticComponent,
    ScoreComponent
  ],
  providers: [
    BattleService,
    WebSocketService,
    StompService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
