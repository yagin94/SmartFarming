import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CloneService} from './Clone.service';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';
import {Article} from '../article.model';
import {Router} from '@angular/router';
import {NgxLoadingComponent} from 'ngx-loading';



@Component({
  providers: [CloneService],
  selector: 'app-ky-thuat-nhan-giong',
  templateUrl: './ky-thuat-nhan-giong.component.html',
  styleUrls: ['./ky-thuat-nhan-giong.component.css']
})
export class KyThuatNhanGiongComponent implements OnInit {
  loading = true;
  getCloneArticle$ = new GetAllArticle();
  pageIndex$ = 0;
  checkSearch = false;
  selectedIndex = 0;
  p = 1;
  collection: Article[];
  index = 1;
  constructor(private router: Router, private cloneService: CloneService) { }
  click() {
    this.loading = true;
  }
  resetPage() {
    this.p = 1;
  }
  ngOnInit() {
    this.loading = false;
     this.getCloneArticle(this.pageIndex$);
  }
  getPageAll(page: number) {
    this.p = page;
    this.getCloneArticle(this.p - 1);
  }
  getPageSearch(page: number, textSearch: string) {
    this.p = page;
    this.searchArticle(textSearch , this.p - 1);
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
  getCloneArticle(pageIndex$: number) {
    this.pageIndex$ = pageIndex$;
    this.cloneService.getCloneArticle(pageIndex$).subscribe(object => {
      this.getCloneArticle$ = object;
      console.log(this.getCloneArticle$);
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
      this.cloneService.searchArticle(pageIndex, textSearch).subscribe(getObject => {
        this.getCloneArticle$ = getObject;
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
