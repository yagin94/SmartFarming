import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AddAnsObj, Answers, Qa} from '../../qa-page/qa.model';
import {Article} from '../article.model';
import {AddArticle} from '../article-post-page/article-post.model';
import {AddCommentObj} from './detail.model';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';

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
  addComment(comment: AddCommentObj): Observable<Article> {
    return this.http.post<Article>('http://localhost:8080/comment/addComment', comment);
  }
  deleteAnswer(commentId: number): Observable<{}> {
    const url = `http://localhost:8080/comment/deleteComment/${commentId}`;
    return this.http.delete(url);
  }
  getTopArticle(): Observable<GetAllArticle> {
    return this.http.get<GetAllArticle>(`http://localhost:8080/article/getTop10ArticlesByUploadDate`);
  }
}


