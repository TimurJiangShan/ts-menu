import React from "react";
import { UnauthenticatedAPP } from "../index";
import { LoginScreen } from "../Login";
import {
  fireEvent,
  render,
  act,
  waitFor,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("UI TEST SUIT", () => {
  it("Login button has been rendered", () => {
    const testError = () => "";
    render(<LoginScreen onError={testError} />);
    const loginButton = screen.getByText("Register");
    expect(loginButton).toBeTruthy();
  });

  it("Login button has been clicked", () => {
    const { getByText } = render(<UnauthenticatedAPP />);
    act(() => {
      userEvent.click(getByText("Login"));
    });

    const loginButton = screen.getByText("Login");

    expect(getByText("Please login")).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(getByText("Cancel")).toBeTruthy();
  });
});

describe("LOGIN API TEST SUIT", () => {
  afterEach(() => {
    mockedAxios.post.mockReset();
  });
  it("API -  ERROR: no username && password", async () => {
    const expectedResult = {};
    mockedAxios.post.mockImplementationOnce(() =>
      Promise.resolve(expectedResult)
    );
    const { getByText } = render(<UnauthenticatedAPP />);

    await waitFor(() => {
      fireEvent.click(getByText("Log in"));
      fireEvent.click(getByText("Login"));
    });
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(mockedAxios.post).toBeCalledWith(
      "http://localhost:8000/user/login",
      { password: "", username: "" }
    );
  });

  it("API -  SUCCESS", async () => {
    const successResult = {
      data: {
        code: 200,
        msg: "Login Success",
      },
    };
    mockedAxios.post.mockImplementationOnce(() =>
      Promise.resolve(successResult)
    );
    const { getByText, getByPlaceholderText } = render(<UnauthenticatedAPP />);
    await waitFor(() => {
      fireEvent.click(getByText("Log in"));
    });
    const username = getByPlaceholderText("username");
    const password = getByPlaceholderText("password");
    await waitFor(() => {
      fireEvent.change(username, { target: { value: "admin" } });
      fireEvent.change(password, { target: { value: "password" } });
    });
    await fireEvent.click(getByText("Login"));
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(mockedAxios.post).toBeCalledWith(
      "http://localhost:8000/user/login",
      { password: "password", username: "admin" }
    );
  });
});
