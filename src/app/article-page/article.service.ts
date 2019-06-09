import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Article} from './article.model';
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()

export class ArticleService {
  ArticleUrl = 'http://localhost:8080/article/viewAllArticles';
  constructor(private http: HttpClient) {}

  /** GET articles from the server */
  getArticle(): Observable<Article[]> {
    return this.http.get<Article[]>('http://localhost:8080/article/viewAllArticles');
  }
  /** DELETE: delete the article from the server */
  deleteArticle(id: number): Observable<{}> {
    const url = 'http://localhost:8080/admin/deleteArticle/${id}';
    return this.http.delete(url);
  }
  /** GET heroes whose name contains search term */
  searchArticle(term: string): Observable<Article[]> {
    term = term.trim();
    const options = term ?
      {params: new HttpParams().set('title', term)} : {};
    return this.http.get<Article[]>(this.ArticleUrl, options);
  }
}
