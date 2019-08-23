import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GetTopArticle, GetTopQuestion, SearchText} from './home-page.model';

@Injectable()
export class HomePageService {
  host = 'http://104.199.153.91:8080';
  constructor(private http: HttpClient) {
  }

  getTopArticle(textSearch: string): Observable<GetTopArticle> {
    const params = {textSearch};
    return this.http.post<GetTopArticle>(this.host + `/article/searchArticlesOnHomePage/date/0`, params);
  }

  getTopQestion(textSearch: string): Observable<GetTopQuestion> {
    const params = {textSearch};
    return this.http.post<GetTopQuestion>(this.host + `/question/searchQuestionsOnHomePage/date/0`, params);
  }
}
