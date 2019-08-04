import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class Globals {
  questionId: number;
  loading = false;
  checkGetQa = true;
  test = 'default';
  load: BehaviorSubject<boolean>;
  constructor() {
    this.load = new BehaviorSubject(this.loading);
  }
}
