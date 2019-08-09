export class User {
  user_id: number;
  user_name: string;
  email: string;
  first_name: string;
  last_name: string;
  encrypted_password: string;
  enable: boolean;
  constructor() {}
}

export class UserDetail {
  date: string;
  numberOfQuestion: number;
  numberOfAnswer: number;
  numberOfComment: number;
  totalQuestionReputation: number;
  totalAnswerReputation: number;
  totalCommentReputation: number;
  totalQuestionViewCount: number;
  constructor() {}
}
