import { Component, OnInit } from '@angular/core';
import {TrangChinhService} from '../trang-chinh/trang-chinh.service';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';
import {TypeService} from './Type.service';

@Component({
  providers: [TypeService],
  selector: 'app-giong-cay',
  templateUrl: './giong-cay.component.html',
  styleUrls: ['./giong-cay.component.css']
})
export class GiongCayComponent implements OnInit {

  getTypeArticle$ = new GetAllArticle();
  pageIndex$ = 0;
  constructor(private typeService: TypeService) {
  }

  ngOnInit() {
    this.getTypeArticle(this.pageIndex$);
  }

  getTypeArticle(pageIndex$: number) {
    this.pageIndex$ = pageIndex$;
    this.typeService.getTypeArticle(this.pageIndex$).subscribe(object => {
      this.getTypeArticle$ = object;
      console.log(this.getTypeArticle$);
    });
  }

  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
}
