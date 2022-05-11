export interface Answer {
  _id: string;
  userId: string;
  questionId: string;
  content: string;
  userLikes: object;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
