import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TEXTS } from "../../texts";
import { getRepos } from "../../api/getRepos";
import { UserRepos } from "./UserRepos";
import {
  emptyApiResponse,
  errorApiResponse,
  mockRepos,
  mockReposApiResponse,
  mockUserLogin,
} from "./UserRepos.mocks";

jest.mock("../../api/getRepos");

test("on userLogin button click, show and hide user repos", async () => {
  const user = userEvent.setup();
  (getRepos as jest.Mock).mockReturnValueOnce(mockReposApiResponse);

  render(<UserRepos userLogin={mockUserLogin} />);

  const userButton = screen.getByText(mockUserLogin);

  await user.click(userButton);
  mockRepos.forEach((mockRepo) => {
    expect(screen.getByText(mockRepo.name)).toBeInTheDocument();
    expect(screen.getByText(mockRepo.description)).toBeInTheDocument();
    expect(screen.getByText(mockRepo.stargazers_count)).toBeInTheDocument();
  });

  await user.click(userButton);
  mockRepos.forEach((mockRepo) => {
    expect(screen.queryByText(mockRepo.name)).not.toBeInTheDocument();
    expect(screen.queryByText(mockRepo.description)).not.toBeInTheDocument();
    expect(
      screen.queryByText(mockRepo.stargazers_count)
    ).not.toBeInTheDocument();
  });
});

test("displays no repos text if user has no repos", async () => {
  const user = userEvent.setup();

  (getRepos as jest.Mock).mockReturnValueOnce(emptyApiResponse);

  render(<UserRepos userLogin={mockUserLogin} />);

  const userButton = screen.getByText(mockUserLogin);
  await user.click(userButton);

  expect(screen.getByText(TEXTS.USER_REPOS.NO_REPOS)).toBeInTheDocument();
});

test("displays an error text if there's no response from the api", async () => {
  const user = userEvent.setup();

  (getRepos as jest.Mock).mockReturnValueOnce(errorApiResponse);

  render(<UserRepos userLogin={mockUserLogin} />);

  const userButton = screen.getByText(mockUserLogin);
  await user.click(userButton);

  expect(getRepos).toHaveBeenCalledTimes(1);
  expect(screen.getByText(TEXTS.GENERAL.ERROR)).toBeInTheDocument();
});

test("should trigger the get repos action if there are no repos fetched for the user", async () => {
  const user = userEvent.setup();

  (getRepos as jest.Mock).mockReturnValueOnce(mockReposApiResponse);

  render(<UserRepos userLogin={mockUserLogin} />);

  const userButton = screen.getByText(mockUserLogin);
  await user.click(userButton);

  expect(getRepos).toHaveBeenCalledTimes(1);
});

test("should not trigger the get repos action if repos were already fetched for the user", async () => {
  const user = userEvent.setup();

  (getRepos as jest.Mock).mockReturnValueOnce(mockReposApiResponse);

  render(<UserRepos userLogin={mockUserLogin} />);

  const userButton = screen.getByText(mockUserLogin);
  await user.click(userButton);
  expect(getRepos).toHaveBeenCalledTimes(1);

  mockRepos.forEach((mockRepo) => {
    expect(screen.getByText(mockRepo.name)).toBeInTheDocument();
    expect(screen.getByText(mockRepo.description)).toBeInTheDocument();
    expect(screen.getByText(mockRepo.stargazers_count)).toBeInTheDocument();
  });

  await user.click(userButton);
  expect(getRepos).toHaveBeenCalledTimes(1);
});
