import { Field } from './field';

export class Player {
  score: number;
  field: Field;

  constructor() {
    this.score = 0;
    this.field = new Field();
  }

  win(): void {
    this.score++;
  }
}
