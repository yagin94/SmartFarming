import {Component, OnInit} from '@angular/core';
import {Answers, AppUser, Tag} from '../../qa-page/qa.model';
import {GetAllQuestionOfUser, GetAllTagOfUser} from '../user-detail-page.model';
import {UserDetailPageService} from '../user-detail-page.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DataShareService} from '../../share-data-service/date-share-service';
import {HeaderComponent} from '../../common/header/header.component';
import {NgxLoadingComponent} from 'ngx-loading';
import {SocialUser} from 'angularx-social-login';

@Component({
  providers: [HeaderComponent, UserDetailPageService, DataShareService],
  selector: 'app-all-tag-user-page',
  templateUrl: './all-tag-user-page.component.html',
  styleUrls: ['./all-tag-user-page.component.css']
})
export class AllTagUserPageComponent implements OnInit {
  appUser$ = new AppUser();
  getAllTagOfUser$ = new GetAllTagOfUser();
  pageNumber = 0;
  data: any;
  loading = true;
  user$ = new AppUser();
  selectedIndex = 0;
  numberOfTag$ = 0;

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
    this.user$.socialUser = new SocialUser();
    this.userDetailPageService.getViewUser(this.data).subscribe(user => {
      this.user$ = user;
      this.getAllTagOfUser(this.user$.userId, this.pageNumber);
    });
    this.appUser$ = JSON.parse(localStorage.getItem('currentAppUser'));


  }

  userDetail() {
    this.router.navigate(['/user-detail-page'], {queryParams: {id: JSON.parse(localStorage.getItem(`currentAppUser`)).userId}});
  }

  getAllTagOfUser(userId: number, pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.userDetailPageService.getAllTagOfUser(userId, pageNumber).subscribe
    (getAllTagOfUser => {
      this.getAllTagOfUser$ = getAllTagOfUser;
      this.getNumberOfTag(userId, this.getAllTagOfUser$.numberOfPages);
    });
  }

  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }

  setRow(_index: number) {
    this.selectedIndex = _index;
  }

  getNumber(object: Tag) {
    return Object.keys(object).length;
  }

  getNumberOfTag(userId: number, pageNumber: number) {
    let allTag = new GetAllTagOfUser();
    let index = 0;
    this.userDetailPageService.getAllTagOfUser(userId, pageNumber - 1).subscribe
    (getAllTagOfUser => {
      allTag = getAllTagOfUser;
      console.log('allTag',allTag);
      index = this.getNumber(allTag.tagsByPageIndex);
      console.log('index', index);
      this.numberOfTag$ = (pageNumber - 1) * 10 + index;
    });

  }
}
