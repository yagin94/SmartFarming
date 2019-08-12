import {AppUser} from '../../qa-page/qa.model';

export class AddCommentObj {
  content: string;
  appUser: AppUser;
  article: A;

  constructor(content: string, appUser: AppUser, article: A) {
    this.content = content;
    this.appUser = appUser;
    this.article = article;
  }
}
export class A {
  articleId: number;

  constructor(id: number) {
    this.articleId = id;
  }

}



