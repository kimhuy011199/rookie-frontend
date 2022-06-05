export interface Notification {
  _id: string;
  userId: string;
  actionId: string;
  action: {
    displayName: string;
    avatarImg: string;
  };
  type: number;
  title: string;
  url: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
}
