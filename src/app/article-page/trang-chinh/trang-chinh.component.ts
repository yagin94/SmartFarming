import {Component, OnInit} from '@angular/core';
import {TrangChinhService} from './trang-chinh.service';
import {GetAllArticle} from './trang-chinh.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Article} from '../article.model';

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

  constructor(private trangChinhService: TrangChinhService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loading = false;
    this.route.queryParams.subscribe(params => {
      this.data = params['tagid'];
      this.tagName = params['tagName']
      console.log(this.data);
    });
    if (this.data == null) {
      this.getAllArticle(this.pageIndex$);
    } else {
      this.getArticleByTag(this.data, this.pageIndex$);
    }
  }

  getAllArticle(pageIndex$: number) {
    this.checkPaging$ = 'home';
    this.pageIndex$ = pageIndex$;
    this.trangChinhService.getAllArticle(this.pageIndex$).subscribe(object => {
      this.getAllArticle$ = object;
      console.log(this.getAllArticle$);
    });
  }

  getArticleByTag(tagId: number, pageIndex: number) {
    this.pageIndex$ = pageIndex;
    this.checkPaging$ = 'tag';
    this.trangChinhService.getArticleByTag(tagId, pageIndex).subscribe(object => {
      this.getAllArticle$ = object;
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
      this.trangChinhService.searchArticle(pageIndex, textSearch).subscribe(getObject => {
        this.getAllArticle$ = getObject;
      });
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
