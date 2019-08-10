import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Qa} from '../../qa-page/qa.model';
import {Article} from '../article.model';
import {AddArticle} from '../article-post-page/article-post.model';

@Injectable()

export class ArticleDetailService {
  constructor(private http: HttpClient) {
  }
  getDetail(articleId: number): Observable<Article> {
    return this.http.get<Article>(`http://localhost:8080/article/viewArticle/${articleId}`);
  }
  getDistinct() {
    return this.http.get(` http://localhost:8080/article/viewDistinctCategories`);
  }
  deleteArticle(articleId: number): Observable<{}> {
    const url = `http://localhost:8080/article/deleteArticle/${articleId}`;
    return this.http.delete(url);
  }
}


