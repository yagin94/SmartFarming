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
  constructor(private router: Router, private dungService: DungService) { }

  ngOnInit() {
    this.getDungArticle(this.pageIndex$);
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
  getDungArticle(pageIndex$: number) {
    this.pageIndex$ = pageIndex$;
    this.dungService.getDungArticle(this.pageIndex$).subscribe(object => {
      this.getDungArticle$ = object;
      console.log(this.getDungArticle$);
    });
  }
  getArticleDetail(article: Article) {
    this.router.navigate(['./article-detail-page'], {queryParams: {id: article.articleId, userId: article.appUser.userId}});
  }

  searchArticle(textSearch: string, pageIndex: number) {
    this.checkSearch = true;
    if (textSearch) {
      textSearch.trim();
      this.dungService.searchArticle(pageIndex, textSearch).subscribe(getObject => {
        this.getDungArticle$ = getObject;
      });
    }
  }
}
