import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';

@Injectable()

export class DungService {
  host = 'http://104.199.153.91:8080';
  constructor(private http: HttpClient) {
  }

  getDungArticle(pageIndex: number): Observable<GetAllArticle> {
    return this.http.post<GetAllArticle>(this.host + `/article/viewArticlesByCategory/date/${pageIndex}`,
      {'category': 'phân bón'});
  }
  searchArticle(pageIndex: number, textSearch: string): Observable<GetAllArticle> {
    const param = {category: 'phân bón', textSearch};
    return this.http.post<GetAllArticle>(this.host + `/article/searchArticles/date/${pageIndex}`, param);
  }
}


