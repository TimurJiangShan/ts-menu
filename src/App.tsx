import { AuthenticatedApp } from "./AuthenticatedApp";
import React from "react";
import "./App.css";
import { UnauthenticatedAPP } from "./unauthenticatedApp";
import { useAuth } from "./context/auth-context";
import { ErrorBoundary } from "./components/errorBoundary";
import { FullPageErrorFallback, FullPageLoading } from "./components/lib";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="App" data-testid="app-screen">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <React.Suspense fallback={<FullPageLoading />}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedAPP />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}
