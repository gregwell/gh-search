export const mockUserLogin = "gregor";

export const mockRepos = {
  [mockUserLogin]: [
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
  ],
};

export const mockEmptyRepos = {
  [mockUserLogin]: [],
};
