import {Component, OnInit} from '@angular/core';
import * as CanvasJS from '../../assets/layout/scripts/canvasjs.min.js';
import {Answers, AppUser, GetObject, Qa, ReportsByPageIndex, ReportUser, SearchUserByTag} from '../qa-page/qa.model';
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
  getReport$: ReportUser;
  getObjectReport$: GetObjectReport;
  getObjectTag$: GetObjectTag;
  getTagSearchUserManage$: GetObjectTag;
  getUserByTag$: SearchUserByTag[];
  reportDetail = false;
  tagDetail = false;
  tagUserDetail = false;
  pageIndex$ = 0;
  pageIndexArticle$ = 0;
  pageIndexAllTag$ = 0;
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
  pageIndexReport$ = 0;
  sortArticleBy$ = 'date';
  getQuestionSearch: any;
  pageIndexTagManage$ = 0;
  allUserIndex = 0;
  questionSearchIndexCheckString = '';
  /**=====================*/
  isFlatShowView = false;
  isFlatShowUser = false;
  isFlatShowReport = false;
  isFlatShowArticle = false;
  isFlatShowtags = false;
  isFlatShowQuestion = false;
  isFlatShowAllUser = false;
  checkSearch = false;
  checkSearchQuestion = false;
  choosenUser = new AppUser();

  dateChart = '';
  monthChart = '';
  yearChart = '';
  periodChart = '';
  selectedIndex = 0;

  pArticle = 1;
  pArticleSearch = 1;
  pQuestion = 1;
  qQuestionSearch = 1;
  qAllTag = 1;
  qSearchTag = 1;
  qReportUser = 1;
  qReportUserDetail = 1;
  pAllUser = 1;


  init() {
    this.loading = false;
    this.getObjectReport$ = new GetObjectReport();
    this.getReport$ = new ReportUser();
    this.getObject$ = new GetObject();
    this.getObjectTag$ = new GetObjectTag();
    this.getTagSearchUserManage$ = new GetObjectTag();
    this.getAllarticle$ = new GetAllArticle();
    this.getAllUser$ = new GetAllUser();
    this.getReportUser$ = new GetReportUser();
    this.getArticle$ = new GetAllArticle();
    this.allView$ = 0;
    this.getAllView();


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
    this.checkSearchQuestion = false;
    this.selectedIndex = 0;
    this.pageIndex$ = pageIndex;
    this.qaService.getQa(sortBy, pageIndex).subscribe(getObject => {

      this.getObject$ = getObject;
    });
  }

  getQaSearch(sortBy: string, pageIndex: number): void {
    this.pageIndex$ = pageIndex;
    this.qaService.getQa(sortBy, pageIndex).subscribe(getObject => {

      this.getObject$ = getObject;
    });
  }

  sortBy(value: string) {
    this.pQuestion = 1;
    this.sortBy$ = value;
    console.log(value);
    this.getQa(this.sortBy$, 0);
  }

  /**=======================article manager=====================================*/

  sortArticleBy(value: string) {
    this.sortBy$ = value;
    console.log(value);
    this.getQa(this.sortBy$, this.pageIndex$);
  }

  /**=======================tag manager=========================================*/
  getAllTag(sortBy: string, pageIndex: number): void {
    this.pageIndexTagManage$ = pageIndex;
    this.selectedIndex = 0;
    this.managerService.getAllTag(sortBy, pageIndex).subscribe(getObject => {

      this.getObjectTag$ = getObject;
    });
  }

  getSearchTag(pageIndex: number, textSearch: string) {
    if (textSearch) {
      this.isFlatShowAllUser = false;
      this.tagDetail = true;
      this.tagUserDetail = false;
      this.managerService.getSearchTag('upvoteCount', pageIndex, textSearch).subscribe(object =>
        this.getTagSearchUserManage$ = object);
    }
  }

  getUserByTag(tagId: number) {
    this.tagUserDetail = true;
    this.isFlatShowAllUser = false;
    this.managerService.getUserByTag(tagId).subscribe(object => {
      this.getUserByTag$ = object;
    });
  }

  sortTagBy(value: string) {
    this.qAllTag = 1;
    this.pageIndexTagManage$ = 0;
    this.selectedIndex = 0;
    this.sortTagBy$ = value;
    this.getAllTag(value, 0);
  }

  /**=======================getReport============================================*/
  getReport(pageIndex: number) {
    console.log('getReport', this.qReportUser);
    this.pageIndexReport$ = pageIndex;
    this.managerService.getReport(pageIndex).subscribe(getObject => {
      this.getReportUser$ = getObject;
    });
  }

  getReportDetail(report: number, pageNumber: number) {
    console.log('click', report);
    console.log('this.qReportUser', this.qReportUser);
    this.reportDetail = true;
    this.managerService.getReportDetail(report, pageNumber).subscribe(reportDetailuser => {
      this.getReport$ = reportDetailuser;
      this.choosenUser = this.getReport$.reportsByPageIndex[0].appUser;
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

        this.isFlatShowAllUser = false;
        this.isFlatShowView = false;
        this.isFlatShowUser = true;
        this.isFlatShowReport = false;
        this.isFlatShowArticle = false;
        this.isFlatShowtags = false;
        this.isFlatShowQuestion = false;
        this.getAllUser(0);
        break;
      case 2:
        this.isFlatShowView = false;
        this.isFlatShowUser = false;
        this.isFlatShowReport = true;
        this.isFlatShowArticle = false;
        this.isFlatShowtags = false;
        this.isFlatShowQuestion = false;
        this.getReport(0);
        break;
      case 3:
        this.isFlatShowView = false;
        this.isFlatShowUser = false;
        this.isFlatShowReport = false;
        this.isFlatShowArticle = true;
        this.isFlatShowtags = false;
        this.isFlatShowQuestion = false;
        this.getAllarticle(this.sortArticleBy$, 0);
        break;
      case 4:
        this.isFlatShowView = false;
        this.isFlatShowUser = false;
        this.isFlatShowReport = false;
        this.isFlatShowArticle = false;
        this.isFlatShowtags = true;
        this.isFlatShowQuestion = false;

        this.getAllTag(this.sortTagBy$, 0);
        break;
      case 5:
        this.isFlatShowView = false;
        this.isFlatShowUser = false;
        this.isFlatShowReport = false;
        this.isFlatShowArticle = false;
        this.isFlatShowtags = false;
        this.isFlatShowQuestion = true;
        this.getQa(this.sortBy$, 0);
        break;
    }
  }


  ngOnInit() {
    this.init();
  }

  gotoDetailPage(qa: Qa) {
    this.router.navigate(['./qa-page-detail'], {queryParams: {userId: qa.appUser.userId, id: qa.questionId}});
  }

  getAllarticle(sortBy: string, pageIndex: number) {
    this.selectedIndex = 0;
    this.pageIndexArticle$ = pageIndex;
    this.managerService.getAllarticle(sortBy, pageIndex).subscribe(getObject => {
      this.getAllarticle$ = getObject;
    });
  }

  goToArticlePage(article: Article) {
    console.log('article', article.articleId);
    this.router.navigate(['./article-detail-page'], {queryParams: {userId: article.appUser.userId, id: article.articleId}});
  }


  getAllUser(pageNumber: number) {
    this.allUserIndex = pageNumber;

    this.tagDetail = false;
    this.tagUserDetail = false;
    this.managerService.getAllUser(pageNumber).subscribe(object => {
      this.getAllUser$ = object;
    });
  }

  showAlluser() {
    this.isFlatShowAllUser = true;
    this.pAllUser = 1;
  }

  userDetail(userId: number) {
    this.router.navigate(['/user-detail-page'], {queryParams: {id: userId}});
  }

  typeDraw(sortBy: string) {
    this.classifyChart = sortBy;
    // this.getTopQuestionOfUser(this.sortBy$, this.appUserGG$.userId);
  }

  letDrawChart(e: string, period: string) {
    console.log('chart', e);
    let dataViewCount = [];
    let dataUpvoteCount = [];
    let dataNewAccount = [];
    let dataInactiveAccount = [];
    let bodyJson = new BodyJsonDrawChart();
    // let jsonResponse = new DrawChart();
    bodyJson.startTime = e;
    bodyJson.period = parseInt(period);
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
    console.log('pageIndexArticleSearch', pageIndexArticleSearch);
    this.selectedIndex = 0;
    this.pageIndexArticleSearch$ = pageIndexArticleSearch;
    this.checkSearch = true;
    if (textSearch) {
      textSearch.trim();
      this.managerService.searchArticle(pageIndexArticleSearch, textSearch).subscribe(getObject => {
        this.getArticle$ = getObject;
      });
    }
  }

  searchQuestion(textSearch: string, pageIndex: number) {
    this.selectedIndex = 0;
    this.pageIndex$ = pageIndex;
    console.log('pageIndex', pageIndex);
    this.checkSearchQuestion = true;
    if (textSearch) {
      textSearch.trim();
      this.managerService.searchQa(textSearch, 'date', pageIndex).subscribe(getObject => {
        this.getQuestionSearch = getObject;
      });
    }
  }

  userDetails() {
    this.router.navigate(['/user-detail-page'], {queryParams: {id: JSON.parse(localStorage.getItem(`currentAppUser`)).userId}});
  }

  isLoggedIn() {
    if (localStorage.getItem('currentAppUser')) {
      return true;
    }
    return false;
  }

  /** Suggest tag*/
  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }

  timePeriod(value: string) {
    this.periodChart = value;
  }

  setRow(_index: number) {
    this.selectedIndex = _index;
  }

  getSortByArticle(sortBy: string) {
    this.pArticle = 1;
    this.sortArticleBy$ = sortBy;
    this.getAllarticle(this.sortArticleBy$, 0);
  }

  showAllQuestion() {
    this.checkSearchQuestion = false;
    this.pQuestion = 1;
  }


  deleteReport(reportUser: ReportsByPageIndex) {
    if (confirm('Bạn có chắc chắn muốn xóa báo cáo không?')) {
      this.managerService.deleteReport(reportUser.reportId).subscribe(onsucess => {
          alert('Xóa báo cáo thành công!');
          this.getReport(this.pageIndexReport$);
          this.getReportDetail(this.choosenUser.userId, 0);
        },
        failDeleteReport => {
          alert('Xóa báo cáo  thất bại!');
          this.getReport(this.pageIndexReport$);
        });
    }

  }

  //21-08-2019 -------------------------------------------------------------------------------------
  getPageAllArticle(page: number) {
    this.pArticle = page;
    this.getAllarticle(this.sortArticleBy$, this.pArticle - 1);
  }

  getPageSearchArticle(page: number, textSearch: string) {
    this.pArticleSearch = page;
    this.searchArticle(textSearch, this.pArticleSearch - 1);
  }

  getPageAllQuestion(page: number) {
    this.pQuestion = page;
    this.getQa(this.sortBy$, this.pQuestion - 1);
  }

  getPageSearchQuestion(page: number, textSearch: string) {
    this.qQuestionSearch = page;
    this.searchQuestion(textSearch, this.qQuestionSearch - 1);
  }

  getPageAllTag(page: number) {
    this.qAllTag = page;
    this.getAllTag(this.sortTagBy$, this.qAllTag - 1);
  }

  getPageAllReportUser(page: number) {
    this.qReportUser = page;
    this.getReport(this.qReportUser - 1);
  }

  resetIndexReport() {

  }

  getPageAllReportUserDetail(page: number, report: number) {
    this.qReportUserDetail = page;
    this.getReportDetail(report, this.qReportUserDetail - 1);
  }

  getPageAllUser(page: number) {
    this.pAllUser = page;
    this.getAllUser(this.pAllUser - 1);
  }

  resetSearchQa() {
    this.qQuestionSearch = 1;
  }

  resetSearchArticle() {
    this.pArticleSearch = 1;
    this.pageIndexArticleSearch$ = 0;
  }
}
