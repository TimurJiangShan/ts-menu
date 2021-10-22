import React from "react";
import { screen, render } from "@testing-library/react";
import HomePage from "..";

describe("UI TEST SUIT", () => {
  it("Custom menu has been rendered", () => {
    render(<HomePage />);
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("Inpu text component has been rendered", () => {
    render(<HomePage />);
    expect(screen.getByRole("input-text")).toBeInTheDocument();
  });
});
