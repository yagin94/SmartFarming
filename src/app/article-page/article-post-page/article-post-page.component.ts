import {Component, OnInit} from '@angular/core';
import {ArticlePostService} from './article-post.service';
import {AppUser, Tag} from '../../qa-page/qa.model';
import {AddArticle} from './article-post.model';

@Component({
  selector: 'app-article-post-page',
  templateUrl: './article-post-page.component.html',
  styleUrls: ['./article-post-page.component.css'],
  providers: [ArticlePostService]
})
export class ArticlePostPageComponent implements OnInit {
  data: any;
  subString: string[];
  tag: Tag;
  tags: Tag[];
  uploadedFiles$: any[];
  appUser$: AppUser;
  selectedValue$: string;
  public model = {
    editorData: '',
    default: ''
  };

  constructor(private articlePostService: ArticlePostService) {
  }

  ngOnInit() {
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
    a.appUser.userId = 418;
    a.tags = this.tags;
    a.uploadedFiles = [];
    a.category = selected;
     this.articlePostService.addArticle(a).subscribe();
  }
}
