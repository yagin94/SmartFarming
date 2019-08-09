import {Component, OnInit} from '@angular/core';
import {AppUser} from '../../qa-page/qa.model';
import {GetAllQuestionOfUser, GetAllTagOfUser} from '../user-detail-page.model';
import {UserDetailPageService} from '../user-detail-page.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DataShareService} from '../../share-data-service/date-share-service';
import {HeaderComponent} from '../../common/header/header.component';

@Component({
  providers: [HeaderComponent, UserDetailPageService, DataShareService],
  selector: 'app-all-tag-user-page',
  templateUrl: './all-tag-user-page.component.html',
  styleUrls: ['./all-tag-user-page.component.css']
})
export class AllTagUserPageComponent implements OnInit {
  appUser$: AppUser;
  getAllTagOfUser$: GetAllTagOfUser;
  pageNumber = 0;
  data: any;

  constructor(private userDetailPageService: UserDetailPageService,
              private route: ActivatedRoute,
              private router: Router,
              private dataShareService: DataShareService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.data = params.id);
    this.appUser$ = JSON.parse(localStorage.getItem('currentAppUser'));
    console.log(this.appUser$.socialUser.firstName );
    this.getAllTagOfUser(this.appUser$.userId, this.pageNumber);

  }

  getAllTagOfUser(userId: number, pageNumber: number): void {
    this.userDetailPageService.getAllTagOfUser(userId, pageNumber).subscribe
    (getAllTagOfUser => this.getAllTagOfUser$ = getAllTagOfUser);
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }

}
