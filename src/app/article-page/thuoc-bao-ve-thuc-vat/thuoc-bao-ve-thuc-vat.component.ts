import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DrugService} from './drug.service';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';
import {Article} from '../article.model';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxLoadingComponent} from 'ngx-loading';

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
  selectedIndex = 0;
  p = 1;
  collection: Article[];
  index = 1;
  constructor(private drugService: DrugService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  click() {
    this.loading = true;
  }

  ngOnInit() {
    this.loading = false;
    this.getDrugArticle(this.pageIndex$);
  }
  getPageAll(page: number) {
    this.p = page;
    this.getDrugArticle(this.p - 1);
  }
  getPageSearch(page: number, textSearch: string) {
    this.p = page;
    this.searchArticle(textSearch , this.p - 1);
  }
  getDrugArticle(pageIndex$: number) {
    this.pageIndex$ = pageIndex$;
    this.drugService.getDrugArticle(pageIndex$).subscribe(object => {
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
    this.selectedIndex = 0;
    this.pageIndex$ = pageIndex;
    this.checkSearch = true;
    if (textSearch) {
      textSearch.trim();
      this.drugService.searchArticle(pageIndex, textSearch).subscribe(getObject => {
        this.getDrugArticle$ = getObject;
      });
    }
  }

  userDetail() {
    this.router.navigate(['/user-detail-page'], {queryParams: {id: JSON.parse(localStorage.getItem(`currentAppUser`)).userId}});
  }

  isLoggedIn() {
    if (localStorage.getItem('currentAppUser')) {
      return true;
    }
    return false;
  }

  setRow(_index: number) {
    this.selectedIndex = _index;
    console.log(`=====================`, this.selectedIndex);
  }
}
