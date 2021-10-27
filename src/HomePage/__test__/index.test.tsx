import React from "react";
import { screen, render } from "@testing-library/react";
import HomePage from "..";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";

describe("UI TEST SUIT", () => {
  it("Custom menu has been rendered", () => {
    render(<HomePage />);
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("Input text component has been rendered", () => {
    render(<HomePage />);
    expect(screen.getByRole("input-text")).toBeInTheDocument();
  });

  it("Test login function", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    userEvent.click(screen.getByTestId("show-login-button"));
  });
});
