// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

// Components
import { AppComponent } from './app.component';
import { GameComponent } from './game.component';
import { FieldComponent } from './field.component';
import { StatisticComponent } from './statistic.component';
import { ScoreComponent } from './score.component';

// Web API
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './service/in-memory-data.service';

// Service
import { BattleService } from './service/battle.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  declarations: [
    AppComponent,
    GameComponent,
    FieldComponent,
    StatisticComponent,
    ScoreComponent,
  ],
  providers: [ BattleService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
