import {Component, Injectable, Input, OnInit} from '@angular/core';
import {QaPageComponent} from '../qa-page.component';
import {
  AddAnsObj,
  Answers,
  AppUser,
  GetObject,
  GetObjectTopQa,
  GetObjectTopTag,
  GetObjectTopUser,
  Q,
  Qa,
  Tag,
  AddupvoteQa,
  AddupvoteAn, ReportObj, ResponseReport, GetUserRelateQa, Tags, ReportsByPageIndex
} from '../qa.model';
import {DataShareService} from '../../share-data-service/date-share-service';
import {HeaderComponent} from '../../common/header/header.component';
import {ActivatedRoute, Router} from '@angular/router';
import {QaService} from '../qa.service';
import {
  SocialService
} from 'ngx-social-button';
import {SocialUser} from 'angularx-social-login';
// import {forEach} from '@angular/router/src/utils/collection';
import {Globals} from '../../common/globalVariables';
import {NgxLoadingComponent} from 'ngx-loading';
import {delay} from 'rxjs/operators';

@Component({
  providers: [HeaderComponent, DataShareService, QaService, SocialService, Globals],
  selector: 'app-qa-page-detail',
  templateUrl: './qa-page-detail.component.html',
  styleUrls: ['./qa-page-detail.component.css']
})

export class QaPageDetailComponent implements OnInit {
  ansContent: string;
  getObjectTopTag$: GetObjectTopTag = new GetObjectTopTag();
  getObjectTopUser$: GetObjectTopUser = new GetObjectTopUser();
  getObjectTopQa$: GetObjectTopQa = new GetObjectTopQa();
  qa$: Qa = new Qa('', '', new AppUser(), null, null, '', [],0);
  topTag$: Tag[];
  topQa$: Qa[];
  editQuestion$: Qa;
  editAnswer$: Answers;
  checkEditAnswer = false;
  qaDelete$: Qa[];
  ansDelete$: Answers[];
  message: string;
  data: any;
  answer$: any;
  userName$: string;
  compare$: number;
  appUser$: AppUser = new AppUser();
  user: SocialUser = new SocialUser();
  shareObj = {
    href: '',
    hashtag: '#FACEBOOK-SHARE-HASGTAG'
  };
  checkLikeButton$ = false;
  reason: string;
  responseReport: ResponseReport;
  loading = true;
  ownerUser: any;
  getUserRelateQa$: GetUserRelateQa[];
  // arrayUser = new AppUser()[{}];
  listUserRelate$: AppUser;
  checkAdmin = '';
  index$ = 0;
  arrays = '';
  checkAnswer$ = false;

  constructor(
    private qaService: QaService,
    private dataShareService: DataShareService,
    private route: ActivatedRoute,
    private socialAuthService: SocialService,
    private router: Router,
    private globals: Globals) {
  }

  click() {
    this.loading = true;
  }

  ngOnInit() {
    this.loading = false;
    window.scroll(0, 0);
    this.route.queryParams.subscribe(params => {
      this.data = params['id'];
      this.ownerUser = params['userId'];
    });
    this.checkAdmin = JSON.parse(localStorage.getItem('currentAppUser')).role;
    this.ansContent = '';
    this.getQaDetail(this.data, this.ownerUser);
    this.getTopQa();
    this.getTopTag();
    // this.getTopUserDetail();
    this.getUserRelate(this.data);
    // this.dataShareService.currentMessage.subscribe(message => this.message = message);


  }

  abc() {
    console.log(this.globals.test);
  }

  getNumber(object: Answers) {
    if (object != null) {
      return Object.keys(object).length;
    }
  }

  getTopQa(): void {
    this.qaService.getTopQaRelate(this.data).subscribe(getObjectTopQa => {
      this.getObjectTopQa$ = getObjectTopQa;
    });
  }

  getTopTag(): void {
    this.qaService.getTopTag().subscribe(getObjectTopTag => {
      this.getObjectTopTag$ = getObjectTopTag;
    });
  }

  getUserRelate(questionId: number): void {
    this.qaService.getListUserRelate(questionId).subscribe(listUserRelate => {
      this.listUserRelate$ = listUserRelate;
      console.log('getUserRelate', this.listUserRelate$);
    });
  }

