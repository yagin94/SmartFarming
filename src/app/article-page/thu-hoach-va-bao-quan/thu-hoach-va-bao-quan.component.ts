import { Component, OnInit } from '@angular/core';
import {TakeService} from './take.service';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';
import {Article} from '../article.model';
import {Router} from '@angular/router';

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
  constructor(private router: Router, private takeService: TakeService) { }

  ngOnInit() {
    this.getTakeArticle(this.pageIndex$);
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
  getTakeArticle(pageIndex$: number) {
    this.pageIndex$ = pageIndex$;
    this.takeService.getTakeArticle(this.pageIndex$).subscribe(object => {
      this.getTakeArticle$ = object;
      console.log(this.getTakeArticle$);
    });
  }
  getArticleDetail(article: Article) {
    this.router.navigate(['./article-detail-page'], {queryParams: {id: article.articleId, userId: article.appUser.userId}});
  }

  searchArticle(textSearch: string, pageIndex: number) {
    this.checkSearch = true;
    if (textSearch) {
      textSearch.trim();
      this.takeService.searchArticle(pageIndex, textSearch).subscribe(getObject => {
        this.getTakeArticle$ = getObject;
      });
    }
  }
}
