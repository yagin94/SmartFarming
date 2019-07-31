import {Component, Injectable, Input, OnInit} from '@angular/core';
import {QaPageComponent} from '../qa-page.component';
import {AddAnsObj, Answers, AppUser, GetObject, GetObjectTopQa, GetObjectTopTag, GetObjectTopUser, Q, Qa, Tag, AddupvoteQa} from '../qa.model';
import {DataShareService} from '../../share-data-service/date-share-service';
import {HeaderComponent} from '../../common/header/header.component';
import {ActivatedRoute, Router} from '@angular/router';
import {QaService} from '../qa.service';
import {
  SocialService
} from 'ngx-social-button';
import {SocialUser} from 'angularx-social-login';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  providers: [HeaderComponent, DataShareService, QaService, SocialService],
  selector: 'app-qa-page-detail',
  templateUrl: './qa-page-detail.component.html',
  styleUrls: ['./qa-page-detail.component.css']
})

export class QaPageDetailComponent implements OnInit {
  ansContent: string;
  getObjectTopTag$: GetObjectTopTag;
  getObjectTopUser$: GetObjectTopUser;
  getObjectTopQa$: GetObjectTopQa;
  qa$: Qa;
  topTag$: Tag[];
  topQa$: Qa[];
  editQuestion$: Qa;
  qaDelete$: Qa[];
  ansDelete$: Answers[];
  message: string;
  data: any;
  answer$: any;
  userName$: string;
  compare$: number;
  appUser$: AppUser;
  user: SocialUser;
  shareObj = {
    href: '',
    hashtag: '#FACEBOOK-SHARE-HASGTAG'
  };
  checkLikeButton$ = false;
  constructor(
    private qaService: QaService,
    private dataShareService: DataShareService,
    private route: ActivatedRoute,
    private socialAuthService: SocialService,
    private router: Router) {
  }

  ngOnInit() {
    this.ansContent = '';
    this.getTopQa();
    this.getTopTag();
    this.getTopUser();
    // this.dataShareService.currentMessage.subscribe(message => this.message = message);
    this.route.queryParams.subscribe(params => this.data = params.id);
    this.getQaDetail(this.data);
    // console.log(this.data);
  }

  abc(id: number) {
console.log(id);
  }

  getNumber(object: Answers) {
    return Object.keys(object).length;
  }

  getTopQa(): void {
    this.qaService.getTopQa().subscribe(getObjectTopQa => this.getObjectTopQa$ = getObjectTopQa);
  }

  getTopTag(): void {
    this.qaService.getTopTag().subscribe(getObjectTopTag => this.getObjectTopTag$ = getObjectTopTag);
  }
  getTopUser(): void {
    this.qaService.getTopUser().subscribe(getObjectTopUser => this.getObjectTopUser$ = getObjectTopUser);
  }

  checkAuthen() {
    if (JSON.parse(localStorage.getItem('currentAppUser')) == null) {
      return false;
    } else if (JSON.parse(localStorage.getItem('currentAppUser')) != null) {
      this.compare$ = JSON.parse(localStorage.getItem('currentAppUser')).userId;
      if (this.qa$.appUser != null) {
        if (this.compare$ == this.qa$.appUser.userId) {
          // console.log((localStorage.getItem('currentAppUser')).userId);
          // console.log(this.qa$.appUser.userId);
          // console.log(this.compare$);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  getQaDetail(questionId: number): void {
    this.qaService.getQaDetail(questionId).subscribe(qa => {
      this.qa$ = qa;
       console.log('===================$', this.qa$);
       console.log('******************', JSON.parse(localStorage.getItem('currentAppUser')).userId);
       for (let value of this.qa$.upvotedUserIds) {
         if (value === JSON.parse(localStorage.getItem('currentAppUser')).userId) {
            this.checkLikeButton$ = true;
         }
       }
      // console.log(this.checkAuthen());
      this.checkAuthen();
    });
  }

  public facebookSharing(shareObj: any) {
    this.socialAuthService.facebookSharing(shareObj);
  }

  deleteQa(id: any): void {
    // console.log(id);
    this.qaDelete$ = [];
    if (confirm('are you sure to delete this question')) {
      this.qaDelete$ = this.qaDelete$.filter(h => h !== id);
      this.qaService.deleteQa(id).subscribe(
        onSuccess => {
          alert('Xóa câu hỏi thành công!!!');
          window.location.replace('http://localhost:4200/qa-page');
        },
        onFail => {
          alert('Bạn không thể xóa câu hỏi này !!!');
        }
      );
    }
  }

  edit(qa: Qa) {
    this.editQuestion$ = qa;
    this.answer$ = qa.answers;

    this.dataShareService.setShareData(qa);
    // console.log(qa);
    this.router.navigate(['./qa-page-post'], {queryParams: {id: qa.questionId}});
    // console.log(this.dataShareService.getShareData());
  }
  navigate(qa: Qa) {
    this.editQuestion$ = qa;
    this.answer$ = qa.answers;

    this.dataShareService.setShareData(qa);
    // console.log(qa);
    this.router.navigate(['./qa-page-detail'], {queryParams: {id: qa.questionId}});
    // console.log(this.dataShareService.getShareData());
  }

  addAnswers(): void {
    // this.ansContent = this.ansContent.trim();
    if (!this.ansContent) {
      return;
    }
    this.appUser$ = new AppUser();
    // const newAnswer: Answers = {content} as Answers;
    if (this.isLoggedIn()) {
      this.appUser$.userId = JSON.parse(localStorage.getItem('currentAppUser')).userId;
      this.userName$ = JSON.parse(localStorage.getItem('currentUser')).name;
    } else {
      this.userName$ = 'anonymous';
      this.appUser$.anonymous = true;
    }
    const a = this.appUser$;
    const q = new Q(this.qa$.questionId);
    const x = new AddAnsObj(this.ansContent, a, q);
    console.log(x);
    this.qaService.addAnswer(x).subscribe(answer => {
      // this.answer$.push(answer)
      this.getQaDetail(this.data)
      this.ansContent = '';

    });
    // console.log(x);
  }
  deleteAnswer(answerId: number): void {
    if (confirm('are you sure to delete this answer')) {
      // this.answer$ = this.answer$.filter(h => h !== answerId);
      this.qaService.deleteAnswer(answerId).subscribe(onSuccess => {
          alert('Xóa câu thành công!!!');
          this.getQaDetail(this.data);
        },
        onFail => {
          alert('Bạn không thể xóa câu trả lời này !!!');
        });
    }
  }
  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  upvoteQuestion(questionId: number): void {
    if (!localStorage.getItem('currentAppUser')) {
      alert('bạn cần đăng nhập trước');
      return;
    } else {
      const u = new AddupvoteQa(JSON.parse(localStorage.getItem('currentAppUser')).userId);
      this.qaService.upvoteQuestion(questionId, u).subscribe(
        onSuccess => {
          alert('upvote câu hỏi thành công!!!');
          window.location.replace('http://localhost:4200/qa-page');
        },
        onFail => {
          alert('Bạn không thể upvote câu hỏi này !!!');
        }
      );
      this.checkLikeButton$ = !this.checkLikeButton$;
    }
  }
}
