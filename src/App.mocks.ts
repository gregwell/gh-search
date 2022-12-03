import { TEXTS } from "./texts";

export const mockUsers = [
  {
    id: 1,
    login: "greg",
  },
  {
    id: 2,
    login: "gregor",
  },
  {
    id: 3,
    login: "gregor1",
  },
  {
    id: 4,
    login: "gregor12",
  },
  {
    id: 5,
    login: "gregor123",
  },
];

export const mockUsersShortQuery = [
  {
    id: 6,
    login: "ga",
  },
  {
    id: 7,
    login: "gb",
  },
  {
    id: 8,
    login: "gc",
  },
  {
    id: 9,
    login: "gd",
  },
  {
    id: 10,
    login: "ge",
  },
];

export const mockUsersApiResponse = {
  ok: true,
  data: mockUsers,
  error: "",
};

export const mockUsersShortQueryApiResponse = {
  ok: true,
  data: mockUsersShortQuery,
  error: "",
};

export const errorApiResponse = {
  ok: false,
  data: [],
  error: TEXTS.GENERAL.ERROR,
};
