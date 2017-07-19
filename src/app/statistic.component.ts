import {Component, Input, OnInit, Output } from '@angular/core';
import { Ship } from './model/ship';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: [ './statistic.component.css' ]
})

export class StatisticComponent {

  @Input() ships: Ship[];

}
