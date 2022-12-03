import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getUsers } from "./api/getUsers";

import App from "./App";
import { mockUsers, mockUsersShortQuery } from "./App.mocks";
import { texts } from "./texts";

jest.mock("./api/getUsers");

test("renders the input with placeholder and the search button", () => {
  render(<App />);
  expect(screen.getByText(texts.app.searchButton)).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
});

test("displays the list of users from the api", async () => {
  const user = userEvent.setup();

  (getUsers as jest.Mock).mockReturnValueOnce(mockUsers);

  render(<App />);

  expect(screen.getByText(texts.app.searchButton)).toBeInTheDocument();

  const input = screen.getByPlaceholderText("Enter username");

  await user.click(input);
  await user.type(input, "greg");
  await user.click(screen.getByText(texts.app.searchButton));

  expect(getUsers).toHaveBeenCalledTimes(1);

  mockUsers.forEach((mockUser) => {
    expect(screen.getByText(mockUser.login)).toBeInTheDocument();
  });
});

test("displays other results if other query is entered", async () => {
  const user = userEvent.setup();

  (getUsers as jest.Mock).mockReturnValueOnce(mockUsers);

  render(<App />);

  expect(screen.getByText(texts.app.searchButton)).toBeInTheDocument();

  const input = screen.getByPlaceholderText(texts.app.inputPlaceHolder);

  await user.click(input);
  await user.type(input, "greg");
  await user.click(screen.getByText(texts.app.searchButton));
  expect(getUsers).toHaveBeenCalledTimes(1);
  mockUsers.forEach((mockUser) => {
    expect(screen.getByText(mockUser.login)).toBeInTheDocument();
  });

  (getUsers as jest.Mock).mockReturnValueOnce(mockUsersShortQuery);
  await user.click(input);
  await user.type(input, "g");
  await user.click(screen.getByText(texts.app.searchButton));
  expect(getUsers).toHaveBeenCalledTimes(2);
  mockUsersShortQuery.forEach((mockUser) => {
    expect(screen.getByText(mockUser.login)).toBeInTheDocument();
  });
});

test("displays an error text if there's no response from the api", async () => {
  const user = userEvent.setup();

  (getUsers as jest.Mock).mockReturnValueOnce(undefined);

  render(<App />);

  expect(screen.getByText(texts.app.searchButton)).toBeInTheDocument();

  const input = screen.getByPlaceholderText(texts.app.inputPlaceHolder);

  await user.click(input);
  await user.type(input, "greg");
  await user.click(screen.getByText(texts.app.searchButton));

  expect(getUsers).toHaveBeenCalledTimes(1);
  expect(screen.getByText(texts.general.error)).toBeInTheDocument();
});

test("the submit button triggers a submit action if an error occurred during the last search", async () => {
  const user = userEvent.setup();

  (getUsers as jest.Mock).mockReturnValueOnce(undefined);

  render(<App />);

  expect(screen.getByText(texts.app.searchButton)).toBeInTheDocument();

  const input = screen.getByPlaceholderText(texts.app.inputPlaceHolder);

  await user.click(input);
  await user.type(input, "greg");
  await user.click(screen.getByText(texts.app.searchButton));

  expect(getUsers).toHaveBeenCalledTimes(1);
  expect(screen.getByText(texts.general.error)).toBeInTheDocument();

  await user.click(screen.getByText(texts.app.searchButton));
  expect(getUsers).toHaveBeenCalledTimes(2);
});

test("the submit button doesn't trigger a submit action if no text is entered", async () => {
  const user = userEvent.setup();

  (getUsers as jest.Mock).mockReturnValueOnce(mockUsers);

  render(<App />);

  expect(screen.getByText(texts.app.searchButton)).toBeInTheDocument();

  await user.click(screen.getByText(texts.app.searchButton));

  expect(getUsers).toHaveBeenCalledTimes(0);
});

test("the submit button doesn't trigger a submit action if the text entered is equal to the last search", async () => {
  const user = userEvent.setup();

  (getUsers as jest.Mock).mockReturnValueOnce(mockUsers);

  render(<App />);

  expect(screen.getByText(texts.app.searchButton)).toBeInTheDocument();

  const input = screen.getByPlaceholderText(texts.app.inputPlaceHolder);

  await user.click(input);
  await user.type(input, "greg");
  await user.click(screen.getByText(texts.app.searchButton));
  expect(getUsers).toHaveBeenCalledTimes(1);

  await user.click(screen.getByText(texts.app.searchButton));
  expect(getUsers).toHaveBeenCalledTimes(1);
});
