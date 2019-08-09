import {AppUser, Tag} from '../qa-page/qa.model';
import {UploadedFiles} from './article-post-page/article-post.model';

export class Article {
  articleId: any;
  title: string;
  content: string;
  category: string;
  appUser: AppUser;
  tags: Tag[];
  utilTimestamp: string;
  uploadedFiles: UploadedFiles[];
  comments: any;
  upvotedUserIds: any;
  upvoteCount: number;
  viewCount: number;

  constructor() {
  }
}
