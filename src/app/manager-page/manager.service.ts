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
  host = 'http://104.199.153.91:8080';
  constructor(private http: HttpClient) {
  }

  getReport(pageIndex: number): Observable<GetReportUser> {
    return this.http.get<GetReportUser>(this.host + `/report/findListUsersAndReportTime/${pageIndex}`);
  }

  getAllTag(type: string, pageNumber: number): Observable<GetObjectTag> {
    return this.http.get<GetObjectTag>(this.host + `/tag/findAllTags/${type}/${pageNumber}`);
  }

  getSearchTag(type: string, pageNumber: number, textSearch: string): Observable<GetObjectTag> {
    const params = {textSearch};
    return this.http.post<GetObjectTag>(this.host + `/admin/searchTagsByPageIndex/${type}/${pageNumber}`, params);
  }

  getUserByTag(tagId: number): Observable<SearchUserByTag[]> {
    return this.http.get<SearchUserByTag[]>(this.host + `/admin/searchTopUsersByTag/${tagId}`);
  }

  getAllView(): Observable<number> {
    return this.http.get<number>(this.host + `/admin/totalWebSiteViewCount`);
  }

  getAllarticle(sortBy: string, pageNumber: number): Observable<GetAllArticle> {
    return this.http.get<GetAllArticle>(this.host + `/article/viewArticles/${sortBy}/${pageNumber}`);
  }

  getAllUser(pageNumber: number): Observable<GetAllUser> {
    return this.http.get<GetAllUser>(this.host + `/userDetail/viewUsers/${pageNumber}`);
  }

  getReportDetail(userId: number, pageNumber: number): Observable<ReportUser> {
    return this.http.get<ReportUser>(this.host + `/report/findListReportsByUser/${userId}/${pageNumber}`);
  }

  getChartInfor(type: string, body: BodyJsonDrawChart): Observable<DrawChart> {
    return this.http.post<DrawChart>(this.host + `/admin/systemChartInfo/${type}`, body);
  }

  searchArticle(pageIndex: number, textSearch: string): Observable<GetAllArticle> {
    const param = {textSearch};
    return this.http.post<GetAllArticle>(this.host + `/article/searchArticles/date/${pageIndex}`, param);
  }

  searchQa(textSearch: string, type: string, pageIndex: number): Observable<GetObject> {
    const params = {textSearch};

    return this.http.post<GetObject>(this.host + `/question/searchQuestions/${type}/${pageIndex}`, params);
  }



  deleteReport(reportId: number) {
    return this.http.delete(this.host + `/admin/deleteReport/${reportId}`);
  }
}
