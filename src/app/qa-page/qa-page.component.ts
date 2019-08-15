import {Component, Injectable, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {QaService} from './qa.service';
import {
  AddAnsObj,
  Answers,
  Q,
  Qa,
  TextSearch,
  GetObject,
  Tag,
  GetObjectTopTag,
  GetObjectTopUser,
  GetObjectTopQa,
  GetObjectQaByTag
} from './qa.model';
import {SocialUser} from 'angularx-social-login';
import {HeaderComponent} from '../common/header/header.component';
import {AuthService} from 'angularx-social-login';
import {QaPageDetailComponent} from './qa-page-detail/qa-page-detail.component';
import {DataShareService} from '../share-data-service/date-share-service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxLoadingComponent} from 'ngx-loading';
import {Globals} from '../common/globalVariables';

@Component({
  selector: 'app-qa-page',
  templateUrl: './qa-page.component.html',
  providers: [QaService, HeaderComponent, AuthService, QaPageDetailComponent, DataShareService, Globals],
  styleUrls: ['./qa-page.component.css']
})

export class QaPageComponent implements OnInit {
  getObject$: GetObject;
  getObjectTopTag$: GetObjectTopTag;
  getObjectTopUser$: GetObjectTopUser;
  getObjectTopQa$: GetObjectTopQa;
  getObjectQaByTag$: GetObjectQaByTag;
  qa$: Qa[];
  checkAdd$ = 0;
  checkEditAnswer$ = 0;
  checkAddAnswer$ = 0;
  checkSearch = false;
  editQuestion$: Qa;
  editAnswer$: Answers;
  answer$: any;
  pageIndex$ = 0;
  sortBy$ = 'viewCount';
  user: SocialUser;
  topQa$: Qa[];
  topTag$: Tag[];
  checkPaging$ = 'viewAndDate';
  tagId: number;
  data: any;
  loadingPostQa = false;
  loading = true;

  constructor(private qaService: QaService, private dataShareService: DataShareService, private router: Router,
              private globals: Globals,
              private route: ActivatedRoute) {
  }

  click() {
    this.loading = true;
  }

  ngOnInit() {
    this.loading = false;
    this.getObjectTopQa$ = new GetObjectTopQa();
    this.getObject$ = new GetObject();
    this.getObjectTopTag$ = new GetObjectTopTag();
    this.getObjectTopUser$ = new GetObjectTopUser();
    this.route.queryParams.subscribe(params => this.data = params.id);
    if (this.data == null) {
      this.getQa(this.sortBy$, this.pageIndex$);
    } else {
      this.getQaByTag(this.sortBy$, this.data, this.pageIndex$);
    }

    this.getTopQa();
    this.getTopTag();
    this.getTopUser();
    // const authToken1 = localStorage.getItem('currentUser');
    // const authToken2 = localStorage.getItem('currentAppUser');
    // console.log('======', authToken1);
  }

  abc() {
    this.globals.test = 'nonono';
    console.log(this.globals.test);
  }

  createMessage(message) {
    // this.dataShareService.changeMessage(message);
    console.log('aaa', message);
  }

  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }

  /** view questions */
  getQa(sortBy: string, pageIndex: number): void {
    this.qaService.getQa(sortBy, pageIndex).subscribe(getObject => {

      this.getObject$ = getObject;
    });
  }

  getQaByTag(sortBy: string, tagId: number, pageIndex: number): void {
    this.tagId = tagId;
    this.checkPaging$ = 'tag';
    this.qaService.getQaByTag(sortBy, tagId, pageIndex).subscribe(getObjectQaByTag => this.getObject$ = getObjectQaByTag);
  }

  /**=======================================================================*/
  sortByView() {
    if (this.checkPaging$ == 'viewAndDate') {
      this.sortBy$ = 'viewCount';
      this.getQa(this.sortBy$, this.pageIndex$);
    } else if (this.checkPaging$ == 'tag') {
      this.sortBy$ = 'viewCount';
      this.getQaByTag(this.sortBy$, this.tagId, this.pageIndex$);
    }

  }

  sortByDate() {
    if (this.checkPaging$ == 'viewAndDate') {
      this.sortBy$ = 'date';
      this.getQa(this.sortBy$, this.pageIndex$);
    } else if (this.checkPaging$ == 'tag') {
      this.sortBy$ = 'date';
      this.getQaByTag(this.sortBy$, this.tagId, this.pageIndex$);
    }
  }

  /**==========================================================================================*/
  getTopQa(): void {
    this.qaService.getTopQa().subscribe(getObjectTopQa => this.getObjectTopQa$ = getObjectTopQa);
  }

  getTopTag(): void {
    this.qaService.getTopTag().subscribe(getObjectTopTag => {
      this.getObjectTopTag$ = getObjectTopTag;
      console.log('--------------------',this.getObjectTopTag$.tagsByPageIndex);
    });
  }

  getTopUser(): void {
    this.qaService.getTopUser().subscribe(getObjectTopUser => this.getObjectTopUser$ = getObjectTopUser);
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
    this.checkPaging$ = 'search';
    this.checkSearch = true;
    console.log('=========================', searchTerm);
    if (searchTerm) {
      searchTerm.trim();
      this.qaService.searchQa(searchTerm, 'date', pageIndex).subscribe(getObject => {
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
    this.router.navigate(['./qa-page-detail'], {queryParams: {id: qa.questionId, userId: qa.appUser.userId}});
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

  // updateAnswer() {
  //   if (this.editAnswer$) {
  //     this.qaService.updateAnswer(this.editAnswer$.answerId, this.editAnswer$).subscribe(answer => {
  //       const ix = answer ? this.answer$.findIndex(h => h.id === answer.answerId) : -1;
  //       if (ix > -1) {
  //         this.answer$[ix] = answer;
  //       }
  //     });
  //   }
  // }

  deleteAnswer(answer: Answers): void {
    if (confirm('are you sure to delete this answer')) {
      this.answer$ = this.answer$.filter(h => h !== answer);
      this.qaService.deleteAnswer(answer.answerId).subscribe();
    }
  }

  getNumber(object: Answers) {
    return Object.keys(object).length;
  }

  userDetail(userId: number) {
    this.router.navigate(['/user-detail-page'], {queryParams: {id: userId}});
  }
}
