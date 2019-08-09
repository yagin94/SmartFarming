import {Component, OnInit} from '@angular/core';
import {GetAllQuestionOfUser} from '../user-detail-page.model';
import {HeaderComponent} from '../../common/header/header.component';
import {UserDetailPageService} from '../user-detail-page.service';
import {DataShareService} from '../../share-data-service/date-share-service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppUser} from '../../qa-page/qa.model';

@Component({
  providers: [HeaderComponent, UserDetailPageService, DataShareService],
  selector: 'app-all-question-user-page',
  templateUrl: './all-question-user-page.component.html',
  styleUrls: ['./all-question-user-page.component.css']
})
export class AllQuestionUserPageComponent implements OnInit {
  appUser$: AppUser;
  getAllQuestionOfUser$: GetAllQuestionOfUser;
  pageNumber$ = 0;
  sortBy$ = 'viewCount';
  data: any;

  constructor(private userDetailPageService: UserDetailPageService,
              private route: ActivatedRoute,
              private router: Router,
              private dataShareService: DataShareService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.data = params.id);
    this.appUser$ = JSON.parse(localStorage.getItem('currentAppUser'));
    this.getAllQuestionOfUser(this.sortBy$,this.appUser$.userId,this.pageNumber$);
  }

  getAllQuestionOfUser(type: string, userId: number, pageNumber: number): void {
    this.userDetailPageService.getAllQuestionOfUser(type, userId, pageNumber).subscribe
    (getAllQuestionOfUser => this.getAllQuestionOfUser$ = getAllQuestionOfUser);
  }

  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }

  sortByView() {
    this.sortBy$ = 'viewCount';
    this.getAllQuestionOfUser(this.sortBy$, this.appUser$.userId, this.pageNumber$);
  }

  sortByUpvote() {
    this.sortBy$ = 'upvoteCount';
    this.getAllQuestionOfUser(this.sortBy$, this.appUser$.userId, this.pageNumber$);
  }

  sortByDate() {
    this.sortBy$ = 'date';
    this.getAllQuestionOfUser(this.sortBy$, this.appUser$.userId, this.pageNumber$);
  }
}
