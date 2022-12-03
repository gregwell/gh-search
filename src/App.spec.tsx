import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getUsers } from "./api/getUsers";

import App from "./App";
import {
  errorApiResponse,
  mockUsers,
  mockUsersApiResponse,
  mockUsersShortQuery,
  mockUsersShortQueryApiResponse,
} from "./App.mocks";
import { TEXTS } from "./texts";

jest.mock("./api/getUsers");

test("renders the input with placeholder and the search button", () => {
  render(<App />);
  expect(screen.getByText(TEXTS.APP.SEARCH)).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
});

test("displays the list of users from the api", async () => {
  const user = userEvent.setup();

  (getUsers as jest.Mock).mockReturnValueOnce(mockUsersApiResponse);

  render(<App />);

  expect(screen.getByText(TEXTS.APP.SEARCH)).toBeInTheDocument();

  const input = screen.getByPlaceholderText("Enter username");

  await user.click(input);
  await user.type(input, "greg");
  await user.click(screen.getByText(TEXTS.APP.SEARCH));

  expect(getUsers).toHaveBeenCalledTimes(1);

  mockUsers.forEach((mockUser) => {
    expect(screen.getByText(mockUser.login)).toBeInTheDocument();
  });
});

test("displays other results if other query is entered", async () => {
  const user = userEvent.setup();

  (getUsers as jest.Mock).mockReturnValueOnce(mockUsersApiResponse);

  render(<App />);

  expect(screen.getByText(TEXTS.APP.SEARCH)).toBeInTheDocument();

  const input = screen.getByPlaceholderText(TEXTS.APP.INPUT_PLACEHOLDER);

  await user.click(input);
  await user.type(input, "greg");
  await user.click(screen.getByText(TEXTS.APP.SEARCH));
  expect(getUsers).toHaveBeenCalledTimes(1);
  mockUsers.forEach((mockUser) => {
    expect(screen.getByText(mockUser.login)).toBeInTheDocument();
  });

  (getUsers as jest.Mock).mockReturnValueOnce(mockUsersShortQueryApiResponse);
  await user.click(input);
  await user.type(input, "g");
  await user.click(screen.getByText(TEXTS.APP.SEARCH));
  expect(getUsers).toHaveBeenCalledTimes(2);
  mockUsersShortQuery.forEach((mockUser) => {
    expect(screen.getByText(mockUser.login)).toBeInTheDocument();
  });
});

test("displays an error text if there's no response from the api", async () => {
  const user = userEvent.setup();

  (getUsers as jest.Mock).mockReturnValueOnce(errorApiResponse);

  render(<App />);

  expect(screen.getByText(TEXTS.APP.SEARCH)).toBeInTheDocument();

  const input = screen.getByPlaceholderText(TEXTS.APP.INPUT_PLACEHOLDER);

  await user.click(input);
  await user.type(input, "greg");
  await user.click(screen.getByText(TEXTS.APP.SEARCH));

  expect(getUsers).toHaveBeenCalledTimes(1);
  expect(screen.getByText(TEXTS.GENERAL.ERROR)).toBeInTheDocument();
});

test("the submit button triggers a submit action if an error occurred during the last search", async () => {
  const user = userEvent.setup();

  (getUsers as jest.Mock).mockReturnValueOnce(errorApiResponse);

  render(<App />);

  expect(screen.getByText(TEXTS.APP.SEARCH)).toBeInTheDocument();

  const input = screen.getByPlaceholderText(TEXTS.APP.INPUT_PLACEHOLDER);

  await user.click(input);
  await user.type(input, "greg");
  await user.click(screen.getByText(TEXTS.APP.SEARCH));

  expect(getUsers).toHaveBeenCalledTimes(1);
  expect(screen.getByText(TEXTS.GENERAL.ERROR)).toBeInTheDocument();

  await user.click(screen.getByText(TEXTS.APP.SEARCH));
  expect(getUsers).toHaveBeenCalledTimes(2);
});

test("the submit button doesn't trigger a submit action if no text is entered", async () => {
  const user = userEvent.setup();

  (getUsers as jest.Mock).mockReturnValueOnce(mockUsersApiResponse);

  render(<App />);

  expect(screen.getByText(TEXTS.APP.SEARCH)).toBeInTheDocument();

  await user.click(screen.getByText(TEXTS.APP.SEARCH));

  expect(getUsers).toHaveBeenCalledTimes(0);
});

test("the submit button doesn't trigger a submit action if the text entered is equal to the last search", async () => {
  const user = userEvent.setup();

  (getUsers as jest.Mock).mockReturnValueOnce(mockUsersApiResponse);

  render(<App />);

  expect(screen.getByText(TEXTS.APP.SEARCH)).toBeInTheDocument();

  const input = screen.getByPlaceholderText(TEXTS.APP.INPUT_PLACEHOLDER);

  await user.click(input);
  await user.type(input, "greg");
  await user.click(screen.getByText(TEXTS.APP.SEARCH));
  expect(getUsers).toHaveBeenCalledTimes(1);

  await user.click(screen.getByText(TEXTS.APP.SEARCH));
  expect(getUsers).toHaveBeenCalledTimes(1);
});
