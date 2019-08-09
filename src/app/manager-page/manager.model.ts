import {ReportsByPageIndex, Tag} from '../qa-page/qa.model';

export class GetObjectReport {
  reportsByPageIndex: ReportsByPageIndex;
  numberOfPages: number;

  constructor() {
  }
}

export class GetObjectTag {
  tagsByPageIndex: Tag;
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
