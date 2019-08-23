import {Observable} from 'rxjs';
import {
  UserDetailInfor,
  GetTopTagOfUser,
  GetAllTagOfUser,
  GetTopQuestionOfUser,
  GetAllQuestionOfUser,
  GetUserDetailInfor,
  GetTotalTagsOfUser, UpLoadFile
} from './user-detail-page.model';
import {Injectable} from '@angular/core';
import {AppUser, Qa} from '../qa-page/qa.model';
import {
  HttpClient, HttpEvent, HttpEventType, HttpProgressEvent,
  HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {catchError, last, map, tap} from 'rxjs/operators';

@Injectable()
export class UserDetailPageService {
  host = 'http://104.199.153.91:8080';
  QaUrl = 'http://104.199.153.91:8080/admin/userChartInfo';

  constructor(private http: HttpClient) {
  }

  // get Top tag of a user
  getTopTagOfUser(userId: number): Observable<GetTopTagOfUser> {
    return this.http.get<GetTopTagOfUser>(this.host + `/userDetail/getTop5TagsOfUser/viewCount/${userId}`);
  }

  // get all tag of a user
  getAllTagOfUser(userId: number, pageNumber: number): Observable<GetAllTagOfUser> {
    return this.http.get<GetAllTagOfUser>(this.host + `/userDetail/getAllTagsOfUser/${userId}/${pageNumber}`);
  }

  // get top question
  getTopQuestionOfUser(sortBy: string, userID: number): Observable<GetTopQuestionOfUser> {
    return this.http.get<GetTopQuestionOfUser>(this.host + `/userDetail/getTop5QuestionsOfUser/${sortBy}/${userID}`);
  }

  // // get top question by time
  // getTopQuestionOfUserByTime(sortBy: string, pageIndex: number): Observable<GetTopQuestionOfUser> {
  //   return this.http.get<GetTopQuestionOfUser>(`http://localhost:8080/userDetail/getTop5QuestionsOfUser/${sortBy}/${pageIndex}`);
  // }
  // get all question
  getAllQuestionOfUser(type: string, userId: number, pageNumber: number): Observable<GetAllQuestionOfUser> {
    return this.http.get<GetAllQuestionOfUser>(this.host + `/userDetail/getAllQuestionsOfUser/${type}/${userId}/${pageNumber}`);
  }

  // get information of user (total information)
  getUserDetailInfor(userID: number): Observable<GetUserDetailInfor[]> {
    return this.http.get<GetUserDetailInfor[]>(this.host + `/admin/userChartInfo/${userID}`);
  }

  getTotalTagOfUser(userID: number): Observable<GetTotalTagsOfUser> {
    return this.http.get<GetTotalTagsOfUser>(this.host + `/userDetail/getTotalTagsOfUser/${userID}`);
  }

  getViewUser(userID: number): Observable<AppUser> {
    return this.http.get<AppUser>(this.host + `/userDetail/viewUser/${userID}`);
  }

  updateUser(userId: number, appuser: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(this.host + `/userDetail/editProfile/${userId}`, appuser);
  }



}
