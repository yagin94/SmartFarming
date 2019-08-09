import {Observable} from 'rxjs';
import {AddArticle} from './article-post.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Qa} from '../../qa-page/qa.model';
import {Article} from '../article.model';


@Injectable()

export class ArticlePostService {
  constructor(private http: HttpClient) {
  }
  addArticle(addArticle: AddArticle): Observable<Article> {
    return this.http.post<Article>('http://localhost:8080/article/addArticle', addArticle);
  }
}
