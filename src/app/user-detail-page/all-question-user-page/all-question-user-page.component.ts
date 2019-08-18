import {Component, OnInit} from '@angular/core';
import {GetAllQuestionOfUser} from '../user-detail-page.model';
import {HeaderComponent} from '../../common/header/header.component';
import {UserDetailPageService} from '../user-detail-page.service';
import {DataShareService} from '../../share-data-service/date-share-service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppUser, Qa} from '../../qa-page/qa.model';
import {NgxLoadingComponent} from 'ngx-loading';

@Component({
  providers: [HeaderComponent, UserDetailPageService, DataShareService],
  selector: 'app-all-question-user-page',
  templateUrl: './all-question-user-page.component.html',
  styleUrls: ['./all-question-user-page.component.css']
})
export class AllQuestionUserPageComponent implements OnInit {
  appUser$ = new AppUser();
  getAllQuestionOfUser$ = new GetAllQuestionOfUser();
  pageNumber$ = 0;
  sortBy$ = 'viewCount';
  data: any;
  loading = true;
  user$ = new AppUser();
  selectedIndex = 0;

  constructor(private userDetailPageService: UserDetailPageService,
              private route: ActivatedRoute,
              private router: Router,
              private dataShareService: DataShareService) {
  }

  click() {
    this.loading = true;
  }

  ngOnInit() {
    this.loading = false;
    this.route.queryParams.subscribe(params => this.data = params.id);
    this.userDetailPageService.getViewUser(this.data).subscribe(user => this.user$ = user);
    this.appUser$ = JSON.parse(localStorage.getItem('currentAppUser'));
    this.getAllQuestionOfUser(this.sortBy$, this.data, this.pageNumber$);
  }

  userDetail() {
    this.router.navigate(['/user-detail-page'], {queryParams: {id: JSON.parse(localStorage.getItem(`currentAppUser`)).userId}});
  }
  getAllQuestionOfUser(type: string, userId: number, pageNumber: number): void {
    this.pageNumber$ = pageNumber;
    this.userDetailPageService.getAllQuestionOfUser(type, userId, pageNumber).subscribe
    (getAllQuestionOfUser => this.getAllQuestionOfUser$ = getAllQuestionOfUser);
  }

  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }

  sortBy(sortBy: string) {
    this.sortBy$ = sortBy;
    this.getAllQuestionOfUser(this.sortBy$, this.data, this.pageNumber$);
  }

  goToQuestionDetail(qa: Qa) {
    this.router.navigate(['/qa-page-detail'], {queryParams: {id: qa.questionId, userId: qa.appUser.userId}});
  }
  setRow(_index: number) {
    this.selectedIndex = _index;
  }
}
