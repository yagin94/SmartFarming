import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';

@Injectable()

export class DungService {
  constructor(private http: HttpClient) {
  }

  getDungArticle(pageIndex: number): Observable<GetAllArticle> {
    return this.http.post<GetAllArticle>(`http://localhost:8080/article/viewArticlesByCategory/date/${pageIndex}`,
      {'category': 'phân bón'});
  }
  searchArticle(pageIndex: number, textSearch: string): Observable<GetAllArticle> {
    const param = {category: 'phân bón', textSearch};
    return this.http.post<GetAllArticle>(`http://localhost:8080/article/searchArticles/date/${pageIndex}`, param);
  }
}


