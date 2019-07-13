import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.css']
})
export class UserDetailPageComponent implements OnInit {

  init() {
    this.drawChart();
  }
  constructor() { }

  drawChart() {
    var chart = new CanvasJS.Chart("chartContainerUser", {
      theme: "light1", // "light2", "dark1", "dark2"
      animationEnabled: true, // change to true
      title: {
        text: "Thông số tài khoản"
      },
      data: [
        {
          // Change type to "bar", "area", "spline", "pie",etc.
          type: "column",
          dataPoints: [
            { label: "Tháng 1", y: 71 },
            { label: "Tháng 1", y: 55},
            { label: "Tháng 1", y: 50 },
            { label: "Tháng 1", y: 65 },
            { label: "Tháng 1", y: 95 },
            { label: "Tháng 1", y: 68 },
            { label: "Tháng 1", y: 28 },
            { label: "Tháng 1", y: 34 },
            { label: "Tháng 1", y: 14}
          ]
        },
        {
          // Change type to "bar", "area", "spline", "pie",etc.
          type: "column",
          dataPoints: [
            { label: "Tháng 1", y: 10 },
            { label: "Tháng 1", y: 10},
            { label: "Tháng 1", y: 10 },
            { label: "Tháng 1", y: 10 },
            { label: "Tháng 1", y: 10 },
            { label: "Tháng 1", y: 10 },
            { label: "Tháng 1", y: 10 },
            { label: "Tháng 1", y: 10 },
            { label: "Tháng 1", y: 10}
          ]
        },
        {
          type: "line",
          dataPoints: [
            { label: "Tháng 1", y: 171 },
            { label: "Tháng 1", y: 155},
            { label: "Tháng 1", y: 150 },
            { label: "Tháng 1", y: 165 },
            { label: "Tháng 1", y: 195 },
            { label: "Tháng 1", y: 168 },
            { label: "Tháng 1", y: 128 },
            { label: "Tháng 1", y: 134 },
            { label: "Tháng 1", y: 114}
          ]
        }
      ]
    });
    chart.render();
  }
  ngOnInit() {
    this.init();
  }

}
