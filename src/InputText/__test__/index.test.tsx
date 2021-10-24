import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputText, { JSON_FORMAT_ERROR } from "../index";

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

describe("Textarea test suit", () => {
  const buildLoginForm = () => {
    return {
      textareaInput: "123",
    };
  };

  it("Title label has been rendered", () => {
    render(<InputText />);
    const titleLabel = screen.getByText(
      "Please input JSON the same format as right side"
    );
    expect(titleLabel).toBeTruthy();
  });

  it("Textarea input can enter strings", () => {
    render(<InputText />);
    const { textareaInput } = buildLoginForm();

    userEvent.type(screen.getByRole("textarea-input"), textareaInput);
    expect(screen.getByText(textareaInput)).toBeInTheDocument();
  });
});

describe("Submit button test suit", () => {
  const buildLoginForm = () => {
    return {
      textareaInput: "123",
    };
  };

  it("Submit button called when click it", () => {
    const handleSubmit = jest.fn();
    render(<InputText onSubmission={handleSubmit} />);
    const { textareaInput } = buildLoginForm();

    userEvent.type(screen.getByRole("textarea-input"), textareaInput);
    userEvent.click(screen.getByRole("submit-button"));
    setTimeout(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    }, 1000);
  });

  it("Submit button called when input is invalid", () => {
    const handleSubmit = jest.fn();
    render(<InputText onSubmission={handleSubmit} />);

    userEvent.type(screen.getByRole("textarea-input"), "");
    userEvent.click(screen.getByRole("submit-button"));

    expect(handleSubmit).toHaveBeenCalledTimes(0);
  });

  it("Error message shows when the input is invalid", () => {
    const handleSubmit = jest.fn();
    render(<InputText onSubmission={handleSubmit} />);

    userEvent.type(screen.getByRole("textarea-input"), "");
    userEvent.click(screen.getByRole("submit-button"));

    expect(screen.getAllByText(JSON_FORMAT_ERROR)).toBeTruthy();
  });
});
