import { Component, OnInit } from '@angular/core';
import {TakeService} from './take.service';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';

@Component({
  providers: [TakeService],
  selector: 'app-thu-hoach-va-bao-quan',
  templateUrl: './thu-hoach-va-bao-quan.component.html',
  styleUrls: ['./thu-hoach-va-bao-quan.component.css']
})
export class ThuHoachVaBaoQuanComponent implements OnInit {
  getTakeArticle$ = new GetAllArticle();
  pageIndex$ = 0;
  constructor(private takeService: TakeService) { }

  ngOnInit() {
    this.getTakeArticle(this.pageIndex$);
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
  getTakeArticle(pageIndex$: number) {
    this.takeService.getTakeArticle(this.pageIndex$).subscribe(object => {
      this.getTakeArticle$ = object;
      console.log(this.getTakeArticle$);
    });
  }
}
