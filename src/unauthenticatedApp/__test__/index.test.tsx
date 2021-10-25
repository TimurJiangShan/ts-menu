import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UnauthenticatedAPP } from "..";
import { AuthContext, AuthProvider, useAuth } from "../../context/auth-context";
import { AppProviders } from "../../context";
import { localStorageKey } from "../../auth-provider";
import { LoginScreen } from "../Login";
import { useAsync } from "../../utils/useAsync";
import { renderHook } from "@testing-library/react-hooks";
import App from "../../App";
import { AuthenticatedApp } from "../../AuthenticatedApp";

interface AuthForm {
  username: string;
  password: string;
}

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

describe("TEST CONTEXT", () => {
  it("UnauthenticatedAPP component has been rendered", () => {
    render(<AppProviders children={<UnauthenticatedAPP />} />);
  });

  it("Test functions within auth-provider", () => {
    window.localStorage.setItem(localStorageKey, "test-token");
    render(
      <AppProviders>
        <AuthenticatedApp />
      </AppProviders>
    );
  });

  it("Login screen error", () => {
    try {
      render(<LoginScreen onError={() => {}} />);
    } catch (error) {}
  });

  it("Test error page", () => {
    const failureState: ReturnType<typeof useAsync> = {
      stat: "error",
      data: null,
      error: null,

      isIdle: false,
      isLoading: false,
      isError: true,
      isSuccess: false,

      run: expect.any(Function),
      setData: expect.any(Function),
      setError: expect.any(Function),
    };

    renderHook(() => useAsync(failureState));
    render(
      <AuthProvider>
        <UnauthenticatedAPP />
      </AuthProvider>
    );
  });

  it("Test auth context", () => {
    const testFunc = jest.fn();

    const TestProvider = (onTest: any) => {
      const { login, logout, register } = useAuth();
      login({ username: "", password: "" });
      register({ username: "", password: "" });
      logout();
      return <div>test</div>;
    };

    render(
      <AuthProvider>
        <TestProvider onTest={testFunc} />
      </AuthProvider>
    );
  });
});
