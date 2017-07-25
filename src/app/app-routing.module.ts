import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinComponent } from './join.component';
import { GameComponent } from './game.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/join',
    pathMatch: 'full'
  },
  {
    path: 'join',
    component: JoinComponent
  },
  {
    path: 'game',
    component: GameComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
