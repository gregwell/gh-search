import { TEXTS } from "../../texts";

export const mockUserLogin = "gregor";

export const mockRepos = [
  {
    id: 1,
    name: "name-1",
    description: "description1",
    stargazers_count: 0,
  },
  {
    id: 2,
    name: "name-2",
    description: "description2",
    stargazers_count: 1,
  },
];

export const mockReposApiResponse = {
  ok: true,
  data: mockRepos,
  error: "",
};

export const emptyApiResponse = {
  ok: true,
  data: [],
  error: "",
};

export const errorApiResponse = {
  ok: false,
  data: [],
  error: TEXTS.GENERAL.ERROR,
};
