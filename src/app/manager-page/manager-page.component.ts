import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../assets/layout/scripts/canvasjs.min.js';


@Component({
  selector: 'app-manager-page',
  templateUrl: './manager-page.component.html',
  styleUrls: ['./manager-page.component.css']
})

export class ManagerPageComponent implements OnInit {

  isFlatShowView = false;
  isFlatShowUser = false;
  isFlatShowReport = false;
  isFlatShowArticle = false;
  isFlatShowtags = false;
  isFlatShowQuestion = false;

  init() {
  }

  constructor() { }

  /**
   * Method show chart when click to button show
   */
  showView(categories) {
    this.findReportShow(categories);
  }

  findReportShow(cate) {
    switch (cate) {
      case 0:
        if (this.isFlatShowView === false){
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
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      zoomEnabled: true,
      title: {
        text: ""
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "Apple" },
          { y: 55, label: "Mango" },
          { y: 50, label: "Orange" },
          { y: 65, label: "Banana" },
          { y: 95, label: "Pineapple" },
          { y: 68, label: "Pears" },
          { y: 28, label: "Grapes" },
          { y: 34, label: "Lychee" },
          { y: 14, label: "Jackfruit" }
        ]
      }]
    });

    chart.render();
  }

  ngOnInit() {
    this.init();
  }

}
