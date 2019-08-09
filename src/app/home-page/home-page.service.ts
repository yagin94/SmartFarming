import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GetTopArticle, GetTopQuestion, SearchText} from './home-page.model';

@Injectable()
export class HomePageService {
  constructor(private http: HttpClient) {
  }

  getTopArticle(textSearch: string): Observable<GetTopArticle> {
    const params = {textSearch};
    return this.http.post<GetTopArticle>(`http://localhost:8080/article/searchArticlesOnHomePage/date/0`, params);
  }

  getTopQestion(textSearch: string): Observable<GetTopQuestion> {
    const params = {textSearch};
    return this.http.post<GetTopQuestion>(`http://localhost:8080/question/searchQuestionsOnHomePage/date/0`, params);
  }
}
