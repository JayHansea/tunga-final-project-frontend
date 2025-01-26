export const ENDPOINTS = {
  // Authentication
  register: "/users/register",
  login: "/users/login",

  // Posts
  createPost: "/posts",
  getAllPosts: "/posts",
  getPostById: "/posts/postId",
  editPost: "/posts/postId",
  deletePost: "/posts/postId",

  // Comments
  createComment: "/comments/postId",
  getAllComments: "/comments/postId",
  editComment: "/comments/commentId",
  deleteComment: "/comments/commentId",
};
