import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TrangChinhService} from '../trang-chinh/trang-chinh.service';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';
import {TypeService} from './Type.service';
import {Article} from '../article.model';
import {Router} from '@angular/router';
import {NgxLoadingComponent} from 'ngx-loading';

@Component({
  providers: [TypeService],
  selector: 'app-giong-cay',
  templateUrl: './giong-cay.component.html',
  styleUrls: ['./giong-cay.component.css']
})
export class GiongCayComponent implements OnInit {
  loading = true;
  getTypeArticle$ = new GetAllArticle();
  pageIndex$ = 0;
  checkSearch = false;
  selectedIndex = 0;
  p = 1;
  collection: Article[];
  index = 1;
  constructor(private router: Router, private typeService: TypeService) {
  }
  click() {
    this.loading = true;
  }
  resetPage() {
    this.p = 1;
  }
  ngOnInit() {
    this.loading = false;
    this.getTypeArticle(this.pageIndex$);
  }
  getPageAll(page: number) {
    this.p = page;
    this.getTypeArticle(this.p - 1);
  }
  getPageSearch(page: number, textSearch: string) {
    this.p = page;
    this.searchArticle(textSearch , this.p - 1);
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
  getArticleDetail(article: Article) {
    this.router.navigate(['./article-detail-page'], {queryParams: {id: article.articleId, userId: article.appUser.userId}});
  }

  searchArticle(textSearch: string, pageIndex: number) {
    this.selectedIndex = 0;
    this.pageIndex$ = pageIndex;
    this.checkSearch = true;
      textSearch.trim();
      this.typeService.searchArticle(pageIndex, textSearch).subscribe(getObject => {
        this.getTypeArticle$ = getObject;
      });
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
