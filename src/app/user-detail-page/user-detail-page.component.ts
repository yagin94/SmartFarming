import {Component, OnInit} from '@angular/core';
import * as CanvasJS from '../../app/manager-page/http_canvasjs.com_assets_script_canvasjs.min';
import {AppUser} from '../qa-page/qa.model';
import {ChartData, GetTotalTagsOfUser, GetUserDetailInfor, UserDetailInfor} from './user-detail-page.model';
import {HeaderComponent} from '../common/header/header.component';
import {UserDetailPageService} from './user-detail-page.service';
import {DataShareService} from '../share-data-service/date-share-service';
import {ActivatedRoute, Router} from '@angular/router';
import {GetAllQuestionOfUser, GetAllTagOfUser, GetTopQuestionOfUser, GetTopTagOfUser} from './user-detail-page.model';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  providers: [HeaderComponent, UserDetailPageService, DataShareService],
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.css']
})
export class UserDetailPageComponent implements OnInit {
  appUserGG$: AppUser;
  appUser$ = new AppUser();
  userDetail$: UserDetailInfor;
  data: any;
  getTopTagOfUser$: GetTopTagOfUser;

  getTopQuestionOfUser$: GetTopQuestionOfUser;

  getUserDeatilInfor$: GetUserDetailInfor;
  getTotalTagOfUser$: GetTotalTagsOfUser;
  totalQuestionOfuser$ = 0;
  totalAnswerOfUser$ = 0;
  totalTagsOfUser$ = 0;
  totalScore$ = 0;
  sortBy$ = 'viewCount';
  pageIndex$ = 0;
  change$ = false;

  init() {
    // this.drawChart();

  }

  constructor(private userDetailPageService: UserDetailPageService,
              private route: ActivatedRoute,
              private router: Router,
              private dataShareService: DataShareService) {
  }

  drawChart(dataChart1: any, dataChart2, dataChart3) {
    var chart = new CanvasJS.Chart('chartContainerUser', {
      theme: 'light1', // "light2", "dark1", "dark2"
      animationEnabled: true, // change to true
      zoomEnable: true,
      title: {
        text: 'Thông số tài khoản',
        fontFamily: 'Times New Roman',
      },
      data: [
        {
          // Change type to "bar", "area", "spline", "pie",etc.
          type: 'column',
          name: 'Câu hỏi',
          showInLegend: true,
          dataPoints: dataChart1
        },
        {
          // Change type to "bar", "area", "spline", "pie",etc.
          type: 'line',
          name: 'Lượt xem',
          showInLegend: true,
          dataPoints: dataChart2
        },

      ]
    });
    chart.render();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.data = params.id);
    this.init();
    this.appUserGG$ = JSON.parse(localStorage.getItem('currentAppUser'));
    this.getViewUser(this.appUserGG$.userId);

  }

  /** getUserDetail TinhNX*/

  getViewUser(userId: number): void {
    this.userDetailPageService.getViewUser(this.appUserGG$.userId).subscribe(
      appUser => {
        this.appUser$ = appUser;
        console.log(this.appUser$);
        this.totalScore$ = this.appUser$.reputation;
        this.getUserDetail();
        this.getTopTagOfUser();

        this.getTopQuestionOfUser(this.sortBy$, this.appUser$.userId);

        this.getTotalTagOfUser(this.appUser$.userId);
      });
  }

  getTotalTagOfUser(userId: number): void {
    this.userDetailPageService.getTotalTagOfUser(userId).subscribe(
      getAllTagOfUser => {
        this.getTotalTagOfUser$ = getAllTagOfUser;
      });
  }

  getUserDetail(): void {
    let dataQa = [];
    let dataTag = [];
    let dataAnser = [];

    this.userDetailPageService.getUserDetailInfor(this.appUser$.userId).subscribe(userDetail => {
      this.getUserDeatilInfor$ = userDetail;
      if (userDetail != null) {
        // userDetail.forEach(item => {
        //   this.totalQuestionOfuser$ += item.numberOfQuestion;
        //   this.totalAnswerOfUser$ += item.numberOfAnswer;
        //   // this.totalTagsOfUser$ += item.numberOfTag;
        //   dataQa.push({label: item.date, y: item.numberOfQuestion});
        //   dataAnser.push({label: item.date, y: item.totalQuestionViewCount});
        // });
        this.drawChart(dataQa, dataAnser, dataTag);
      }

    });

  }

  getTopTagOfUser(): void {
    this.userDetailPageService.getTopTagOfUser(this.appUser$.userId).subscribe(getTopTagOfUser => {
      this.getTopTagOfUser$ = getTopTagOfUser;
    });
  }


  getTopQuestionOfUser(sortBy: string, userId: number): void {
    this.userDetailPageService.getTopQuestionOfUser(sortBy, userId).subscribe
    (getTopQuestionOfUser => this.getTopQuestionOfUser$ = getTopQuestionOfUser);
  }

  sortBy(sortBy: string) {
    this.sortBy$ = sortBy;
    console.log(this.sortBy$);
    console.log(this.appUserGG$.userId);
    this.getTopQuestionOfUser(this.sortBy$, this.appUserGG$.userId);
  }

  updateUser() {
    this.change$ = true;
  }

  reUpdateUser() {
    this.change$ = false;
  }

  saveUserInfo(name: string, email: string, link: string) {
    this.appUserGG$.socialUser.firstName = name;
    this.appUserGG$.socialUser.email = email;
    this.appUserGG$.cvUrl = link;
    console.log(name);
    this.userDetailPageService.updateUser(this.appUserGG$.userId, this.appUserGG$);
    this.getViewUser(this.appUserGG$.userId);
  }
}
