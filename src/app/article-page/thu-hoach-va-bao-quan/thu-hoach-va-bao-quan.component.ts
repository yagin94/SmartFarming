import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TakeService} from './take.service';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';
import {Article} from '../article.model';
import {Router} from '@angular/router';
import {NgxLoadingComponent} from 'ngx-loading';

@Component({
  providers: [TakeService],
  selector: 'app-thu-hoach-va-bao-quan',
  templateUrl: './thu-hoach-va-bao-quan.component.html',
  styleUrls: ['./thu-hoach-va-bao-quan.component.css']
})
export class ThuHoachVaBaoQuanComponent implements OnInit {
  getTakeArticle$ = new GetAllArticle();
  pageIndex$ = 0;
  checkSearch = false;
  loading = true;
  selectedIndex = 0;
  p = 1;
  collection: Article[];
  index = 1;
  constructor(private router: Router, private takeService: TakeService) { }
  click() {
    this.loading = true;
  }
  resetPage() {
    this.p = 1;
  }
  ngOnInit() {
    this.loading = false;
    this.getTakeArticle(this.pageIndex$);
  }
  getPageAll(page: number) {
    this.p = page;
    this.getTakeArticle(this.p - 1);
  }
  getPageSearch(page: number, textSearch: string) {
    this.p = page;
    this.searchArticle(textSearch , this.p - 1);
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
  getTakeArticle(pageIndex$: number) {
    this.pageIndex$ = pageIndex$;
    this.takeService.getTakeArticle(pageIndex$).subscribe(object => {
      this.getTakeArticle$ = object;
      console.log(this.getTakeArticle$);
    });
  }
  getArticleDetail(article: Article) {
    this.router.navigate(['./article-detail-page'], {queryParams: {id: article.articleId, userId: article.appUser.userId}});
  }

  searchArticle(textSearch: string, pageIndex: number) {
    this.selectedIndex = 0;
    this.pageIndex$ = pageIndex;
    this.checkSearch = true;
      textSearch.trim();
      this.takeService.searchArticle(pageIndex, textSearch).subscribe(getObject => {
        this.getTakeArticle$ = getObject;
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
