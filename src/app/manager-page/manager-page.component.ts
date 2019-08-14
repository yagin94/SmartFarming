import {Component, OnInit} from '@angular/core';
import * as CanvasJS from '../../assets/layout/scripts/canvasjs.min.js';
import {Answers, AppUser, GetObject, Qa, ReportsByPageIndex, SearchUserByTag} from '../qa-page/qa.model';
import {QaService} from '../qa-page/qa.service';
import {HeaderComponent} from '../common/header/header.component';
import {AuthService} from 'angularx-social-login';
import {QaPageDetailComponent} from '../qa-page/qa-page-detail/qa-page-detail.component';
import {DataShareService} from '../share-data-service/date-share-service';
import {Globals} from '../common/globalVariables';
import {ManagerService} from './manager.service';
import {BodyJsonDrawChart, DrawChart, GetAllArticle, GetAllUser, GetObjectReport, GetObjectTag, GetReportUser} from './manager.model';
import {Router} from '@angular/router';
import {Article} from '../article-page/article.model';
import {TrangChinhService} from '../article-page/trang-chinh/trang-chinh.service';
import {NgxLoadingComponent} from 'ngx-loading';

@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css'],
  providers: [QaService, HeaderComponent, AuthService, QaPageDetailComponent, DataShareService, Globals, ManagerService]
})

export class ManagerPageComponent implements OnInit {
  loading = true;
  getObject$: GetObject;
  getReport$: ReportsByPageIndex;
  getObjectReport$: GetObjectReport;
  getObjectTag$: GetObjectTag;
  getUserByTag$: SearchUserByTag[];
  reportDetail = false;
  tagDetail = false;
  tagUserDetail = false;
  pageIndex$ = 0;
  pageIndexArticle$ = 0;
  pageIndexAllUser$ = 0;
  sortBy$ = 'viewCount';
  sortTagBy$ = 'viewCount';
  allView$: number;
  getAllarticle$: GetAllArticle;
  getAllUser$: GetAllUser;
  getReportUser$: GetReportUser;
  classifyChart = 'date';
  jsonReport: any;
  pageIndexArticleSearch$ = 0;
  getArticle$: any;
  /**=====================*/
  isFlatShowView = false;
  isFlatShowUser = false;
  isFlatShowReport = false;
  isFlatShowArticle = false;
  isFlatShowtags = false;
  isFlatShowQuestion = false;
  isFlatShowAllUser = false;
  checkSearch = false;


  init() {
    this.loading = false;
    this.getObjectReport$ = new GetObjectReport();
    this.getReport$ = new ReportsByPageIndex();
    this.getObject$ = new GetObject();
    this.getObjectTag$ = new GetObjectTag();
    this.getAllarticle$ = new GetAllArticle();
    this.getAllUser$ = new GetAllUser();
    this.getReportUser$ = new GetReportUser();
    this.getArticle$ = new GetAllArticle();
    this.allView$ = 0;
    this.getAllView();
    this.getAllTag(this.sortTagBy$, this.pageIndex$);
    this.getQa(this.sortBy$, this.pageIndex$);
    this.getReport(this.pageIndex$);
    this.getAllarticle(this.pageIndexArticle$);
    this.getAllUser(this.pageIndexAllUser$);
  }

  constructor(private qaService: QaService,
              private managerService: ManagerService,
              private router: Router) {
  }
  click() {
    this.loading = true;
  }
  getAllView() {
    this.managerService.getAllView().subscribe(allView => this.allView$ = allView);
  }

  /**
   * ===========================Question Manager=============================================
   */
  getQa(sortBy: string, pageIndex: number): void {
    this.qaService.getQa(sortBy, pageIndex).subscribe(getObject => {

      this.getObject$ = getObject;
      console.log(this.getObject$.qa);
    });
  }

  sortBy(value: string) {
    this.sortBy$ = value;
    console.log(value);
    this.getQa(this.sortBy$, this.pageIndex$);
  }

  /**=======================article manager=====================================*/
  // getArticle(sortBy: string, pageIndex: number): void {
  //   this.qaService.getQa(sortBy, pageIndex).subscribe(getObject => {
  //
  //     this.getObject$ = getObject;
  //     console.log(this.getObject$.qa);
  //   });
  // }

  sortArticleBy(value: string) {
    this.sortBy$ = value;
    console.log(value);
    this.getQa(this.sortBy$, this.pageIndex$);
  }

