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

  constructor(private trangChinhService: TrangChinhService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAllArticle(this.pageIndex$);
  }

  getAllArticle(pageIndex$: number) {
    this.trangChinhService.getAllArticle(this.pageIndex$).subscribe(object => {
      this.getAllArticle$ = object;
      console.log(this.getAllArticle$);
    });
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
  getArticleDetail(article: Article) {
    this.router.navigate(['./article-detail-page'], {queryParams: {id: article.articleId}});
  }
}
