import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
@Injectable()
export class Globals {
  questionId: number;
  loading = false;
  checkGetQa = true;
  test = 'default';
  load: BehaviorSubject<boolean>;

  constructor() {
    this.load = new BehaviorSubject<boolean>(false);
    // const lo = this.load.asObservable();
    // lo.subscribe(res => this.loading = res);
  }
  changeLoading() {
    this.load.next(true);
  }
}
// npm install --save rxjs-compat

