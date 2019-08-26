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
  AddupvoteQa, ReportObj, GetUserRelateQa, UserRelate
} from './qa.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()

export class QaService {
  host = 'http://35.194.197.13:8080';

  constructor(private http: HttpClient) {
  }

  /** GET question from the server */
  /** Sort by date or view count*/
  getQa(sortBy: string, pageIndex: number): Observable<GetObject> {
    return this.http.get<GetObject>(this.host + `/question/viewQuestions/${sortBy}/${pageIndex}`);
  }

  /** GET top questions,user,tag from server*/
  getTopQa(): Observable<GetObjectTopQa> {
    return this.http.get<GetObjectTopQa>(this.host + `/question/viewTop3QuestionsByViewCount`);
  }

  getTopQaRelate(questionId: number): Observable<GetObjectTopQa> {
    return this.http.get<GetObjectTopQa>(this.host + `/question/viewRelatedQuestions/${questionId}`);
  }

  getTopUserRelate(questionId: number, userId: number): Observable<GetUserRelateQa[]> {
    return this.http.get<GetUserRelateQa[]>(this.host + `/question/viewDetailRelatedUser/${questionId}/${userId}`);
  }

  getListUserRelate(questionId: number): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(this.host + `/question/viewRelatedUsersByQuestion/${questionId}`);
  }

  getTopUser(): Observable<GetObjectTopUser> {
    return this.http.get<GetObjectTopUser>(this.host + `/userDetail/viewTop3UsersByReputation`);
  }

  getTopTag(): Observable<GetObjectTopTag> {
    return this.http.get<GetObjectTopTag>(this.host + `/tag/viewTop5TagsByViewCount`);
  }

  /** Get questions by tag*/
  getQaByTag(sortBy: string, tagId: number, pageIndex: number): Observable<GetObjectQaByTag> {
    return this.http.get<GetObjectQaByTag>(this.host + `/question/viewQuestionsByTag/${sortBy}/${tagId}/${pageIndex}`);
  }

  /** GET 1 question from the server */
  getQaDetail(questionId: number, userID: number): Observable<Qa> {
    return this.http.get<Qa>(this.host + `/question/viewQuestion/${userID}/${questionId}`);
  }

  /** POST: add a new question to the database */
  addQa(qa: Qa): Observable<Qa> {
    return this.http.post<Qa>(this.host + '/question/addQuestion', qa);
  }

  /** DELETE: delete the article from the server */
  deleteQa(id: number): Observable<{}> {
    const url = this.host + `/question/deleteQuestion/${id}`;
    return this.http.delete(url);
  }

  /** GET question whose name contains search term */
  searchQa(textSearch: string, type: string, pageIndex: number): Observable<GetObject> {
    const params = {textSearch};

    return this.http.post<GetObject>(this.host + '/question/searchQuestions/' + `${type}/${pageIndex}`, params);
  }

  reportQa(id: number, reportObj: ReportObj): Observable<{}> {
    const url = this.host + `/question/reportQuestion/${id}`;
    return this.http.post(url, reportObj);
  }

  /** PUT: update the question on the server. Returns the updated article upon success. */
  updateQuestion(id: number, question: Qa): Observable<Qa> {
    return this.http.put<Qa>(this.host + `/question/updateQuestion/${id}`, question);
  }

  upvoteQuestion(questionId: number, userId: AddupvoteQa): Observable<{}> {
    return this.http.post<{}>(this.host + `/upvote/question/${questionId}`, userId);
  }

  /** POST: add a new answer to the database */
  addAnswer(answer: AddAnsObj): Observable<Answers> {
    return this.http.post<Answers>(this.host + '/answer/addAnswerToQuestion', answer);
  }

  upvoteAnswer(answerId: number, userId: AddupvoteQa): Observable<{}> {
    return this.http.post<{}>(this.host + `/upvote/answer/${answerId}`, userId);
  }

  /** PUT: update the answer on the server. Returns the updated article upon success. */
  updateAnswer(answerId: number, answer: AddAnsObj): Observable<AddAnsObj> {
    console.log('idddd', answerId);
    return this.http.put<AddAnsObj>(this.host + `/answer/updateAnswerToQuestion/${answerId}`, answer);
  }

  /** DELETE: delete the question from the server */
  deleteAnswer(answerId: number): Observable<{}> {
    const url = this.host + `/answer/deleteAnswerToQuestion/${answerId}`;
    return this.http.delete(url);
  }

  /** POST: upvote the question from the server */


  /** tinhnx*/
  getTagSuggest(text: TextSearch): Observable<GetObjectTopTag> {
    return this.http.post<GetObjectTopTag>(this.host + '/tag/searchTagsWhileTyping', text);
  }

  deleteQuestion(questionId: number) {
    return this.http.delete(this.host + `/admin/deleteQuestion/${questionId}`);
  }

  deleteAnswerByAdmin(answerId: number) {
    return this.http.delete(this.host + `/admin/deleteAnswerToQuestion/${answerId}`);
  }

  getTagById(tagId: number): Observable<Tag> {
    return this.http.get<Tag>(this.host + `/tag/findTagById/${tagId}`);
  }

  getAllInforUserRelate(questionId: number): Observable<UserRelate> {
    return this.http.get<UserRelate>(this.host + `/question/viewRelatedUsersByQuestion/${questionId}`);
  }
}
