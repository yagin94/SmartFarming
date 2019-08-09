import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Article} from '../article.model';
import {ArticleDetailService} from './detail.service';

@Component({
  providers: [ArticleDetailService],
  selector: 'app-article-detail-page',
  templateUrl: './article-detail-page.component.html',
  styleUrls: ['./article-detail-page.component.css']
})
export class ArticleDetailPageComponent implements OnInit {
  data: any;
  article$: Article;

  constructor(private route: ActivatedRoute,
              private articleDetailService: ArticleDetailService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.data = params.id);
    this.getArticleDetail(this.data);
  }

  getArticleDetail(articleId: number) {
    this.articleDetailService.getDetail(articleId).subscribe(result => {
      this.article$ = result;
      console.log(this.article$);
    });
  }
}
