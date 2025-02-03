import { ENDPOINTS } from "~/constants/endpoints";
import { request } from "./api";
import { Comments } from "~/types/comment";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class CommentService {
  /**
   * get all comments
   * @param {string} id
   * @param {string} token
   * @returns Promise<Comments>;
   */
  getAllComments(id: string, token: string): Promise<Comments> {
    return request(
      `${API_URL + ENDPOINTS.getAllComments + "/" + id}`,
      "GET",
      {},
      `Bearer ${token}`
    );
  }

  /**
   * make a comment
   * @param {string} id
   * @param {object} data
   * @param {string} token
   * @returns response data;
   */
  createComment(id: string, data: object, token: string) {
    return request(
      `${API_URL + ENDPOINTS.createComment + "/" + id}`,
      "POST",
      data,
      `Bearer ${token}`
    );
  }

  /**
   * edit a comment
   * @param {string} id
   * @param {object} data
   * @param {string} token
   * @returns response data;
   */
  editComment(id: string, data: object, token: string) {
    return request(
      `${API_URL + ENDPOINTS.editComment + "/" + id}`,
      "PUT",
      data,
      `Bearer ${token}`
    );
  }

  /**
   * delete a comment
   * @param {string} id
   * @param {string} token
   * @returns response data;
   */
  deleteComment(id: string, token: string) {
    return request(
      `${API_URL + ENDPOINTS.deleteComment + "/" + id}`,
      "DELETE",
      {},
      `Bearer ${token}`
    );
  }
}

export const commentService = new CommentService();
export default commentService;
