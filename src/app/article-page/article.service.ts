import { Observable} from 'rxjs';
import {Article} from './article.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()

export class ArticleService {
  ArticleUrl = 'http://localhost:8080/article/searchArticles';
  constructor(private http: HttpClient) {}

  /** GET articles from the server */
  getArticle(): Observable<Article[]> {
    return this.http.get<Article[]>('http://localhost:8080/article/viewAllArticles');
  }
  /** POST: add a new article to the database */
  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>('http://localhost:8080/admin/addArticle', article);
  }
  /** DELETE: delete the article from the server */
  deleteArticle(id: number): Observable<{}> {
    const url = `http://localhost:8080/admin/deleteArticle/${id}`;
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
    return this.http.put<Article>(`http://localhost:8080/admin/updateArticle/${id}`, article);
  }
}
