export const TEXTS = {
  GENERAL: {
    ERROR: "General error occured. Try again later.",
    NETWORK_ERROR: "Network error occured. Check your internet connection.",
    LOADING: "Loading...",
  },
  APP: {
    INPUT_PLACEHOLDER: "Enter username",
    SEARCH: "Search",
    SHOWING_USERS: (searchString: string) => {
      return `Showing users for "${searchString}"`;
    },
  },
  USER_REPOS: {
    NO_REPOS: "User does not have any public repo.",
  },
};
