import {AppUser, Qa} from '../../qa-page/qa.model';
import {Article} from '../../article-page/article.model';

export class Notifications {
  notificationId: number;
  appUserReceiver: AppUser;
  message: string;
  question: Qa;
  article: Article;
  utilTimestamp: string;
  seen: boolean;
  fromAdmin: boolean
  constructor() {}
}
export class GetNotif {
  notificationsByPageIndex: Notifications;
  numberOfPages: number;
  constructor() {}
}
