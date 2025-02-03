import { ENDPOINTS } from "~/constants/endpoints";
import { request } from "./api";
import { Post, PostResponse } from "~/types/post";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class PostService {
  /**
   * Get all posts
   * @returns Promise<Post[]>
   */
  async getAllPosts(): Promise<Post[]> {
    const response = await request(
      `${API_URL + ENDPOINTS.getAllPosts}`,
      "GET",
      null,
      ""
    );
    if (!Array.isArray(response)) {
      throw new Error("Invalid response format: Expected an array of posts.");
    }
    return response as Post[];
  }

  /**
   * Get a single post
   * @param {string} id - The ID of the post
   * @param {string} token - Bearer token for authorization
   * @returns Promise<Post>
   */
  async getPostById(id: string, token: string): Promise<Post> {
    const response = await request(
      `${API_URL + ENDPOINTS.getPostById}/${id}`,
      "GET",
      null,
      `Bearer ${token}`
    );
    return response as Post;
  }

  /**
   * Create a new post
   * @param {Partial<Post>} data - The data for the new post
   * @param {string} token - Bearer token for authorization
   * @returns Promise<PostResponse>
   */
  async createPost(
    data: Partial<Post>,
    token: string | null
  ): Promise<PostResponse> {
    const response = await request(
      `${API_URL + ENDPOINTS.createPost}`,
      "POST",
      data,
      `Bearer ${token}`
    );
    return response as PostResponse;
  }

  /**
   * Edit an existing post
   * @param {string} id - The ID of the post
   * @param {Partial<PostResponse>} data - The updated data for the post
   * @param {string} token - Bearer token for authorization
   * @returns Promise<PostResponse>
   */
  async editPost(
    id: string,
    data: Partial<PostResponse>,
    token: string
  ): Promise<PostResponse> {
    const response = await request(
      `${API_URL + ENDPOINTS.editPost}/${id}`,
      "PUT",
      data,
      `Bearer ${token}`
    );
    return response as PostResponse;
  }

  /**
   * Delete a post
   * @param {string} id - The ID of the post
   * @param {string} token - Bearer token for authorization
   * @returns Promise<{ message: string }>
   */
  async deletePost(id: string, token: string): Promise<{ message: string }> {
    const response = await request(
      `${API_URL + ENDPOINTS.deletePost}/${id}`,
      "DELETE",
      {},
      `Bearer ${token}`
    );
    return response as { message: string };
  }
}

export const postService = new PostService();
export default postService;
