import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Article} from '../article.model';
import {ArticleDetailService} from './detail.service';
import {DataShareService} from '../../share-data-service/date-share-service';

@Component({
  providers: [ArticleDetailService, DataShareService],
  selector: 'app-article-detail-page',
  templateUrl: './article-detail-page.component.html',
  styleUrls: ['./article-detail-page.component.css']
})
export class ArticleDetailPageComponent implements OnInit {
  data: any;
  article$: Article = new Article();
  distinct$: any;
  checkAdmin = '';
  articleDelete$: Article[];
  editArticle$: Article;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataShareService: DataShareService,
              private articleDetailService: ArticleDetailService) {
  }

  ngOnInit() {
    this.checkRole();
    this.route.queryParams.subscribe(params => this.data = params.id);
    this.getArticleDetail(this.data);
    this.getDistinct();
  }
  checkRole() {
    if (!JSON.parse(localStorage.getItem('currentAppUser'))) {
      return false;
    } else {
      this.checkAdmin = JSON.parse(localStorage.getItem('currentAppUser')).role;

    }
  }
  getArticleDetail(articleId: number) {
    this.articleDetailService.getDetail(articleId).subscribe(result => {
      this.article$ = result;
      console.log(this.article$);
    });
  }

  getDistinct() {
    this.articleDetailService.getDistinct().subscribe(distinct => {
      this.distinct$ = distinct;
      console.log(this.distinct$);
    });
  }
  deleteArticle(id: any): void {
    // console.log(id);
    this.articleDelete$ = [];
    if (confirm('are you sure to delete this article')) {
      this.articleDelete$ = this.articleDelete$.filter(h => h !== id);
      this.articleDetailService.deleteArticle(id).subscribe(
        onSuccess => {
          alert('Xóa câu hỏi thành công!!!');
          window.history.back();
        },
        onFail => {
          alert('Bạn không thể xóa câu hỏi này !!!');
        }
      );
    }
  }
  editArticle(article: Article) {
    this.editArticle$ = article;
    this.dataShareService.setShareData(article);
    this.router.navigate(['./article-post-page'], {queryParams: {id: article.articleId}});
  }
}
