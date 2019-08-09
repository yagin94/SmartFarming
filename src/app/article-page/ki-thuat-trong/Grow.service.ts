import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';

@Injectable()

export class GrowService {
  constructor(private http: HttpClient) {
  }

  getGrowArticle(pageIndex: number): Observable<GetAllArticle> {
    return this.http.post<GetAllArticle>(`http://localhost:8080/article/viewArticlesByCategory/date/${pageIndex}`,
      {'category': 'kỹ thuật trồng'});
  }
}