  /**=======================tag manager=========================================*/
  getAllTag(sortBy: string, pageIndex: number): void {
    this.managerService.getAllTag(sortBy, pageIndex).subscribe(getObject => {

      this.getObjectTag$ = getObject;
      console.log(this.getObject$);
    });
  }

  getSearchTag(pageIndex: number, textSearch: string) {
    if (textSearch) {
      this.isFlatShowAllUser = false;
      this.tagDetail = true;
      this.tagUserDetail = false;
      this.managerService.getSearchTag('upvoteCount', pageIndex, textSearch).subscribe(object =>
        this.getObjectTag$ = object);
    }
  }

  getUserByTag(tagId: number) {
    console.log('id', tagId);
    this.tagUserDetail = true;
    this.isFlatShowAllUser = false;
    this.managerService.getUserByTag(tagId).subscribe(object => {
      this.getUserByTag$ = object;
      console.log('tinhnx', this.getUserByTag$);
    });
  }

  sortTagBy(value: string) {
    this.sortTagBy$ = value;
    console.log(value);
    this.getAllTag(this.sortBy$, this.pageIndex$);
  }

  /**=======================getReport============================================*/
  getReport(pageIndex: number) {
    this.managerService.getReport(pageIndex).subscribe(getObject => {
      this.getReportUser$ = getObject;
    });
  }

  getReportDetail(report: number) {
    console.log('click', report);
    this.reportDetail = true;
    this.managerService.getReportDetail(report).subscribe(reportDetailuser => {
      this.getReport$ = reportDetailuser;
      console.log('detail', this.getReport$);
    });
  }

