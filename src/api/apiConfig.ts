export const apiConfig = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_AUTH_TOKEN}`,
    Accept: "application/vnd.github+json",
  },
};
