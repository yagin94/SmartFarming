import {Component, Injectable, Input, OnInit} from '@angular/core';
import {QaPageComponent} from '../qa-page.component';
import {AddAnsObj, Answers, AppUser, Q, Qa, Tag} from '../qa.model';
import {DataShareService} from '../../share-data-service/date-share-service';
import {HeaderComponent} from '../../common/header/header.component';
import {ActivatedRoute, Router} from '@angular/router';
import {QaService} from '../qa.service';
import {
  SocialService
} from 'ngx-social-button';

@Component({
  providers: [HeaderComponent, DataShareService, QaService, SocialService],
  selector: 'app-qa-page-detail',
  templateUrl: './qa-page-detail.component.html',
  styleUrls: ['./qa-page-detail.component.css']
})

export class QaPageDetailComponent implements OnInit {
  qa$: Qa;
  topTag$: Tag[];
  topQa$: Qa[];
  editQuestion$: Qa;
  qaDelete$: Qa[];
  message: string;
  data: any;
  answer$: any;
  userName$: string;
  compare$: number;
  appUser$: AppUser;
  shareObj = {
    href: 'http://www.tinthethao.com.vn/chuyen-nhuong-17-07-vu-maguire-gay-soc-mu-giat-tan-binh-thu-3-dinh-doat-bom-tan-180-trieu-d535229.html',
    hashtag: '#FACEBOOK-SHARE-HASGTAG'
  };

  constructor(
    private qaService: QaService,
    private dataShareService: DataShareService,
    private route: ActivatedRoute,
    private socialAuthService: SocialService,
    private router: Router) {
  }

  ngOnInit() {
    this.getTopQa();
    this.getTopTag();
    // this.dataShareService.currentMessage.subscribe(message => this.message = message);
    //STILL ERROR HERE!!!!
    this.route.queryParams.subscribe(params => this.data = params.id);
    this.getQaDetail(this.data);
    this.checkAuthen();
    // console.log(this.qa$.appUser.userId);
  }

  abc() {
    // const a = this.dataShareService.getShareData();
    // let b: any;
    //  console.log(this.dataShareService.getShareData());

    // console.log(this.qa$.appUser.userId);
    // console.log(this.checkAuthen());
    // console.log(JSON.parse(localStorage.getItem('currentAppUser')).userId);
    // console.log(this.compare$);
    // console.log(this.qa$.appUser);
    console.log(this.qa$);
  }
  getNumber(object: Answers) {
    return Object.keys(object).length;
  }
  getTopQa(): void {
    this.qaService.getTopQa().subscribe(qa => this.topQa$ = qa);
  }
  getTopTag(): void {
    this.qaService.getTopTag().subscribe(tag => this.topTag$ = tag);
  }
  checkAuthen() {
    if (JSON.parse(localStorage.getItem('currentAppUser')) == null) {
      return false;
    } else if (JSON.parse(localStorage.getItem('currentAppUser')) != null) {
      this.compare$ = JSON.parse(localStorage.getItem('currentAppUser')).userId;
      if (this.qa$.appUser != null) {
        if (this.compare$ = this.qa$.appUser.userId) {
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
    this.qaService.getQaDetail(questionId).subscribe(qa => this.qa$ = qa);
  }

  public facebookSharing(shareObj: any) {
    this.socialAuthService.facebookSharing(shareObj);
  }

  deleteQa(id: any): void {
    console.log(id);
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
    console.log(qa);
     this.router.navigate(['./qa-page-post'], {queryParams: {id: qa.questionId}});
    // console.log(this.dataShareService.getShareData());
  }
  addAnswers(content: string): void {
    content = content.trim();
    if (!content) {
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
    const x = new AddAnsObj(content, a, q);
    this.qaService.addAnswer(x).subscribe(answer => this.answer$.push(answer));
    console.log(x);
  }
  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }
}
