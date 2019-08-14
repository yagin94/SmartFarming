import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';
import {BugService} from './Bug.service';
import {Article} from '../article.model';
import {Router} from '@angular/router';
import {NgxLoadingComponent} from 'ngx-loading';

@Component({
  providers: [BugService],
  selector: 'app-sau-benh',
  templateUrl: './sau-benh.component.html',
  styleUrls: ['./sau-benh.component.css']
})
export class SauBenhComponent implements OnInit {
  getBugArticle$ = new GetAllArticle();
  pageIndex$ = 0;
  checkSearch = false;
  loading = true;
  constructor(private router: Router, private bugService: BugService) { }
  click() {
    this.loading = true;
  }
  ngOnInit() {
    this.loading = false;
    this.getBugArticle(this.pageIndex$);
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
  getBugArticle(pageIndex$: number) {
    this.pageIndex$ = pageIndex$;
    this.bugService.getBugArticle(this.pageIndex$).subscribe(object => {
      this.getBugArticle$ = object;
      console.log(this.getBugArticle$);
    });
  }
  getArticleDetail(article: Article) {
    this.router.navigate(['./article-detail-page'], {queryParams: {id: article.articleId, userId: article.appUser.userId}});
  }

  searchArticle(textSearch: string, pageIndex: number) {
    this.checkSearch = true;
    if (textSearch) {
      textSearch.trim();
      this.bugService.searchArticle(pageIndex, textSearch).subscribe(getObject => {
        this.getBugArticle$ = getObject;
      });
    }
  }
}
