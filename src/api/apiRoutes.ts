export const API_ROUTES = {
  USERS: "https://api.github.com/search/users",
  REPOS: (userName: string) => {
    return `https://api.github.com/users/${userName}/repos`;
  },
};
