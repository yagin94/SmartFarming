export class Qa {
  id: number;
  title: string;
  content: string;
  answers: Answers;
  viewCount: number;
  fileDownloadUris: FileDownloadUris;
  tag: Tag;
  utilTimestamp: string;
  constructor() {}
}
export class Answers {
  id: number;
  content: string;
  constructor(id: number, content: string) {
    this.id = id;
    this.content = content;
  }
}
export class Tag {
  tagId: number;
  name: string;
  description: string;
  reputation: number;
  viewCount: number;
}

export class FileDownloadUris {
  uri: string;
}

export class AddAnsObj {
  content: string;
  question: Q;
  constructor(content: string, question: Q) {
    this.content = content;
    this.question = question;
  }
}

export class Q {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}

export class TextSearch {
  textSearch: string;
  constructor(textSearch: string) {
    this.textSearch = textSearch ;
  }
}
