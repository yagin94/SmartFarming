import {Component, OnInit} from '@angular/core';
import * as CanvasJS from '../../app/manager-page/http_canvasjs.com_assets_script_canvasjs.min';
import {AppUser} from '../qa-page/qa.model';
import {ChartData, GetTotalTagsOfUser, GetUserDetailInfor, UpLoadFile, UserDetailInfor} from './user-detail-page.model';
import {HeaderComponent} from '../common/header/header.component';
import {UserDetailPageService} from './user-detail-page.service';
import {DataShareService} from '../share-data-service/date-share-service';
import {ActivatedRoute, Router} from '@angular/router';
import {GetAllQuestionOfUser, GetAllTagOfUser, GetTopQuestionOfUser, GetTopTagOfUser} from './user-detail-page.model';
import {forEach} from '@angular/router/src/utils/collection';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  providers: [HeaderComponent, UserDetailPageService, DataShareService, FormBuilder],
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
  getUserDeatilInfor$: any;
  getTotalTagOfUser$: any;
  totalQuestionOfuser$ = 0;
  totalAnswerOfUser$ = 0;
  totalTagsOfUser$ = 0;
  totalScore$ = 0;
  sortBy$ = 'viewCount';
  pageIndex$ = 0;
  change$ = false;
  nameUserInput: string;
  emailUser: string;
  linkCV: string;
  srcImg: string;
  isFlatEdit = false;

  uploadForm: FormGroup;
  upLoadFile: UpLoadFile;
  check = false;
  nameCV = '';

  init() {
    // this.drawChart();

  }

  constructor(private userDetailPageService: UserDetailPageService,
              private route: ActivatedRoute,
              private router: Router,
              private dataShareService: DataShareService,
              private httpClient: HttpClient,
              private formBuilder: FormBuilder) {
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
    // this.appUserGG$ = JSON.parse(localStorage.getItem('currentAppUser'));
    this.getViewUser(this.data);
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
    if (this.linkCV == null) {
      this.check = true;
    }
  }

  /** getUserDetail TinhNX*/

  getViewUser(userId: number): void {
    this.userDetailPageService.getViewUser(userId).subscribe(
      appUser => {
        this.appUser$ = appUser;
        this.appUserGG$ = appUser;
        this.nameUserInput = appUser.socialUser.name;
        this.linkCV = appUser.cvUrl;
        this.emailUser = appUser.socialUser.email;
        this.srcImg = appUser.socialUser.photoUrl;
        this.appUser$ = appUser;
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
      if (this.getUserDeatilInfor$ != null) {
        let totalQues = 0;
        let totalAns = 0;
        this.getUserDeatilInfor$.forEach(item => {
          totalQues += parseInt(item.numberOfQuestion);
          totalAns += parseInt(item.numberOfAnswer);
          dataQa.push({label: item.date, y: item.numberOfQuestion});
          dataAnser.push({label: item.date, y: item.totalQuestionViewCount});
        });
        this.totalQuestionOfuser$ = totalQues;
        this.totalAnswerOfUser$ = totalAns;
        this.drawChart(dataQa, dataAnser, dataTag);
      }
    });

  }

  getTopTagOfUser(): void {
    this.userDetailPageService.getTopTagOfUser(this.appUser$.userId).subscribe(getTopTagOfUser => {
      this.getTopTagOfUser$ = getTopTagOfUser;
      console.log(this.getTopTagOfUser$);
    });
  }


  getTopQuestionOfUser(sortBy: string, userId: number): void {
    this.userDetailPageService.getTopQuestionOfUser(sortBy, userId).subscribe
    (getTopQuestionOfUser => this.getTopQuestionOfUser$ = getTopQuestionOfUser);
  }

  sortBy(sortBy: string) {
    this.sortBy$ = sortBy;
    this.getTopQuestionOfUser(this.sortBy$, this.appUserGG$.userId);
  }

  updateUser() {
    this.isFlatEdit = true;
  }

  saveUserInfo() {

    this.isFlatEdit = false;
    this.appUserGG$.socialUser.name = this.nameUserInput;
    this.appUserGG$.socialUser.email = this.emailUser;
    if (this.upLoadFile != null) {
      this.appUserGG$.cvUrl = this.upLoadFile.uploadedFileUrlShownOnUI;
      this.linkCV = this.upLoadFile.uploadedFileUrlShownOnUI;
    }
    console.log(this.appUserGG$);

    this.userDetailPageService.updateUser(this.appUserGG$.userId, this.appUserGG$).subscribe(onSuccess => {
        if (onSuccess.socialUser.name === this.nameUserInput) {
          alert('Cập nhật thành công');
        }

      },
      onFail => {
        alert('Cập nhật thất bại');
      });
  }

  onPicked(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
      this.nameCV = this.uploadForm.get('profile').value.name;
    }

    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);

    this.httpClient.post<any>('http://localhost:8080/file/uploadFile', formData).subscribe(
      (res) => {
        this.upLoadFile = res;
        console.log(this.upLoadFile);
      },
      (err) => console.log(err)
    );

  }

}
