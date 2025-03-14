import { ENDPOINTS } from "~/constants/endpoints";
import { request } from "./api";
import { LoginResponse } from "~/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class AuthService {
  /**
   * Create a new user
   * @param {Record<string, unknown>} data - User registration data
   * @returns Promise<unknown>
   */
  createUser(data: Record<string, unknown>): Promise<unknown> {
    return request(API_URL + ENDPOINTS.register, "POST", data, "");
  }

  /**
   * Sign in a user
   * @param {Record<string, unknown>} data - User login data
   * @returns Promise<LoginResponse>
   */
  signinUser(data: Record<string, unknown>): Promise<LoginResponse> {
    // Specify LoginResponse as the expected type
    return request<LoginResponse>(API_URL + ENDPOINTS.login, "POST", data, "");
  }

  /**
   *
   * @param {Record<string, unknown>} data
   * @returns promise
   */
  resetPassword(data: Record<string, unknown>) {
    return request(API_URL + ENDPOINTS.resetPassword, "POST", data, "");
  }

  /**
   *
   * @param {Record<string, unknown>} data
   * @returns promise
   */
  forgotPassword(data: Record<string, unknown>) {
    return request(API_URL + ENDPOINTS.forgotPassword, "POST", data, "");
  }

  /**
   *
   * @param {Record<string, unknown>} data
   * @returns promise
   */
  sendVerification(data: Record<string, unknown>) {
    return request(API_URL + ENDPOINTS.sendVerification, "POST", data, "");
  }

  /**
   *
   * @param {Record<string, unknown>} data
   * @returns promise
   */
  verifyEmail(data: Record<string, unknown>) {
    return request(API_URL + ENDPOINTS.emailVerify, "POST", data, "");
  }
}

export const authService = new AuthService();
export default authService;
