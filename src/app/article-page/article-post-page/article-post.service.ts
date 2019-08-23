import {Observable} from 'rxjs';
import {AddArticle} from './article-post.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Qa} from '../../qa-page/qa.model';
import {Article} from '../article.model';


@Injectable()

export class ArticlePostService {
  host = 'http://104.199.153.91:8080';
  constructor(private http: HttpClient) {
  }
  addArticle(addArticle: AddArticle): Observable<Article> {
    return this.http.post<Article>(this.host + `/article/addArticle`, addArticle);
  }
  updateArticle(id: number, updateArticle: AddArticle): Observable<Article> {
    return this.http.put<Article>(this.host + `/article/updateArticle/${id}`, updateArticle);
  }
}
