import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Article} from './article.model';
import {ArticleService} from './article.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  providers: [ArticleService],
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {
  article$: Article[];
  constructor(private articleService: ArticleService) {}
  ngOnInit() {
    this.getArticle();
  }

  getArticle(): void {
    this.articleService.getArticle().subscribe(article => this.article$ = article);
  }

  deleteArticle(article: Article): void {
    if (confirm ('are you sure to delete this article')) {
      this.article$ = this.article$.filter(h => h !== article);
      this.articleService.deleteArticle(article.id).subscribe();
    }
  }
  searchArticle(searchTerm: string) {
    if (searchTerm) {
      this.articleService.searchArticle(searchTerm).subscribe(article => this.article$ = article);
    }
  }
}
