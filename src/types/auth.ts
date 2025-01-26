export interface UserCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface UserData extends Record<string, unknown> {
  name: string;
  email: string;
  password: string;
  role: "Reader" | "Author";
}
