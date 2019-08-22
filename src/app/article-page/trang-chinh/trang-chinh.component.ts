import {Component, OnInit} from '@angular/core';
import {TrangChinhService} from './trang-chinh.service';
import {GetAllArticle} from './trang-chinh.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Article} from '../article.model';
import index from '@angular/cli/lib/cli';

@Component({
  providers: [TrangChinhService],
  selector: 'app-trang-chinh',
  templateUrl: './trang-chinh.component.html',
  styleUrls: ['./trang-chinh.component.css']
})
export class TrangChinhComponent implements OnInit {
  getAllArticle$ = new GetAllArticle();
  pageIndex$ = 0;
  checkSearch = false;
  loading = true;
  data: any;
  tagName: any;
  checkPaging$: string;
  selectedIndex = 0;
  pA = 1;
  pS = 1;
  pT = 1;
  collection: Article[];
  index = 1;

  constructor(private trangChinhService: TrangChinhService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loading = false;
    this.getAllArticle$.articlesByPageIndex = [];
    this.route.queryParams.subscribe(params => {
      this.data = params['tagid'];
      this.tagName = params['tagName'];
      console.log(this.data);
    });
    if (this.data == null) {
      this.getAllArticle(this.pageIndex$);
    } else {
      this.getArticleByTag(this.data, this.pageIndex$);
    }
  }

  getPageAll(page: number) {
    this.pA = page;
    this.getAllArticle(this.pA - 1);
  }

  getPageSearch(page: number, textSearch: string) {
    this.pS = page;
    this.searchArticle(textSearch, this.pS - 1);
  }

  getPageTag(page: number) {
    this.pT = page;
    this.getArticleByTag(this.data, this.pT - 1);
  }

  getAllArticle(pageIndex$: number) {
    this.checkPaging$ = 'home';
    this.pageIndex$ = pageIndex$;
    this.trangChinhService.getAllArticle(this.pageIndex$).subscribe(object => {
      this.getAllArticle$ = object;
      console.log(this.getAllArticle$);
      this.collection = this.getAllArticle$.articlesByPageIndex;
    });
  }

  getArticleByTag(tagId: number, pageIndex: number) {
    this.pageIndex$ = pageIndex;
    this.checkPaging$ = 'tag';
    this.trangChinhService.getArticleByTag(tagId, pageIndex).subscribe(object => {
      this.getAllArticle$ = object;
      console.log('===========HH===============', this.getAllArticle$);
    });
  }

  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }

  getArticleDetail(article: Article) {
    this.router.navigate(['./article-detail-page'], {queryParams: {id: article.articleId, userId: article.appUser.userId}});
  }

  searchArticle(textSearch: string, pageIndex: number) {
    this.checkPaging$ = 'home';
    this.selectedIndex = 0;
    this.pageIndex$ = pageIndex;
    this.checkSearch = true;
    textSearch.trim();
    this.trangChinhService.searchArticle(pageIndex, textSearch).subscribe(getObject => {
      this.getAllArticle$ = getObject;
    });
  }

  resetPage() {
    this.pS = 1;
  }

  setRow(_index: number) {
    this.selectedIndex = _index;
    console.log(`=====================`, this.selectedIndex);
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
}
