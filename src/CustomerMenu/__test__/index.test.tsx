import React from "react";
import CustomerMenu from "..";
import { act, screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextContext } from "../../context/text-context";
import { JSON_FORMAT_ERROR } from "../../InputText";

describe("UI TEST SUIT", () => {
  const mocksContext = { text: "", setText: () => "" };

  it("Menu has been rendered", () => {
    render(<CustomerMenu />);
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("Menu has not been clicked", () => {
    const handleTest = jest.fn();
    render(<CustomerMenu onTest={handleTest} />);

    userEvent.click(screen.getByRole("menu"));
    expect(handleTest).toHaveBeenCalledTimes(0);
  });

  it("Context has value", () => {
    const mockContext = {
      text: JSON.stringify({ key: "0", title: "testLevel1" }),
      setText: () => {},
    };
    render(
      <TextContext.Provider value={mockContext}>
        <CustomerMenu />
      </TextContext.Provider>
    );
    expect(screen.getByText("testLevel1")).toBeInTheDocument();
  });

  it("Submenu rendered", () => {
    const mockContext = {
      text: JSON.stringify({ key: "0", title: "Province" }),
      setText: () => {},
    };

    const testFailure = () => {
      throw Error;
    };

    render(
      <TextContext.Provider value={mockContext}>
        <CustomerMenu onTest={testFailure} />
      </TextContext.Provider>
    );

    expect(screen.getByRole("least-menu")).toBeTruthy();
  });
});
