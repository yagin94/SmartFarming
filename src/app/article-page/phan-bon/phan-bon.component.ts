import { Component, OnInit } from '@angular/core';
import {DungService} from './Dung.service';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';
import {BugService} from '../sau-benh/Bug.service';

@Component({
  providers: [DungService],
  selector: 'app-phan-bon',
  templateUrl: './phan-bon.component.html',
  styleUrls: ['./phan-bon.component.css']
})
export class PhanBonComponent implements OnInit {
  getDungArticle$ = new GetAllArticle();
  pageIndex$ = 0;
  constructor(private dungService: DungService) { }

  ngOnInit() {
    this.getDungArticle(this.pageIndex$);
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
  getDungArticle(pageIndex$: number) {
    this.dungService.getDungArticle(this.pageIndex$).subscribe(object => {
      this.getDungArticle$ = object;
      console.log(this.getDungArticle$);
    });
  }
}
