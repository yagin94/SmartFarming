import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Qa} from '../qa-page/qa.model';


@Injectable()
export class DataShareService {
  // messageSource = new BehaviorSubject<string>('default message');
  // currentMessage = this.messageSource.asObservable();
  //
  // constructor() {
  // }
  // changeMessage(message) {
  //   this.messageSource.next(message);
  // }
  private shareData: any;

  constructor() {

  }
  setShareData(data) {
    this.shareData = data;
  }
  // getShareData(): Observable<Qa> {
  //   return this.shareData.asObservable();
  // }

  getShareData() {
    return this.shareData;
  }
}
