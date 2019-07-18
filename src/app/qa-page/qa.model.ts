import {SocialUser} from 'angularx-social-login';

export class GetObject {
  qa: Qa;
  numberOfPages: number;
}

export class Qa {
  questionId: number;
  title: string;
  content: string;
  answers: Answers;
  viewCount: number;
  fileDownloadUris: string[];
  tags: Tag[];
  appUser: AppUser;
  utilTimestamp: string;
  userName: string;

  constructor(title: string, content: string, appUser: AppUser, tags: Tag[], fileDownloadUris: string[], userName: string) {
    this.title = title;
    this.content = content;
    this.appUser = appUser;
    this.tags = tags;
    this.fileDownloadUris = fileDownloadUris;
    this.userName = userName;
  }
}

export class Answers {
  answerId: number;
  content: string;
  appUser: AppUser;
  utilTimestamp: string;
  comments: string[];
  upvotedUserIds: number[];
  accepted: boolean;

  constructor(
    answerId: number, content: string, appUser: AppUser, utilTimestamp: string, comments: string[], upvotedUserIds: number[], accepted: boolean) {
    this.answerId = answerId;
    this.content = content;
    this.appUser = appUser;
    this.utilTimestamp = utilTimestamp;
    this.comments = comments;
    this.upvotedUserIds = upvotedUserIds;
    this.accepted = accepted;
  }
}

export class AppUser {

  userId: number;
  ipAddress: string;
  anonymous: boolean;
  socialUser: SocialUser;
  // questions: Qa[];
  // answers: Answers[];
  reputation: number;
  viewCount: number;
  cvUrl: string;
  role: string;

  constructor() {
  }
}

export class Tag {
  tagId: number;
  name: string;
  description: string;
  reputation: number;
  viewCount: number;

  constructor(name: string, description: string) {
    // this.tagId = tagId;
    this.name = name;
    this.description = description;
    // this.reputation = reputation;
    // this.viewCount = viewCount;
  }
}

export class AddAnsObj {
  content: string;
  appUser: AppUser;
  question: Q;

  constructor(content: string, appUser: AppUser, question: Q) {
    this.content = content;
    this.appUser = appUser;
    this.question = question;
  }
}

export class Q {
  questionId: number;

  constructor(id: number) {
    this.questionId = id;
  }
}

export class TextSearch {
  textSearch: string;

  constructor(textSearch: string) {
    this.textSearch = textSearch;
  }
}
