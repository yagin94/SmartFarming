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
  comments: Comments;
  upvotedUserIds: any;
  upvoteCount: number;
  viewCount: number;

  constructor() {
  }
}
export class Comments {
  commentId: number;
  content: string;
  appUser: AppUser;
  utilTimestamp: string;
  upvotedUserIds: any;
  upvoteCount: any;
  constructor() {

  }
}
