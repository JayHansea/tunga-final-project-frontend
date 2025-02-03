export interface Post {
  _id: string;
  title: string;
  content: string;
  categories: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  authorId: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface PostResponse {
  message: string;
  post: Post;
}
