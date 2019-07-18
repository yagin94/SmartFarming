import { Observable } from 'rxjs';
import {AddAnsObj, Answers, Qa, TextSearch, GetObject, Tag} from './qa.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()

export class QaService {
  QaUrl = 'http://localhost:8080/question/searchQuestions';
  constructor(private http: HttpClient) {}
  /** GET question from the server */
  getQa(pageIndex: number): Observable<GetObject> {
    return this.http.get<GetObject>(`http://localhost:8080/question/viewQuestions/${pageIndex}`);
  }
  /** GET top 3 questions from server*/
  getTopQa(): Observable<Qa[]> {
    return this.http.get<Qa[]>(`http://localhost:8080/question/viewTop3QuestionsByViewCount`);
  }
  getTopTag(): Observable<Tag[]> {
     return this.http.get<Tag[]>(` http://localhost:8080/tag/viewTop5TagsByViewCount`);
  }
  /** GET 1 question from the server */
  getQaDetail(questionId: number): Observable<Qa> {
    return this.http.get<Qa>(`http://localhost:8080/question/viewQuestion/${questionId}`);
  }
  /** POST: add a new question to the database */
  addQa(qa: Qa): Observable<Qa> {
    return this.http.post<Qa>('http://localhost:8080/question/addQuestion', qa);
  }
  /** DELETE: delete the article from the server */
  deleteQa(id: number): Observable<{}> {
    const url = `http://localhost:8080/question/deleteQuestion/${id}`;
    return this.http.delete(url);
  }
  /** GET question whose name contains search term */
  searchQa(textSearch: string, pageIndex: number): Observable<GetObject> {
    const params = { textSearch }

    return this.http.post<GetObject>(`${this.QaUrl}/${pageIndex}`, params);
  }
  /** PUT: update the question on the server. Returns the updated article upon success. */
  updateQuestion(id: number, question: Qa): Observable<Qa> {
    console.log('idddd', id);
    return this.http.put<Qa>(`http://localhost:8080/question/updateQuestion/${id}`, question);
  }
  /** POST: add a new answer to the database */
  addAnswer(answer: AddAnsObj): Observable<Answers> {
    return this.http.post<Answers>('http://localhost:8080/answer/addAnswerToQuestion', answer);
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
