import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Qa} from '../../qa-page/qa.model';
import {Article} from '../article.model';
import {GetAllArticle} from './trang-chinh.model';

@Injectable()

export class TrangChinhService {
  constructor(private http: HttpClient) {
  }
  getAllArticle(pageIndex: number): Observable<GetAllArticle> {
    return this.http.get<GetAllArticle>(`http://localhost:8080/article/viewArticles/date/${pageIndex}`);
  }
  searchArticle(pageIndex: number, textSearch: string): Observable<GetAllArticle> {
    const param = {textSearch};
    return this.http.post<GetAllArticle>(`http://localhost:8080/article/searchArticles/date/${pageIndex}`, param);
  }
}
