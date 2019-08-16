import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';

@Injectable()

export class BugService {
  constructor(private http: HttpClient) {
  }

  getBugArticle(pageIndex: number): Observable<GetAllArticle> {
    return this.http.post<GetAllArticle>(`http://localhost:8080/article/viewArticlesByCategory/date/${pageIndex}`,
      {'category': 'sâu bệnh'});
  }
  searchArticle(pageIndex: number, textSearch: string): Observable<GetAllArticle> {
    const param = {category: 'sâu bệnh', textSearch};
    return this.http.post<GetAllArticle>(`http://localhost:8080/article/searchArticles/date/${pageIndex}`, param);
  }
}


