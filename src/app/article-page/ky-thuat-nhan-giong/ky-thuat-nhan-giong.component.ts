import { Component, OnInit } from '@angular/core';
import {CloneService} from './Clone.service';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';



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
     this.getCloneArticle(this.pageIndex$);
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
  getCloneArticle(pageIndex$: number) {
    this.pageIndex$ = pageIndex$;
    this.cloneService.getCloneArticle(this.pageIndex$).subscribe(object => {
      this.getCloneArticle$ = object;
      console.log(this.getCloneArticle$);
    });
  }
}
