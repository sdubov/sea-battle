// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { JoinComponent } from './join.component';
import { GameComponent } from './game.component';
import { PlayerFieldComponent } from './player-field.component';
import { OpponentFieldComponent } from './opponent-field.component';
import { StatisticComponent } from './statistic.component';
import { ScoreComponent } from './score.component';

// Service
import { BattleService } from './service/battle.service';
import { GameService } from './service/game.service';
import { WebSocketService } from './service/web-socket.service';
import { StompService } from 'ng2-stomp-service';
import { ResponseUtil } from './utils/response-util';

// Routing
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    JoinComponent,
    GameComponent,
    PlayerFieldComponent,
    OpponentFieldComponent,
    StatisticComponent,
    ScoreComponent
  ],
  providers: [
    BattleService,
    GameService,
    WebSocketService,
    StompService,
    ResponseUtil
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
