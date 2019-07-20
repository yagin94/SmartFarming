import {Component, Injectable, OnInit, Output} from '@angular/core';
import {QaService} from './qa.service';
import {AddAnsObj, Answers, Q, Qa, TextSearch, GetObject, Tag} from './qa.model';
import {SocialUser} from 'angularx-social-login';
import {HeaderComponent} from '../common/header/header.component';
import {AuthService} from 'angularx-social-login';
import {QaPageDetailComponent} from './qa-page-detail/qa-page-detail.component';
import {DataShareService} from '../share-data-service/date-share-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-qa-page',
  templateUrl: './qa-page.component.html',
  providers: [QaService, HeaderComponent, AuthService, QaPageDetailComponent, DataShareService],
  styleUrls: ['./qa-page.component.css']
})

export class QaPageComponent implements OnInit {
  getObject$: GetObject;
  qa$: Qa[];
  checkAdd$ = 0;
  checkEditAnswer$ = 0;
  checkAddAnswer$ = 0;
  editQuestion$: Qa;
  editAnswer$: Answers;
  answer$: any;
  pageIndex$ = 0;
  user: SocialUser;
  topQa$: Qa[];
  topTag$: Tag[];
  constructor(private qaService: QaService, private dataShareService: DataShareService, private router: Router) {
  }

  ngOnInit() {
    this.getObject$ = new GetObject();
    this.getQa(this.pageIndex$);
    this.getTopQa();
    this.getTopTag();
    // const authToken1 = localStorage.getItem('currentUser');
    // const authToken2 = localStorage.getItem('currentAppUser');
    // console.log('======', authToken1);
  }
  abc() {
    console.log('=============', this.getObject$.qa);
  }
  createMessage(message) {
    // this.dataShareService.changeMessage(message);
    console.log('aaa', message);
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }

  getQa(pageIndex: number): void {
    this.qaService.getQa(pageIndex).subscribe(getObject => this.getObject$ = getObject);
  }
  getTopQa(): void {
    this.qaService.getTopQa().subscribe(qa => this.topQa$ = qa);
  }
  getTopTag(): void {
    this.qaService.getTopTag().subscribe(tag => this.topTag$ = tag);
  }
  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  addQa(title, content: string): void {
    title = title.trim();
    content = content.trim();
    if (!title || !content) {
      return;
    }
    const newQa: Qa = {title, content} as Qa;
    this.qaService.addQa(newQa).subscribe(qa => this.qa$.push(qa));
  }

  deleteQa(qa: Qa): void {
    if (confirm('are you sure to delete this question')) {
      this.qa$ = this.qa$.filter(h => h !== qa);
      this.qaService.deleteQa(qa.questionId).subscribe();
    }
  }

  updateQuestion() {
    console.log('title', this.editQuestion$.title);
    if (this.editQuestion$) {
      this.qaService.updateQuestion(this.editQuestion$.questionId, this.editQuestion$).subscribe(qa => {
        const ix = qa ? this.qa$.findIndex(h => h.questionId === qa.questionId) : -1;
        if (ix > -1) {
          this.qa$[ix] = qa;
        }
      });
      // this.editArticle$ = undefined;
    }
  }

  searchQa(searchTerm: string, pageIndex: number) {
    console.log('=========================', searchTerm);
    if (searchTerm) {
      searchTerm.trim();
      this.qaService.searchQa(searchTerm, pageIndex).subscribe(getObject => {
        this.getObject$ = getObject;
      });
    }
  }

  // addAnswers(content: string): void {
  //   content = content.trim();
  //   if (!content) {
  //     return;
  //   }
  //   // const newAnswer: Answers = {content} as Answers;
  //   const q = new Q(this.editQuestion$.questionId);
  //   const x = new AddAnsObj(content, q);
  //   this.qaService.addAnswer(x).subscribe(answer => this.answer$.push(answer));
  //   console.log(this.editQuestion$);
  // }

  add() {
    this.checkAdd$ = 1;
  }

  edit(qa: Qa) {
    this.editQuestion$ = qa;
    this.answer$ = qa.answers;

    this.dataShareService.setShareData(qa);
    console.log(qa);
    this.router.navigate(['./qa-page-detail'], {queryParams: {id: qa.questionId}});
    // console.log(this.dataShareService.getShareData());
  }

  addAnswer() {
    this.checkEditAnswer$ = 3;
    this.checkAddAnswer$ = 1;
  }

  editAnswers(answer: Answers) {
    this.editAnswer$ = answer;
  }

  editAnswer() {
    this.checkEditAnswer$ = 1;
    this.checkAddAnswer$ = 3;
  }

  updateAnswer() {
    if (this.editAnswer$) {
      this.qaService.updateAnswer(this.editAnswer$.answerId, this.editAnswer$).subscribe(answer => {
        const ix = answer ? this.answer$.findIndex(h => h.id === answer.answerId) : -1;
        if (ix > -1) {
          this.answer$[ix] = answer;
        }
      });
    }
  }

  deleteAnswer(answer: Answers): void {
    if (confirm('are you sure to delete this answer')) {
      this.answer$ = this.answer$.filter(h => h !== answer);
      this.qaService.deleteAnswer(answer.answerId).subscribe();
    }
  }
}
