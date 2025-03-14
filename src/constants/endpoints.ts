export const ENDPOINTS = {
  // Authentication
  register: "/users/register",
  login: "/users/login",
  forgotPassword: "/users/forgot-password",
  resetPassword: "/users/reset-password",
  sendVerification: "/users/send-verification",
  emailVerify: "/users/verify-email",

  // Posts
  createPost: "/posts",
  getAllPosts: "/posts",
  getPostById: "/posts",
  editPost: "/posts",
  deletePost: "/posts",

  // Comments
  createComment: "/comments",
  getAllComments: "/comments",
  editComment: "/comments",
  deleteComment: "/comments",
};
