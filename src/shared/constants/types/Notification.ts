export interface Notification {
  _id: string;
  userId: string;
  actionId: string;
  action: {
    displayName: string;
  };
  questionId: string;
  question: {
    title: string;
  };
  type: number;
  updatedAt: string;
  createdAt: string;
  __v: number;
}
