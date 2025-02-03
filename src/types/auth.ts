export interface UserCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface UserData extends Record<string, unknown> {
  name: string;
  email: string;
  password: string;
  role: "Reader" | "Author";
}
