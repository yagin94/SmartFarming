import {Observable} from 'rxjs';
import {Article} from './article.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()

export class ArticleService {
  ArticleUrl = 'http://104.199.153.91:8080/article/searchArticles';
  host = 'http://104.199.153.91:8080';

  constructor(private http: HttpClient) {
  }

  /** GET articles from the server */
  getArticle(): Observable<Article[]> {
    return this.http.get<Article[]>(this.host + '/article/viewAllArticles');
  }

  /** POST: add a new article to the database */
  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.host + '/admin/addArticle', article);
  }

  /** DELETE: delete the article from the server */
  deleteArticle(id: number): Observable<{}> {
    const url = this.host + `/admin/deleteArticle/${id}`;
    return this.http.delete(url);
  }

  /** GET heroes whose name contains search term */
  searchArticle(term: string): Observable<Article[]> {
    term = term.trim();
    return this.http.get<Article[]>(`${this.ArticleUrl}/${term}`);
  }

  /** PUT: update the article on the server. Returns the updated article upon success. */
  updateArticle(id: number, article: Article): Observable<Article> {
    console.log('idddd', id);
    return this.http.put<Article>(this.host + `/admin/updateArticle/${id}`, article);
  }
}
