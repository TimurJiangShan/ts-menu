import React from "react";
import { screen, render } from "@testing-library/react";
import { ErrorBoundary } from "../errorBoundary";
import {
  FullPageErrorFallback,
  FullPageLoading,
  ErrorBox,
} from "../../components/lib";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

const Bomb = ({ shouldThrow }: any) => {
  if (shouldThrow) {
    throw new Error("Some error I made up to test");
  } else {
    return <div>success</div>;
  }
};

test("Render error boundary componenet", () => {
  render(
    <ErrorBoundary fallbackRender={FullPageErrorFallback}>
      <React.Suspense fallback={<FullPageLoading />}>
        <Bomb shouldThrow={true} />
      </React.Suspense>
    </ErrorBoundary>
  );

  expect(screen.getByText("Some error I made up to test")).toBeInTheDocument();
});

test("Not render error boundary componenet", () => {
  render(
    <ErrorBoundary fallbackRender={FullPageErrorFallback}>
      <React.Suspense fallback={<FullPageLoading />}>
        <Bomb shouldThrow={false} />
      </React.Suspense>
    </ErrorBoundary>
  );

  render(<ErrorBox error={null} />);
  expect(screen.getByText("success")).toBeInTheDocument();
});