  getTopUserDetail(userId: number, i: number): void {
    // this.getUserRelateQa$.tag = new Tag[{}];
    this.qaService.getTopUserRelate(this.data, userId).subscribe(getObjectTopUser => {
      this.getUserRelateQa$ = getObjectTopUser;
      console.log('userRelate', this.getUserRelateQa$);
      var tag = document.getElementById('tagUser' + i);
      if (tag.style.display === 'none') {
        tag.style.display = 'block';
      }
      else if (tag.style.display === 'block') {
        tag.style.display = 'none';
      }
    });
  }

  checkAuthen() {
    if (JSON.parse(localStorage.getItem('currentAppUser')) == null) {
      this.compare$ = JSON.parse(localStorage.getItem('anonymousUser')).userId;
      if (this.compare$ == this.qa$.appUser.userId) {
        return true;
      }
    } else if (JSON.parse(localStorage.getItem('currentAppUser')) != null) {
      this.compare$ = JSON.parse(localStorage.getItem('currentAppUser')).userId;
      if (this.qa$.appUser != null) {
        if (this.compare$ === this.qa$.appUser.userId) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  checkAuthenAnswer(answer: Answers) {
    if (JSON.parse(localStorage.getItem('currentAppUser')) == null) {
      this.compare$ = JSON.parse(localStorage.getItem('anonymousUser')).userId;
      if (answer.appUser != null) {
        if (this.compare$ == answer.appUser.userId) {
          return true;
        } else {
          return false;
        }
      }
    } else if (JSON.parse(localStorage.getItem('currentAppUser')) != null) {
      this.compare$ = JSON.parse(localStorage.getItem('currentAppUser')).userId;
      if (answer.appUser != null) {
        if (this.compare$ === answer.appUser.userId) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  getQaDetail(questionId: number, ownerId: number): void {

    this.qaService.getQaDetail(questionId, ownerId).subscribe(qa => {
      this.qa$ = qa;

      for (let value of this.qa$.upvotedUserIds) {
        if (JSON.parse(localStorage.getItem('currentAppUser'))) {
          if (value === JSON.parse(localStorage.getItem('currentAppUser')).userId) {
            this.checkLikeButton$ = true;
          }
        } else {
          if (value === JSON.parse(localStorage.getItem('anonymousUser')).userId) {
            this.checkLikeButton$ = true;
          }
        }
      }
      this.checkAuthen();
    });
  }

  public facebookSharing(shareObj: any) {
    this.socialAuthService.facebookSharing(shareObj);
  }

  deleteQa(id: any): void {
    this.qaDelete$ = [];
    if (confirm('bạn chắc chắn muốn xóa câu hỏi này chứ')) {
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

  getQaByTag(tagId: number) {
    this.router.navigate(['./qa-page'], {queryParams: {id: tagId}});
  }

  reportQa(qa: Qa) {
    const u = new AppUser();
    if (!JSON.parse(localStorage.getItem('currentAppUser'))) {
      u.anonymous = true;
    } else {
      u.userId = JSON.parse(localStorage.getItem('currentAppUser')).userId;
    }


    const q = new Q(qa.questionId);
    const a: ReportObj = new ReportObj(u, this.reason, q);
    this.qaService.reportQa(qa.questionId, a).subscribe(onsuccess => {
      if (onsuccess != null) {
        alert('Gửi báo cáo thành công');
      } else {
        alert('Gửi báo cáo thất bại');
      }
    });
  }

  edit(qa: Qa) {
    this.editQuestion$ = qa;
    this.answer$ = qa.answers;

    this.dataShareService.setShareData(qa);
    let i = 0;
    for (const a of this.editQuestion$.tags) {
      if (i === 0) {
        this.arrays += a.name;
        i++;
        continue;
      }
      this.arrays += ',' + a.name;
      i++;
    }
    window.location.replace(`/qa-page-post?id=${qa.questionId}&userId=${qa.appUser.userId}&tag=${this.arrays}`);
  }

  editAnswer(answer: Answers) {
    this.checkEditAnswer = true;
    this.editAnswer$ = answer;
    this.ansContent = answer.content;
  }

  updateAnwer(content: string) {
    const u: AppUser = new AppUser();
    u.userId = this.editAnswer$.appUser.userId;
    const q: Q = new Q(this.qa$.questionId);
    const a: AddAnsObj = new AddAnsObj(content, u, q);
    this.qaService.updateAnswer(this.editAnswer$.answerId, a).subscribe(
      onSuccess => {
        this.getQaDetail(this.data, this.ownerUser);
        this.checkEditAnswer = false;
        this.ansContent = '';
      }
    );
    // this.getQaDetail(this.data);
  }

  navigate(qa: Qa) {
    this.editQuestion$ = qa;
    this.answer$ = qa.answers;

    this.dataShareService.setShareData(qa);
    this.router.navigate(['./qa-page-detail'], {queryParams: {id: qa.questionId, userId: qa.appUser.userId}});
    window.location.replace(`http://localhost:4200/qa-page-detail?id=${qa.questionId}&userId=${qa.appUser.userId}`);
  }

  addAnswers(ansewerContent: string): void {
    this.ansContent = ansewerContent.trim();
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
    this.qaService.addAnswer(x).subscribe(answer => {
      // this.answer$.push(answer)
      this.getQaDetail(this.data, this.ownerUser);
      this.ansContent = '';
    });
  }

  deleteAnswer(answerId: number): void {
    if (confirm('are you sure to delete this answer')) {
      // this.answer$ = this.answer$.filter(h => h !== answerId);
      this.qaService.deleteAnswer(answerId).subscribe(onSuccess => {
          alert('Xóa câu thành công!!!');
          this.getQaDetail(this.data, this.ownerUser);
        },
        onFail => {
          alert('Bạn không thể xóa câu trả lời này !!!');
        });
    }
  }

  isLoggedIn() {
    if (localStorage.getItem('currentAppUser')) {
      return true;
    }
    return false;
  }

  upvoteQuestion(questionId: number): void {
    this.checkLikeButton$ = !this.checkLikeButton$;
    if (!localStorage.getItem('currentAppUser')) {
      alert('Bạn cần đăng nhập trước');
      return;
    } else {
      const u = new AddupvoteQa(JSON.parse(localStorage.getItem('currentAppUser')).userId);
      this.qaService.upvoteQuestion(questionId, u).subscribe(question => {
        }
      );
      this.getQaDetail(this.data, this.ownerUser);
    }
  }

  upvoteAnswer(answerId: number): void {
    this.checkAnswer$ = !this.checkAnswer$;
    console.log(this.checkAnswer$);
    if (!localStorage.getItem('currentAppUser')) {
      alert('bạn cần đăng nhập trước');
      return;
    } else {
      const u = new AddupvoteAn(JSON.parse(localStorage.getItem('currentAppUser')).userId);
      this.qaService.upvoteAnswer(answerId, u).subscribe(answer => {

        }
      );
    }
    // this.getQaDetail(this.data, this.ownerUser);
  }

  checkUpvoteAnswer(answer: Answers) {
    if (!JSON.parse(localStorage.getItem('currentAppUser'))) {
      return false;
    } else {
      for (let value of answer.upvotedUserIds) {
        if (value === JSON.parse(localStorage.getItem('currentAppUser')).userId) {
          this.checkAnswer$ = true;

          return true;
          this.getQaDetail(this.data, this.ownerUser);

        }
      }
    }
    return false;
  }

  pop(answer) {
    console.log('=========================================', answer);
  }

  userDetail(userId: number) {
    this.router.navigate(['/user-detail-page'], {queryParams: {id: userId}});
  }

  userDetails() {
    this.router.navigate(['/user-detail-page'], {queryParams: {id: JSON.parse(localStorage.getItem(`currentAppUser`)).userId}});
  }

  onItemChange(value) {
    this.reason = value.target.defaultValue;
  }

  deleteQuestionByAdmin(qa: Qa) {
    if (confirm('Bạn có chắc chắn muốn xóa câu hỏi không?')) {
      this.qaService.deleteQuestion(qa.questionId).subscribe(onsucess => {
          alert('Xóa câu hỏi thành công!');
          window.location.replace('/qa-page');
        },
        failDeleteReport => {
          alert('Xóa câu hỏi  thất bại!');
        });
    }
  }

  deleteAnserByAdmin(answer: Answers) {
    if (confirm('Bạn có chắc chắn muốn xóa câu trả lời không?')) {
      this.qaService.deleteAnswerByAdmin(answer.answerId).subscribe(onsucess => {
          alert('Xóa câu trả lời thành công!');
          this.getQaDetail(this.data, this.ownerUser);
        },
        failDeleteReport => {
          alert('Xóa câu trả lời  thất bại!');
        });
    }
  }

  setIndex(index: number) {
    this.index$ = index;
  }

  getUpvoteQuestion(upvotedUserIds: number[]): number {
    console.log('upvote', upvotedUserIds);
    return Object.keys(upvotedUserIds).length;
  }

}
