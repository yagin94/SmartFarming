import {Observable} from 'rxjs';
import {
  AppUser,
  GetObject,
  ReportsByPageIndex
} from '../qa-page/qa.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetObjectReport, GetObjectTag, TextSearch} from './manager.model';


@Injectable()

export class ManagerService {
  constructor(private http: HttpClient) {
  }

  getReport(pageIndex: number): Observable<GetObjectReport> {
    return this.http.get<GetObjectReport>(`http://localhost:8080/admin/viewReportsByPageIndex/${pageIndex}`);
  }

  getAllTag(type: string, pageNumber: number): Observable<GetObjectTag> {
    return this.http.get<GetObjectTag>(`http://localhost:8080/tag/findAllTags/${type}/${pageNumber}`);
  }

  getSearchTag(type: string, pageNumber: number, textSearch: string): Observable<GetObjectTag> {
    const params = {textSearch};
    return this.http.post<GetObjectTag>(`http://localhost:8080/admin/searchTagsByPageIndex/${type}/${pageNumber}`, params);
  }

  getUserByTag(tagId: number): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(`http://localhost:8080/admin/searchTopUsersByTag/${tagId}`);
  }

  getAllView(): Observable<number> {
    return this.http.get<number>(`http://localhost:8080/admin/totalWebSiteViewCount`);
  }
}
