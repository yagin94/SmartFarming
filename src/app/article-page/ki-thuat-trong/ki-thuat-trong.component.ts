import {Component, OnInit} from '@angular/core';
import {GrowService} from './Grow.service';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';
import {Article} from '../article.model';
import {Router} from '@angular/router';

@Component({
  providers: [GrowService],
  selector: 'app-ki-thuat-trong',
  templateUrl: './ki-thuat-trong.component.html',
  styleUrls: ['./ki-thuat-trong.component.css']
})
export class KiThuatTrongComponent implements OnInit {
  getGrowArticle$ = new GetAllArticle();
  pageIndex$ = 0;
  checkSearch = false;
  loading = true;
  selectedIndex = 0 ;
  p = 1;
  collection: Article[];
  index = 1;
  constructor(private router: Router, private growService: GrowService) {
  }
  click() {
    this.loading = true;
  }
  ngOnInit() {
    this.loading = false;
    this.getGrowArticle(this.pageIndex$);
  }
  getPageAll(page: number) {
    this.p = page;
    this.getGrowArticle(this.p - 1);
  }
  getPageSearch(page: number, textSearch: string) {
    this.p = page;
    this.searchArticle(textSearch , this.p - 1);
  }
  getGrowArticle(pageIndex$: number) {
    this.pageIndex$ = pageIndex$;
    this.growService.getGrowArticle(pageIndex$).subscribe(object => {
      this.getGrowArticle$ = object;
      console.log(this.getGrowArticle$);
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
      this.growService.searchArticle(pageIndex, textSearch).subscribe(getObject => {
        this.getGrowArticle$ = getObject;
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
