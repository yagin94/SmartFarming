import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Qa} from '../../qa-page/qa.model';
import {Article} from '../article.model';
import {GetAllArticle} from './trang-chinh.model';

@Injectable()

export class TrangChinhService {
  host = 'http://104.199.153.91:8080';

  constructor(private http: HttpClient) {
  }

  getAllArticle(pageIndex: number): Observable<GetAllArticle> {
    return this.http.get<GetAllArticle>(this.host + `/article/viewArticles/date/${pageIndex}`);
  }

  searchArticle(pageIndex: number, textSearch: string): Observable<GetAllArticle> {
    const param = {textSearch};
    return this.http.post<GetAllArticle>(this.host + `/article/searchArticles/date/${pageIndex}`, param);
  }

  getArticleByTag(tagId: number, pageIndex: number): Observable<GetAllArticle> {
    return this.http.get<GetAllArticle>(this.host + `/article/viewArticlesByTag/date/${tagId}/${pageIndex}`);
  }
}
