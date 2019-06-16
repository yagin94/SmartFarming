import { Observable } from 'rxjs';
import {AddAnsObj, Answers, Qa} from './qa.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()

export class QaService {
  QaUrl = 'http://localhost:8080/forum/searchQuestions';
  constructor(private http: HttpClient) {}
  /** GET question from the server */
  getQa(): Observable<Qa[]> {
    return this.http.get<Qa[]>('http://localhost:8080/forum/viewAllQuestions');
  }
  /** POST: add a new article to the database */
  addQa(qa: Qa): Observable<Qa> {
    return this.http.post<Qa>('http://localhost:8080/user/addQuestion', qa);
  }
  /** DELETE: delete the article from the server */
  deleteQa(id: number): Observable<{}> {
    const url = `http://localhost:8080/user/deleteQuestion/${id}`;
    return this.http.delete(url);
  }
  /** GET question whose name contains search term */
  searchQa(term: string): Observable<Qa[]> {
    term = term.trim();
    return this.http.get<Qa[]>(`${this.QaUrl}/${term}`);
  }
  /** PUT: update the question on the server. Returns the updated article upon success. */
  updateQuestion(id: number, question: Qa): Observable<Qa> {
    console.log('idddd', id);
    return this.http.put<Qa>(`http://localhost:8080/user/updateQuestion/${id}`, question);
  }
  /** POST: add a new answer to the database */
  addAnswer(answer: AddAnsObj): Observable<Answers> {
    return this.http.post<Answers>('http://localhost:8080/user/addAnswer', answer);
  }
  /** PUT: update the answer on the server. Returns the updated article upon success. */
  updateAnswer(id: number, answer: Answers): Observable<Answers> {
    console.log('idddd', id);
    return this.http.put<Answers>(`http://localhost:8080/user/updateAnswer/${id}`, answer);
  }
  deleteAnswer(id: number): Observable<{}> {
  const url = `http://localhost:8080/user/deleteAnswer/${id}`;
  return this.http.delete(url);
}
}
