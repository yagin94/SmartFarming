import {Observable} from 'rxjs';
import {AppUser} from '../../qa-page/qa.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetNotif, Notifications} from './header.model';

@Injectable()

export class HeaderService {
  host = 'http://104.199.153.91:8080';


  constructor(private http: HttpClient) {
  }

  getUserByIpAddres(): Observable<AppUser> {
    return this.http.get<AppUser>(this.host + `/userDetail/getUserByIpAddress`);
  }

  getNotification(userId: number, pageIndex: number): Observable<GetNotif> {
    return this.http.get<GetNotif>(this.host + `/notification/viewNotificationsByPageIndex/${userId}/${pageIndex}`);
  }

  unsubscribeNotif(noti: Notifications): Observable<Notifications> {
    return this.http.post<Notifications>(this.host + `/notification/unsubscribe`, noti);
  }

  deleteNotif(id: number): Observable<{}> {
    return this.http.delete<{}>(this.host + `/notification/delete/${id}`);
  }

  getUnseenNoti(id: number): Observable<number> {
    return this.http.get<number>(this.host + `/notification/viewNumberOfUnseenNotification/${id}`);
  }

  seenNoti(id: number): Observable<Notifications> {
    return this.http.get<Notifications>(this.host + `/notification/viewOneNotification/${id}`);

  }


  viewMoreNoti(userId: number, pageNumber: number): Observable<GetNotif> {
    return this.http.get<GetNotif>(this.host + `/notification/viewMoreNotifications/${userId}/${pageNumber}`);
  }
}


