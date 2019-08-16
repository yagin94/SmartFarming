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
  constructor(private http: HttpClient) {
  }

  getDetail(userId: number, articleId: number): Observable<Article> {
    return this.http.get<Article>(`http://localhost:8080/article/viewArticle/${userId}/${articleId}`);
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

  updateComment(commentId: number, comment: AddCommentObj): Observable<Comments> {
    return this.http.put<Comments>(`http://localhost:8080/comment/updateComment/${commentId}`, comment);
  }

  deleteAnswer(commentId: number): Observable<{}> {
    const url = `http://localhost:8080/admin/deleteComment/${commentId}`;
    return this.http.delete(url);
  }

  getTopArticle(articleId): Observable<GetAllArticle> {
    return this.http.get<GetAllArticle>(`http://localhost:8080/article/viewRelatedArticles/${articleId}`);
  }
  adminDeleteAnswer(commentId: number): Observable<{}> {
    const url = ` http://localhost:8080/admin/deleteComment/${commentId}`;
    return this.http.delete(url);
  }
}


