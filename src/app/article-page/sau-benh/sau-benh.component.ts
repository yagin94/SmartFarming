import { Component, OnInit } from '@angular/core';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';
import {BugService} from './Bug.service';

@Component({
  providers: [BugService],
  selector: 'app-sau-benh',
  templateUrl: './sau-benh.component.html',
  styleUrls: ['./sau-benh.component.css']
})
export class SauBenhComponent implements OnInit {
  getBugArticle$ = new GetAllArticle();
  pageIndex$ = 0;
  constructor(private bugService: BugService) { }

  ngOnInit() {
    this.getBugArticle(this.pageIndex$);
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
  getBugArticle(pageIndex$: number) {
    this.bugService.getBugArticle(this.pageIndex$).subscribe(object => {
      this.getBugArticle$ = object;
      console.log(this.getBugArticle$);
    });
  }
}
