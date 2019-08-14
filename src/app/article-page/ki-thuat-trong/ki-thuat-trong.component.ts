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
  constructor(private router: Router, private growService: GrowService) {
  }

  ngOnInit() {
    this.getGrowArticle(this.pageIndex$);
  }

  getGrowArticle(pageIndex$: number) {
    this.growService.getGrowArticle(this.pageIndex$).subscribe(object => {
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
    this.checkSearch = true;
    if (textSearch) {
      textSearch.trim();
      this.growService.searchArticle(pageIndex, textSearch).subscribe(getObject => {
        this.getGrowArticle$ = getObject;
      });
    }
  }
}
