import {Article} from '../article.model';

export class GetAllArticle {
  numberOfPages: number;
  numberOfContents: number;
  articlesByPageIndex: Article[];

  constructor() {
  }
}
