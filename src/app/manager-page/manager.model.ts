import {AppUser, ReportsByPageIndex, Tag} from '../qa-page/qa.model';
import {Article} from '../article-page/article.model';

export class GetObjectReport {
  reportsByPageIndex: ReportsByPageIndex;
  numberOfPages: number;

  constructor() {
  }
}

export class GetObjectTag {
  tagsByPageIndex: Tag;
  numberOfContents: number;
  numberOfPages: number;

  constructor() {
  }
}
export class TextSearch {
  textSearch: string;

  constructor(textSearch: string) {
    this.textSearch = textSearch;
  }
}

export class GetAllArticle {
  numberOfPages: number;
  numberOfContents: number;
  articlesByPageIndex: Article;
  constructor() {
  }
}

export class GetAllUser {
  numberOfPages: number;
  appUsersByPageIndex: AppUser;
  numberOfContents: number;
  constructor() {
  }
}

export class GetReportUser {
  numberOfPages: number;
  numberOfContents: number;
  userAndReportTimes: Report;
}
export class Report {
  rowIndex: number;
  userId: number;
  role: string;
  fullName: string;
  numberOfReports: number;
}

export class DrawChart {
  chartByDate: string;
  chartByMonth: string;
  chartByYear: string;
  totalViewCount: number;
  totalUpvoteCount: number;
  totalNewAccount: number;
  totalInactiveAccount: number;

}

export class BodyJsonDrawChart {
  startTime: string;
  period: number;
}
