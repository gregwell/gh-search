import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { texts } from "../../texts";
import { Repos } from "../../types";
import { getRepos } from "../../api/getRepos";
import { UserRepos } from "./UserRepos";
import { mockEmptyRepos, mockRepos, mockUserLogin } from "./UserRepos.mocks";

jest.mock("../../api/getRepos");

test("on userLogin button click, show and hide user repos", async () => {
  const user = userEvent.setup();

  render(
    <UserRepos
      userLogin={mockUserLogin}
      repos={mockRepos}
      setRepos={() => {}}
    />
  );

  const userButton = screen.getByText(mockUserLogin);

  await user.click(userButton);
  mockRepos[mockUserLogin].forEach((mockRepo) => {
    expect(screen.getByText(mockRepo.name)).toBeInTheDocument();
    expect(screen.getByText(mockRepo.description)).toBeInTheDocument();
    expect(screen.getByText(mockRepo.stargazers_count)).toBeInTheDocument();
  });

  await user.click(userButton);
  mockRepos[mockUserLogin].forEach((mockRepo) => {
    expect(screen.queryByText(mockRepo.name)).not.toBeInTheDocument();
    expect(screen.queryByText(mockRepo.description)).not.toBeInTheDocument();
    expect(
      screen.queryByText(mockRepo.stargazers_count)
    ).not.toBeInTheDocument();
  });
});

test("displays no repos text if user has no repos", async () => {
  const user = userEvent.setup();

  (getRepos as jest.Mock).mockReturnValueOnce(mockEmptyRepos);

  render(
    <UserRepos
      userLogin={mockUserLogin}
      repos={{} as Repos}
      setRepos={() => {}}
    />
  );

  const userButton = screen.getByText(mockUserLogin);
  await user.click(userButton);

  expect(screen.getByText(texts.userRepos.noRepos)).toBeInTheDocument();
});

test("displays an error text if there's no response from the api", async () => {
  const user = userEvent.setup();

  (getRepos as jest.Mock).mockReturnValueOnce(undefined);

  render(
    <UserRepos
      userLogin={mockUserLogin}
      repos={{} as Repos}
      setRepos={() => {}}
    />
  );

  const userButton = screen.getByText(mockUserLogin);
  await user.click(userButton);

  expect(getRepos).toHaveBeenCalledTimes(1);
  expect(screen.getByText(texts.general.error)).toBeInTheDocument();
});

test("should not trigger the get repos action if repos were already fetched for the user", async () => {
  const user = userEvent.setup();

  (getRepos as jest.Mock).mockReturnValueOnce(mockRepos);

  render(
    <UserRepos
      userLogin={mockUserLogin}
      repos={mockRepos}
      setRepos={() => {}}
    />
  );

  const userButton = screen.getByText(mockUserLogin);
  await user.click(userButton);

  expect(getRepos).toHaveBeenCalledTimes(0);
});

// @todo we may also check if the repos are set correctly when triggering getRepos api method
// but it requires keeping some state outside the component (it's about the repos, setRepos state)
// current solution should be fine for now, possibly other state management technique can be implemented in the future
test("should trigger the get repos action if there are no repos fetched for the user", async () => {
  const user = userEvent.setup();

  (getRepos as jest.Mock).mockReturnValueOnce(mockRepos);

  render(
    <UserRepos
      userLogin={mockUserLogin}
      repos={{} as Repos}
      setRepos={() => {}}
    />
  );

  const userButton = screen.getByText(mockUserLogin);
  await user.click(userButton);

  expect(getRepos).toHaveBeenCalledTimes(1);
});