  /**======================other common=========================================*/
  getNumber(object: Answers) {
    return Object.keys(object).length;
  }

  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }

  showView(categories) {
    this.findReportShow(categories);
  }

  findReportShow(cate) {
    switch (cate) {
      case 0:
        if (this.isFlatShowView === false) {
          this.isFlatShowView = true;
        }
        this.isFlatShowView = true;
        this.isFlatShowUser = false;
        this.isFlatShowReport = false;
        this.isFlatShowArticle = false;
        this.isFlatShowtags = false;
        this.isFlatShowQuestion = false;
        break;
      case 1:
        console.log('this.isFlatShowAllUser:', this.isFlatShowAllUser);
        this.isFlatShowAllUser = false;
        this.isFlatShowView = false;
        this.isFlatShowUser = true;
        this.isFlatShowReport = false;
        this.isFlatShowArticle = false;
        this.isFlatShowtags = false;
        this.isFlatShowQuestion = false;
        break;
      case 2:
        this.isFlatShowView = false;
        this.isFlatShowUser = false;
        this.isFlatShowReport = true;
        this.isFlatShowArticle = false;
        this.isFlatShowtags = false;
        this.isFlatShowQuestion = false;
        break;
      case 3:
        this.isFlatShowView = false;
        this.isFlatShowUser = false;
        this.isFlatShowReport = false;
        this.isFlatShowArticle = true;
        this.isFlatShowtags = false;
        this.isFlatShowQuestion = false;
        break;
      case 4:
        this.isFlatShowView = false;
        this.isFlatShowUser = false;
        this.isFlatShowReport = false;
        this.isFlatShowArticle = false;
        this.isFlatShowtags = true;
        this.isFlatShowQuestion = false;
        break;
      case 5:
        this.isFlatShowView = false;
        this.isFlatShowUser = false;
        this.isFlatShowReport = false;
        this.isFlatShowArticle = false;
        this.isFlatShowtags = false;
        this.isFlatShowQuestion = true;
        break;
    }
  }


  ngOnInit() {
    this.init();
  }

  gotoDetailPage(qa: Qa) {
    this.router.navigate(['./qa-page-detail'], {queryParams: {userId: qa.appUser.userId, id: qa.questionId}});
  }

  getAllarticle(pageIndex: number) {
    this.managerService.getAllarticle(pageIndex).subscribe(getObject => {
      this.getAllarticle$ = getObject;
    });
  }

  goToArticlePage(article: Article) {
    console.log('article', article.articleId);
    this.router.navigate(['./article-detail-page'], {queryParams: {userId: article.appUser.userId, id: article.articleId}});
  }


  getAllUser(pageNumber: number) {
    console.log('tinhnx', pageNumber);
    this.isFlatShowAllUser = true;
    this.tagDetail = false;
    this.tagUserDetail = false;
    this.managerService.getAllUser(pageNumber).subscribe(object => {
      this.getAllUser$ = object;
      console.log('tinhnx1', this.getAllUser$);
    });
  }

  userDetail(userId: number) {
    this.router.navigate(['/user-detail-page'], {queryParams: {id: userId}});
  }

  typeDraw(sortBy: string) {
    this.classifyChart = sortBy;
    // this.getTopQuestionOfUser(this.sortBy$, this.appUserGG$.userId);
  }

  letDrawChart(e) {
    let dataViewCount = [];
    let dataUpvoteCount = [];
    let dataNewAccount = [];
    let dataInactiveAccount = [];
    let bodyJson = new BodyJsonDrawChart();
    // let jsonResponse = new DrawChart();
    bodyJson.startTime = e;
    bodyJson.period = 10;
    this.managerService.getChartInfor(this.classifyChart, bodyJson).subscribe(infor => {
      this.jsonReport = infor;
      if (this.jsonReport != null) {
        let totalViewCount = 0;
        let totalUpvoteCount = 0;
        let totalNewAccount = 0;
        let totalInactiveAccount = 0;
        this.jsonReport.forEach(item => {
          totalViewCount += parseInt(item.totalViewCount);
          totalUpvoteCount += parseInt(item.totalUpvoteCount);
          totalNewAccount += parseInt(item.totalNewAccount);
          totalInactiveAccount += parseInt(item.totalInactiveAccount);
          if (item.chartByDate != null) {
            dataViewCount.push({label: item.chartByDate, y: item.totalViewCount});
            dataUpvoteCount.push({label: item.chartByDate, y: item.totalUpvoteCount});
            dataNewAccount.push({label: item.chartByDate, y: item.totalNewAccount});
            dataInactiveAccount.push({label: item.chartByDate, y: item.totalInactiveAccount});
          } else if (item.chartByMonth != null) {
            dataViewCount.push({label: item.chartByMonth, y: item.totalViewCount});
            dataUpvoteCount.push({label: item.chartByMonth, y: item.totalUpvoteCount});
            dataNewAccount.push({label: item.chartByMonth, y: item.totalNewAccount});
            dataInactiveAccount.push({label: item.chartByMonth, y: item.totalInactiveAccount});
          } else if (item.chartByYear != null) {
            dataViewCount.push({label: item.chartByYear, y: item.totalViewCount});
            dataUpvoteCount.push({label: item.chartByYear, y: item.totalUpvoteCount});
            dataNewAccount.push({label: item.chartByYear, y: item.totalNewAccount});
            dataInactiveAccount.push({label: item.chartByYear, y: item.totalInactiveAccount});
          }

        });
        this.drawChart(dataViewCount, dataUpvoteCount, dataNewAccount, dataInactiveAccount);
      }
    });
  }

  drawChart(dataChart1: any, dataChart2, dataChart3, dataChart4) {
    let chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: true,
      zoomEnabled: true,
      title: {
        text: ''
      },
      data: [
        {
          // Change type to "bar", "area", "spline", "pie",etc.
          type: 'column',
          name: 'Tài khoản mới',
          showInLegend: true,
          dataPoints: dataChart3
        },
        {
          // Change type to "bar", "area", "spline", "pie",etc.
          type: 'column',
          name: 'Tài khoản kém hoạt dộng',
          showInLegend: true,
          dataPoints: dataChart4
        },
        {
          // Change type to "bar", "area", "spline", "pie",etc.
          type: 'line',
          name: 'Lượt xem',
          showInLegend: true,
          dataPoints: dataChart1
        },
        {
          // Change type to "bar", "area", "spline", "pie",etc.
          type: 'line',
          name: 'Lượt thích',
          showInLegend: true,
          dataPoints: dataChart2
        },

      ]
    });

    chart.render();
  }

  searchArticle(textSearch: string, pageIndexArticleSearch: number) {
    this.checkSearch = true;
    if (textSearch) {
      textSearch.trim();
      this.managerService.searchArticle(pageIndexArticleSearch, textSearch).subscribe(getObject => {
        this.getArticle$ = getObject;
        console.log('search', this.getArticle$.numberOfPages);
      });
    }
  }
}
