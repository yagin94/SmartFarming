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
  constructor(private router: Router, private cloneService: CloneService) { }
  click() {
    this.loading = true;
  }
  ngOnInit() {
    this.loading = false;
     this.getCloneArticle(this.pageIndex$);
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
  getCloneArticle(pageIndex$: number) {
    this.pageIndex$ = pageIndex$;
    this.cloneService.getCloneArticle(this.pageIndex$).subscribe(object => {
      this.getCloneArticle$ = object;
      console.log(this.getCloneArticle$);
    });
  }
  getArticleDetail(article: Article) {
    this.router.navigate(['./article-detail-page'], {queryParams: {id: article.articleId, userId: article.appUser.userId}});
  }

  searchArticle(textSearch: string, pageIndex: number) {
    this.checkSearch = true;
    if (textSearch) {
      textSearch.trim();
      this.cloneService.searchArticle(pageIndex, textSearch).subscribe(getObject => {
        this.getCloneArticle$ = getObject;
      });
    }
  }
}
