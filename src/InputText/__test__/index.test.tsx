import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputText from "../index";

describe("UI TEST SUIT", () => {
  it("Title label has been rendered", () => {
    render(<InputText />);
    const titleLabel = screen.getByText(
      "Please input JSON the same format as right side"
    );
    expect(titleLabel).toBeTruthy();
  });

  it("Textarea input has been rendered", () => {
    render(<InputText />);
    const titleLabel = screen.getByRole("textarea-input");
    expect(titleLabel).toBeTruthy();
  });

  it("Textarea output has been rendered", () => {
    render(<InputText />);
    const titleLabel = screen.getByRole("textarea-output");
    expect(titleLabel).toBeTruthy();
  });

  it("Submit button has been rendered", () => {
    render(<InputText />);
    const titleLabel = screen.getByRole("submit-button");
    expect(titleLabel).toBeTruthy();
  });
});

describe("INPUT FUNCTION TEST SUIT", () => {
  it("Title label has been rendered", () => {
    render(<InputText />);
    const titleLabel = screen.getByText(
      "Please input JSON the same format as right side"
    );
    expect(titleLabel).toBeTruthy();
  });
});
