import { Component, OnInit } from '@angular/core';
import {DungService} from './Dung.service';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';
import {BugService} from '../sau-benh/Bug.service';
import {Article} from '../article.model';
import {Router} from '@angular/router';

@Component({
  providers: [DungService],
  selector: 'app-phan-bon',
  templateUrl: './phan-bon.component.html',
  styleUrls: ['./phan-bon.component.css']
})
export class PhanBonComponent implements OnInit {
  getDungArticle$ = new GetAllArticle();
  pageIndex$ = 0;
  checkSearch = false;
  loading = true;
  selectedIndex = 0;
  p = 1;
  collection: Article[];
  index = 1;
  constructor(private router: Router, private dungService: DungService) { }

  ngOnInit() {
    this.loading = false;
    this.getDungArticle(this.pageIndex$);
  }
  getPageAll(page: number) {
    this.p = page;
    this.getDungArticle(this.p - 1);
  }
  getPageSearch(page: number, textSearch: string) {
    this.p = page;
    this.searchArticle(textSearch , this.p - 1);
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
  getDungArticle(pageIndex$: number) {
    this.pageIndex$ = pageIndex$;
    this.dungService.getDungArticle(pageIndex$).subscribe(object => {
      this.getDungArticle$ = object;
      console.log(this.getDungArticle$);
    });
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
      this.dungService.searchArticle(pageIndex, textSearch).subscribe(getObject => {
        this.getDungArticle$ = getObject;
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
