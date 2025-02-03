interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Comment {
  _id: string;
  content: string;
  postId: string;
  userId: User;
  createdAt: string;
  updatedAt: string;
  editMode: boolean;
}

export type Comments = Comment[];
