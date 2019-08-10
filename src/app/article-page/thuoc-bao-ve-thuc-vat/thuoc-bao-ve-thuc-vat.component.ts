import { Component, OnInit } from '@angular/core';
import {DrugService} from './drug.service';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';

@Component({
  providers: [DrugService],
  selector: 'app-thuoc-bao-ve-thuc-vat',
  templateUrl: './thuoc-bao-ve-thuc-vat.component.html',
  styleUrls: ['./thuoc-bao-ve-thuc-vat.component.css']
})
export class ThuocBaoVeThucVatComponent implements OnInit {
  getDrugArticle$ = new GetAllArticle();
  pageIndex$ = 0;
  constructor(private drugService: DrugService) { }

  ngOnInit() {
    this.getDrugArticle(this.pageIndex$);
  }
  getDrugArticle(pageIndex$: number) {
    this.pageIndex$ = pageIndex$;
    this.drugService.getDrugArticle(this.pageIndex$).subscribe(object => {
      this.getDrugArticle$ = object;
      console.log(this.getDrugArticle$);
    });
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
}
