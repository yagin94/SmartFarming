import { Component, OnInit } from '@angular/core';
import {CloneService} from './Clone.service';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';
import {DungService} from '../phan-bon/Dung.service';


@Component({
  providers: [CloneService],
  selector: 'app-ky-thuat-nhan-giong',
  templateUrl: './ky-thuat-nhan-giong.component.html',
  styleUrls: ['./ky-thuat-nhan-giong.component.css']
})
export class KyThuatNhanGiongComponent implements OnInit {

  getCloneArticle$ = new GetAllArticle();
  pageIndex$ = 0;
  constructor(private cloneService: CloneService) { }

  ngOnInit() {
     this.getDungArticle(this.pageIndex$);
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
  getDungArticle(pageIndex$: number) {
    this.cloneService.getCloneArticle(this.pageIndex$).subscribe(object => {
      this.getCloneArticle$ = object;
      console.log(this.getCloneArticle$);
    });
  }
}
