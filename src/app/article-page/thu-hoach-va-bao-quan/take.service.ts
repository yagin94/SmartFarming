import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';

@Injectable()

export class TakeService {
  constructor(private http: HttpClient) {
  }

  getTakeArticle(pageIndex: number): Observable<GetAllArticle> {
    return this.http.post<GetAllArticle>(`http://localhost:8080/article/viewArticlesByCategory/date/${pageIndex}`,
      {'category': 'thu hoạch bảo quản'});
  }
  searchArticle(pageIndex: number, textSearch: string): Observable<GetAllArticle> {
    const param = {category: 'thu hoạch và bảo quản', textSearch};
    return this.http.post<GetAllArticle>(`http://localhost:8080/article/searchArticles/date/${pageIndex}`, param);
  }
}
