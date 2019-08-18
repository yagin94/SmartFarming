import {Component, OnInit} from '@angular/core';
import {AppUser} from '../../qa-page/qa.model';
import {GetAllQuestionOfUser, GetAllTagOfUser} from '../user-detail-page.model';
import {UserDetailPageService} from '../user-detail-page.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DataShareService} from '../../share-data-service/date-share-service';
import {HeaderComponent} from '../../common/header/header.component';
import {NgxLoadingComponent} from 'ngx-loading';
@Component({
  providers: [HeaderComponent, UserDetailPageService, DataShareService],
  selector: 'app-all-tag-user-page',
  templateUrl: './all-tag-user-page.component.html',
  styleUrls: ['./all-tag-user-page.component.css']
})
export class AllTagUserPageComponent implements OnInit {
  appUser$: AppUser;
  getAllTagOfUser$ = new GetAllTagOfUser();
  pageNumber = 0;
  data: any;
  loading = true;
  user$: AppUser;
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
    (getAllTagOfUser => this.getAllTagOfUser$ = getAllTagOfUser);
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }

  setRow(_index: number) {
    this.selectedIndex = _index;
  }
}
