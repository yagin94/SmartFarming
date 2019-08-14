import { Component, OnInit } from '@angular/core';
import {DrugService} from './drug.service';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';
import {Article} from '../article.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  providers: [DrugService],
  selector: 'app-thuoc-bao-ve-thuc-vat',
  templateUrl: './thuoc-bao-ve-thuc-vat.component.html',
  styleUrls: ['./thuoc-bao-ve-thuc-vat.component.css']
})
export class ThuocBaoVeThucVatComponent implements OnInit {
  getDrugArticle$ = new GetAllArticle();
  pageIndex$ = 0;
  checkSearch = false;
  loading = true;
  constructor(private drugService: DrugService,
              private router: Router,
              private route: ActivatedRoute) { }

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
  getArticleDetail(article: Article) {
    this.router.navigate(['./article-detail-page'], {queryParams: {id: article.articleId, userId: article.appUser.userId}});
  }

  searchArticle(textSearch: string, pageIndex: number) {
    this.checkSearch = true;
    if (textSearch) {
      textSearch.trim();
      this.drugService.searchArticle(pageIndex, textSearch).subscribe(getObject => {
        this.getDrugArticle$ = getObject;
      });
    }
  }
}
