export interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
}

export interface Repos {
  [login: string]: Repo[];
}

export interface User {
  id: number;
  login: string;
}

export interface UserFormValues {
  queryString: string;
}
