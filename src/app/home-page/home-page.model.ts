import {AppUser, Qa, Tag} from '../qa-page/qa.model';
import {Article} from '../article-page/article.model';

export class GetArticleHome {
  articleId: number;
  title: string;
  content: string;
  category: string;
  appUser: AppUser;
  tag: Tag[];
  utilTimestamp: number;
  uploadedFiles: any[];
  comments: any[];
  upvotedUserIds: number[];
  upvotecount: number;
  viewcount: number;
}

export class GetTopArticle {
  numberOfPages: number;
  articlesByPageIndex: GetArticleHome;
}

export class GetTopQuestion {
  numberOfPages: number;
  qa: Qa;
}
export class SearchText {
  textSearch: string;
}
