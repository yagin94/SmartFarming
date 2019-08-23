import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';

@Injectable()

export class DrugService {
  host = 'http://104.199.153.91:8080';
  constructor(private http: HttpClient) {
  }

  getDrugArticle(pageIndex: number): Observable<GetAllArticle> {
    return this.http.post<GetAllArticle>(this.host + `/article/viewArticlesByCategory/date/${pageIndex}`,
      {'category': 'thuốc bảo vệ thực vật'});
  }

  searchArticle(pageIndex: number, textSearch: string): Observable<GetAllArticle> {
    const param = {category: 'thuốc bảo vệ thực vật', textSearch};
    return this.http.post<GetAllArticle>(this.host + `/article/searchArticles/date/${pageIndex}`, param);
  }
}
