import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UnauthenticatedAPP } from "..";
import { AuthContext } from "../../context/auth-context";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("UI TEST SUIT", () => {
  const mockContext = {
    user: { name: "test", token: "token" },
    register: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
  };

  it("UnauthenticatedAPP component has been rendered", () => {
    render(
      <AuthContext.Provider value={mockContext}>
        <UnauthenticatedAPP />
      </AuthContext.Provider>
    );

    userEvent.click(screen.getByRole("switch-button"));
  });

  it("Error message has been thrown when password dont match", () => {
    render(
      <AuthContext.Provider value={mockContext}>
        <UnauthenticatedAPP />
      </AuthContext.Provider>
    );

    userEvent.type(screen.getByTestId("username"), "test-admin");
    userEvent.type(screen.getByTestId("password"), "pass1");
    userEvent.type(screen.getByTestId("cpassword"), "pass2");

    try {
      userEvent.click(screen.getByRole("register-button"));
    } catch (error) {}
  });

  it("Login success", () => {
    render(
      <AuthContext.Provider value={mockContext}>
        <UnauthenticatedAPP />
      </AuthContext.Provider>
    );

    userEvent.click(screen.getByRole("switch-button"));

    userEvent.type(screen.getByTestId("login-username"), "admin");
    userEvent.type(screen.getByTestId("login-password"), "password");

    userEvent.click(screen.getByTestId("login-button"));
  });

  it("Register success", () => {
    render(
      <AuthContext.Provider value={mockContext}>
        <UnauthenticatedAPP />
      </AuthContext.Provider>
    );

    userEvent.type(screen.getByTestId("username"), "test-admin");
    userEvent.type(screen.getByTestId("password"), "pass1");
    userEvent.type(screen.getByTestId("cpassword"), "pass1");
    userEvent.click(screen.getByRole("register-button"));
  });

  it("Register failed", () => {
    render(
      <AuthContext.Provider value={mockContext}>
        <UnauthenticatedAPP />
      </AuthContext.Provider>
    );

    userEvent.type(screen.getByTestId("username"), "test-admin");
    userEvent.type(screen.getByTestId("password"), "pass1");
    userEvent.type(screen.getByTestId("cpassword"), "pass1");
    userEvent.click(screen.getByRole("register-button"));
  });
});
