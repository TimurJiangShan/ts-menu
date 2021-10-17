import React from "react";
import CustomerMenu from "..";
import { act, fireEvent, render } from "@testing-library/react";
import { TextContext } from "../../context/text-context";

describe("UI TEST SUIT", () => {
  it("Header has been rendered", () => {
    const { getByText } = render(<CustomerMenu />);
    expect(getByText("Australia")).toBeInTheDocument();
  });

  it("Header has been clicked", () => {
    const { getByText } = render(<CustomerMenu />);
    act(() => {
      fireEvent.click(getByText("Australia"));
    });

    expect(getByText("NSW")).toBeInTheDocument();
    expect(getByText("QUD")).toBeInTheDocument();
  });

  it("Context is empty", () => {
    const mocksContext = { text: "", setText: () => "" };
    const { getByText } = render(
      <TextContext.Provider value={mocksContext}>
        <CustomerMenu />
      </TextContext.Provider>
    );

    act(() => {
      fireEvent.click(getByText("Australia"));
    });

    expect(getByText("NSW")).toBeInTheDocument();
    expect(getByText("QUD")).toBeInTheDocument();
  });

  it("Context has value", () => {
    const mocksContext = {
      text: JSON.stringify({ key: "0", title: "testLevel1" }),
      setText: () => {},
    };
    const { getByText } = render(
      <TextContext.Provider value={mocksContext}>
        <CustomerMenu />
      </TextContext.Provider>
    );
    expect(getByText("testLevel1")).toBeInTheDocument();
  });
});
