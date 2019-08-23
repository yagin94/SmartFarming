import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AddAnsObj, Answers, Qa} from '../../qa-page/qa.model';
import {Article, Comments} from '../article.model';
import {AddArticle} from '../article-post-page/article-post.model';
import {AddCommentObj} from './detail.model';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';

@Injectable()

export class ArticleDetailService {
  host = 'http://104.199.153.91:8080';
  constructor(private http: HttpClient) {
  }

  getDetail(userId: number, articleId: number): Observable<Article> {
    return this.http.get<Article>(this.host + `/article/viewArticle/${userId}/${articleId}`);
  }

  getDistinct() {
    return this.http.get(this.host + `/article/viewDistinctCategories`);
  }

  deleteArticle(articleId: number): Observable<{}> {
    const url = this.host + `/article/deleteArticle/${articleId}`;
    return this.http.delete(url);
  }

  addComment(comment: AddCommentObj): Observable<Article> {
    return this.http.post<Article>(this.host + `/comment/addComment`, comment);
  }

  updateComment(commentId: number, comment: AddCommentObj): Observable<Comments> {
    return this.http.put<Comments>(this.host + `/comment/updateComment/${commentId}`, comment);
  }

  deleteAnswer(commentId: number): Observable<{}> {
    const url = this.host + `/admin/deleteComment/${commentId}`;
    return this.http.delete(url);
  }

  getTopArticle(articleId): Observable<GetAllArticle> {
    return this.http.get<GetAllArticle>(this.host + `/article/viewRelatedArticles/${articleId}`);
  }
  adminDeleteAnswer(commentId: number): Observable<{}> {
    const url = this.host + `/admin/deleteComment/${commentId}`;
    return this.http.delete(url);
  }
}


