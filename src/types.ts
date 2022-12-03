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

export interface UserResponse {
  data: {
    items: User[];
  };
}

export interface ReposResponse {
  data: Repo[];
}

export interface ApiResponse<T> {
  ok: boolean;
  data: T;
  error: string;
}

export interface ApiError {
  message: string;
}

export interface UserFormValues {
  query: string;
}
