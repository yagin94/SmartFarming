import { Component, OnInit } from '@angular/core';
import {TrangChinhService} from '../trang-chinh/trang-chinh.service';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';
import {TypeService} from './Type.service';
import {Article} from '../article.model';
import {Router} from '@angular/router';

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
  constructor(private router: Router, private typeService: TypeService) {
  }

  ngOnInit() {
    this.getTypeArticle(this.pageIndex$);
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
    this.checkSearch = true;
    if (textSearch) {
      textSearch.trim();
      this.typeService.searchArticle(pageIndex, textSearch).subscribe(getObject => {
        this.getTypeArticle$ = getObject;
      });
    }
  }
}
