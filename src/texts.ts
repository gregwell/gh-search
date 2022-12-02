export const texts = {
  general: {
    error: "General error occured. Try again later.",
    loading: "Loading...",
  },
  app: {
    inputPlaceHolder: "Enter username",
    searchButton: "Search",
  },
  userRepos: {
    noRepos: "User does not have any public repo.",
  },
};

export const getShowingUsersText = (searchString: string): string => {
  return `Showing users for "${searchString}"`;
};
