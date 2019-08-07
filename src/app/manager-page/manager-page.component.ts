import {Component, OnInit} from '@angular/core';
import * as CanvasJS from '../../assets/layout/scripts/canvasjs.min.js';
import {Answers, GetObject} from '../qa-page/qa.model';
import {QaService} from '../qa-page/qa.service';
import {HeaderComponent} from '../common/header/header.component';
import {AuthService} from 'angularx-social-login';
import {QaPageDetailComponent} from '../qa-page/qa-page-detail/qa-page-detail.component';
import {DataShareService} from '../share-data-service/date-share-service';
import {Globals} from '../common/globalVariables';


@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css'],
  providers: [QaService, HeaderComponent, AuthService, QaPageDetailComponent, DataShareService, Globals]
})

export class ManagerPageComponent implements OnInit {
  getObject$: GetObject;
  pageIndex$ = 0;
  sortBy$ = 'viewCount';
  /**=====================*/
  isFlatShowView = false;
  isFlatShowUser = false;
  isFlatShowReport = false;
  isFlatShowArticle = false;
  isFlatShowtags = false;
  isFlatShowQuestion = false;

  init() {
    this.getObject$ = new GetObject();
    this.getQa(this.sortBy$, this.pageIndex$);
  }

  constructor(private qaService: QaService) {
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
  getArticle(sortBy: string, pageIndex: number): void {
    this.qaService.getQa(sortBy, pageIndex).subscribe(getObject => {

      this.getObject$ = getObject;
      console.log(this.getObject$.qa);
    });
  }
  sortArticleBy(value: string) {
    this.sortBy$ = value;
    console.log(value);
    this.getQa(this.sortBy$, this.pageIndex$);
  }
  /**=======================tag manager=========================================*/
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
        this.drawChart();
        break;
      case 1:
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

  drawChart() {
    let chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: true,
      zoomEnabled: true,
      title: {
        text: ''
      },
      data: [{
        type: 'column',
        dataPoints: [
          {y: 71, label: 'Apple'},
          {y: 55, label: 'Mango'},
          {y: 50, label: 'Orange'},
          {y: 65, label: 'Banana'},
          {y: 95, label: 'Pineapple'},
          {y: 68, label: 'Pears'},
          {y: 28, label: 'Grapes'},
          {y: 34, label: 'Lychee'},
          {y: 14, label: 'Jackfruit'}
        ]
      }]
    });

    chart.render();
  }

  ngOnInit() {
    this.init();
  }

}
