import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs-compat/BehaviorSubject';
@Injectable()
export class Globals {
  questionId: number;
  loading = false;
  checkGetQa = true;
  test = 'default';
  load = new BehaviorSubject<boolean>(false);
  lo = this.load.asObservable();
  constructor() {
    this.lo.subscribe(res => this.loading = res);
  }
  changeLoading() {
    this.load.next(true);
  }
}
// npm install --save rxjs-compat

