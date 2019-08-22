import {Observable} from 'rxjs';
import {AppUser} from '../../qa-page/qa.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetNotif, Notifications} from './header.model';

@Injectable()

export class HeaderService {
  constructor(private http: HttpClient) {
  }

  getUserByIpAddres(): Observable<AppUser> {
    return this.http.get<AppUser>(`http://localhost:8080/userDetail/getUserByIpAddress`);
  }

  getNotification(userId: number, pageIndex: number): Observable<GetNotif> {
    return this.http.get<GetNotif>(`http://localhost:8080/notification/viewNotificationsByPageIndex/${userId}/${pageIndex}`);
  }

  unsubscribeNotif(noti: Notifications): Observable<Notifications> {
    return this.http.post<Notifications>(`http://localhost:8080/notification/unsubscribe`, noti);
  }

  deleteNotif(id: number): Observable<{}> {
    return this.http.delete<{}>(`http://localhost:8080/notification/delete/${id}`);
  }

  getUnseenNoti(id: number): Observable<number> {
    return this.http.get<number>(` http://localhost:8080/notification/viewNumberOfUnseenNotification/${id}`);
  }

  seenNoti(id: number): Observable<Notifications> {
    return this.http.get<Notifications>(`http://localhost:8080/notification/viewOneNotification/${id}`);

  }


  viewMoreNoti(userId: number, pageNumber: number): Observable<GetNotif> {
    return this.http.get<GetNotif>(`http://localhost:8080/notification/viewMoreNotifications/${userId}/${pageNumber}`);
  }
}


