import {Observable} from 'rxjs';
import {
  AddAnsObj,
  Answers,
  Qa,
  TextSearch,
  GetObject,
  Tag,
  AppUser,
  GetObjectTopUser,
  GetObjectTopTag,
  GetObjectTopQa,
  GetObjectQaByTag,
  AddupvoteQa, ReportObj, GetUserRelateQa
} from './qa.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()

export class QaService {
  QaUrl = 'http://localhost:8080/question/searchQuestions';

  constructor(private http: HttpClient) {
  }

  /** GET question from the server */
  /** Sort by date or view count*/
  getQa(sortBy: string, pageIndex: number): Observable<GetObject> {
    return this.http.get<GetObject>(`http://localhost:8080/question/viewQuestions/${sortBy}/${pageIndex}`);
  }

  /** GET top questions,user,tag from server*/
  getTopQa(): Observable<GetObjectTopQa> {
    return this.http.get<GetObjectTopQa>(`http://localhost:8080/question/viewTop3QuestionsByViewCount`);
  }

  getTopUserRelate(questionId: number): Observable<GetUserRelateQa> {
    return this.http.get<GetUserRelateQa>(`http://localhost:8080/question/viewRelatedUsersByQuestion/${questionId}`);
  }

  getTopUser(): Observable<GetObjectTopUser> {
    return this.http.get<GetObjectTopUser>(`http://localhost:8080/userDetail/viewTop3UsersByReputation`);
  }

  getTopTag(): Observable<GetObjectTopTag> {
    return this.http.get<GetObjectTopTag>(`http://localhost:8080/tag/viewTop5TagsByViewCount`);
  }

  /** Get questions by tag*/
  getQaByTag(sortBy: string, tagId: number, pageIndex: number): Observable<GetObjectQaByTag> {
    return this.http.get<GetObjectQaByTag>(`http://localhost:8080/question/viewQuestionsByTag/${sortBy}/${tagId}/${pageIndex}`);
  }

  /** GET 1 question from the server */
  getQaDetail(questionId: number, userID: number): Observable<Qa> {
    return this.http.get<Qa>(`http://localhost:8080/question/viewQuestion/${userID}/${questionId}`);
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
  searchQa(textSearch: string, type: string, pageIndex: number): Observable<GetObject> {
    const params = {textSearch};

    return this.http.post<GetObject>(`${this.QaUrl}/${type}/${pageIndex}`, params);
  }

  reportQa(id: number, reportObj: ReportObj): Observable<{}> {
    const url = `http://localhost:8080/question/reportQuestion/${id}`;
    return this.http.post(url, reportObj);
  }

  /** PUT: update the question on the server. Returns the updated article upon success. */
  updateQuestion(id: number, question: Qa): Observable<Qa> {
    return this.http.put<Qa>(`http://localhost:8080/question/updateQuestion/${id}`, question);
  }

  upvoteQuestion(questionId: number, userId: AddupvoteQa): Observable<{}> {
    return this.http.post<{}>(`http://localhost:8080/upvote/question/${questionId}`, userId);
  }

  /** POST: add a new answer to the database */
  addAnswer(answer: AddAnsObj): Observable<Answers> {
    return this.http.post<Answers>('http://localhost:8080/answer/addAnswerToQuestion', answer);
  }

  upvoteAnswer(answerId: number, userId: AddupvoteQa): Observable<{}> {
    return this.http.post<{}>(`http://localhost:8080/upvote/answer/${answerId}`, userId);
  }

  /** PUT: update the answer on the server. Returns the updated article upon success. */
  updateAnswer(answerId: number, answer: AddAnsObj): Observable<AddAnsObj> {
    console.log('idddd', answerId);
    return this.http.put<AddAnsObj>(`http://localhost:8080/answer/updateAnswerToQuestion/${answerId}`, answer);
  }

  /** DELETE: delete the question from the server */
  deleteAnswer(answerId: number): Observable<{}> {
    const url = `http://localhost:8080/answer/deleteAnswerToQuestion/${answerId}`;
    return this.http.delete(url);
  }

  /** POST: upvote the question from the server */


  /** tinhnx*/
  getTagSuggest(text: TextSearch): Observable<GetObjectTopTag> {
    return this.http.post<GetObjectTopTag>(' http://localhost:8080/tag/searchTagsWhileTyping', text);
  }

}
