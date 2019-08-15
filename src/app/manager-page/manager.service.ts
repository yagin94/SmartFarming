import {Observable} from 'rxjs';
import {
  AppUser,
  GetObject,
  ReportsByPageIndex, ReportUser, SearchUserByTag
} from '../qa-page/qa.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  BodyJsonDrawChart,
  DrawChart,
  GetAllArticle,
  GetAllUser,
  GetObjectReport,
  GetObjectTag,
  GetReportUser,
  TextSearch
} from './manager.model';


@Injectable()

export class ManagerService {
  constructor(private http: HttpClient) {
  }

  getReport(pageIndex: number): Observable<GetReportUser> {
    return this.http.get<GetReportUser>(`http://localhost:8080/report/findListUsersAndReportTime/${pageIndex}`);
  }

  getAllTag(type: string, pageNumber: number): Observable<GetObjectTag> {
    return this.http.get<GetObjectTag>(`http://localhost:8080/tag/findAllTags/${type}/${pageNumber}`);
  }

  getSearchTag(type: string, pageNumber: number, textSearch: string): Observable<GetObjectTag> {
    const params = {textSearch};
    return this.http.post<GetObjectTag>(`http://localhost:8080/admin/searchTagsByPageIndex/${type}/${pageNumber}`, params);
  }

  getUserByTag(tagId: number): Observable<SearchUserByTag[]> {
    return this.http.get<SearchUserByTag[]>(`http://localhost:8080/admin/searchTopUsersByTag/${tagId}`);
  }

  getAllView(): Observable<number> {
    return this.http.get<number>(`http://localhost:8080/admin/totalWebSiteViewCount`);
  }

  getAllarticle(pageNumber: number): Observable<GetAllArticle> {
    return this.http.get<GetAllArticle>(`http://localhost:8080/article/viewArticles/date/${pageNumber}`);
  }

  getAllUser(pageNumber: number): Observable<GetAllUser> {
    return this.http.get<GetAllUser>(`http://localhost:8080/userDetail/viewUsers/${pageNumber}`);
  }

  getReportDetail(userId: number, pageNumber: number): Observable<ReportUser> {
    return this.http.get<ReportUser>(`http://localhost:8080/report/findListReportsByUser/${userId}/${pageNumber}`);
  }

  getChartInfor(type: string, body: BodyJsonDrawChart): Observable<DrawChart> {
    return this.http.post<DrawChart>(`http://localhost:8080/admin/systemChartInfo/${type}`, body);
  }

  searchArticle(pageIndex: number, textSearch: string): Observable<GetAllArticle> {
    const param = {textSearch};
    return this.http.post<GetAllArticle>(`http://localhost:8080/article/searchArticles/date/${pageIndex}`, param);
  }
}
