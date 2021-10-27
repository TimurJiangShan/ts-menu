import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthContext } from "../context/auth-context";
import { UnauthenticatedAPP } from "../unauthenticatedApp";
import { AuthenticatedApp } from "../AuthenticatedApp";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getToken, login, register } from "../auth-provider";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "../HomePage";

jest.mock("axios");

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

  it("Test authenticated app screen", () => {
    render(
      <AuthContext.Provider value={mockContext}>
        <AuthenticatedApp />
      </AuthContext.Provider>
    );

    expect(screen.getByText("Welcome")).toBeInTheDocument();
  });

  it("Logout button has been rendered", () => {
    const mockContext = {
      user: { name: "test", token: "token" },
      register: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
    };

    render(
      <Router>
        <AuthContext.Provider value={mockContext}>
          <AuthenticatedApp />
        </AuthContext.Provider>
      </Router>
    );

    userEvent.click(screen.getByTestId("logout"));
  });
});

describe("TEST AUTH PROVIDER", () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it("Test login function", async () => {
    const mockContext = {
      user: { name: "test", token: "token" },
      register: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
    };

    render(
      <Router>
        <AuthContext.Provider value={mockContext}>
          <UnauthenticatedAPP />
        </AuthContext.Provider>
      </Router>
    );

    server.use(
      rest.post("http://localhost:8000/user/login", (req, res, ctx) =>
        res(ctx.status(200), ctx.json({ message: "test login" }))
      )
    );

    userEvent.click(screen.getByRole("switch-button"));
    userEvent.type(screen.getByTestId("login-username"), "admin");
    userEvent.type(screen.getByTestId("login-password"), "password");

    userEvent.click(screen.getByTestId("login-button"));
    await login({ username: "admin", password: "password" });
  });

  it("Test login function failure", async () => {
    server.use(
      rest.post("http://localhost:8000/user/login", (req, res, ctx) =>
        res(ctx.status(500), ctx.json({ message: "test login failure" }))
      )
    );

    try {
      await login({ username: "admin", password: "password" });
    } catch (error) {}
  });

  it("Test register function", async () => {
    server.use(
      rest.post("http://localhost:8000/user/register", (req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            code: 200,
            msg: "Login Success",
            data: {
              name: "admin",
              token: "token1234567890",
            },
          })
        )
      )
    );

    await register({ username: "register1", password: "password1" });
  });

  it("Test register function failure", async () => {
    server.use(
      rest.post("http://localhost:8000/user/register", (req, res, ctx) =>
        res(ctx.status(500), ctx.json({ message: "test register failure" }))
      )
    );

    try {
      await register({ username: "admin", password: "password" });
    } catch (error) {}
  });

  it("Test getToken function", () => {
    const result = getToken();
    expect(result).toBeTruthy();
  });
});
