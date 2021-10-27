import { AuthenticatedApp } from "./AuthenticatedApp";
import React from "react";
import "./App.css";
import { UnauthenticatedAPP } from "./unauthenticatedApp";
import { useAuth } from "./context/auth-context";
import { ErrorBoundary } from "./components/errorBoundary";
import { FullPageErrorFallback, FullPageLoading } from "./components/lib";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";

export default function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="App" data-testid="app-screen">
        <ErrorBoundary fallbackRender={FullPageErrorFallback}>
          <React.Suspense fallback={<FullPageLoading />}>
            <Switch>
              {user && (
                <Route path="/homepage">
                  <AuthenticatedApp />
                </Route>
              )}
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/login">
                <UnauthenticatedAPP />
              </Route>
            </Switch>
          </React.Suspense>
        </ErrorBoundary>
      </div>
    </Router>
  );
}
