import { Component, OnInit } from '@angular/core';
import {Article} from './article.model';
import {ArticleService} from './article.service';
import {HeaderComponent} from '../common/header/header.component';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  providers: [ArticleService, HeaderComponent],
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {
  article$: Article[];
  checkAdd$ = 0;
  editArticle$: Article;
  constructor(private articleService: ArticleService) {}
  ngOnInit() {
    this.getArticle();
  }

  getArticle(): void {
    this.articleService.getArticle().subscribe(article => this.article$ = article);
  }
  addArticle(title, content, category: string): void {
    title = title.trim();
    content = content.trim();
    category = category.trim();
    if (!title || !content || !category) { return; }
    const newArticle: Article = {title, content, category} as Article;
    this.articleService.addArticle(newArticle).subscribe(article => this.article$.push(article));
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
  add() {
    this.checkAdd$ = 1;
  }

  editArticle(article) {
    this.editArticle$ = article;
    this.checkAdd$ = 2;
  }

  updateArticle() {
    console.log('title', this.editArticle$.title);
    if (this.editArticle$) {
      this.articleService.updateArticle(this.editArticle$.id, this.editArticle$).subscribe(article => {
        const ix = article ? this.article$.findIndex(h => h.id === article.id) : -1;
        if (ix > -1) {this.article$[ix] = article; }
      });
      // this.editArticle$ = undefined;
    }
  }
}
