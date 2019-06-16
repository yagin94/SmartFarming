export class Qa {
  id: number;
  title: string;
  content: string;
  answers: Answers;
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
