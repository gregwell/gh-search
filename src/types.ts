export interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
}

export interface User {
  id: number;
  login: string;
}

export interface UserFormValues {
  query: string;
}

export interface ApiResponse<T> {
  ok: boolean;
  data: T;
  error: string;
}

export interface ApiError {
  message: string;
}
