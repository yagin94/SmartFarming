import {Component, OnInit} from '@angular/core';
import {ArticlePostService} from './article-post.service';
import {AppUser, Tag} from '../../qa-page/qa.model';
import {AddArticle} from './article-post.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleDetailService} from '../article-detail-page/detail.service';
import {Article} from '../article.model';

@Component({
  selector: 'app-article-post-page',
  templateUrl: './article-post-page.component.html',
  styleUrls: ['./article-post-page.component.css'],
  providers: [ArticlePostService, ArticleDetailService]
})
export class ArticlePostPageComponent implements OnInit {
  data: any;
  subString: string[];
  tag: Tag;
  tags: Tag[];
  uploadedFiles$: any[];
  appUser$: AppUser;
  selectedValue$ = 'kỹ thuật trồng';
  article$: Article = new Article();
  public model = {
    editorData: '',
    default: ''
  };

  constructor(private articlePostService: ArticlePostService,
              private route: ActivatedRoute,
              private router: Router,
              private articleDetailService: ArticleDetailService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.data = params.id);
    this.getArticleDetail(this.data);
  }

  addArticle(title: string, array: string, selected: string) {
    this.tags = [];
    this.subString = [];
    this.subString = array.split(',');
    for (let i = 0; i < this.subString.length; i++) {
      this.tag = new Tag(this.subString[i], 'dfasdfasdfasdf');
      this.tags.push(this.tag);
    }
    const a: AddArticle = new AddArticle();
    a.title = title;
    a.content = this.model.editorData;
    a.appUser = new AppUser();
    a.appUser.userId = JSON.parse(localStorage.getItem('currentAppUser')).userId;
    a.tags = this.tags;
    a.uploadedFiles = [];
    a.category = selected;
     this.articlePostService.addArticle(a).subscribe();
  }
  getArticleDetail(articleId: number) {
    this.articleDetailService.getDetail(articleId).subscribe(result => {
      this.article$ = result;
      this.model.default = this.article$.content;
        console.log(this.article$);
    });
  }
  updateArticle(title: string, array: string, selected: string) {
    this.tags = [];
    this.subString = [];
    this.subString = array.split(',');
    for (let i = 0; i < this.subString.length; i++) {
      this.tag = new Tag(this.subString[i], 'dfasdfasdfasdf');
      this.tags.push(this.tag);
    }
    const a: AddArticle = new AddArticle();
    a.title = title;
    a.content = this.model.default;
    a.appUser = new AppUser();
    a.appUser.userId = JSON.parse(localStorage.getItem('currentAppUser')).userId;
    a.tags = this.tags;
    a.uploadedFiles = [];
    a.category = selected;
    this.articlePostService.updateArticle(this.data, a).subscribe();
    window.location.replace(`/article-detail-page?id=${this.data}`);
  }

}
