import React from "react";
import { useAuth } from "./context/auth-context";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import {
  Background,
  Container,
  Header,
  ShadowCard,
  Title,
} from "./unauthenticatedApp";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  const history = useHistory();
  const handleLogout = () => {
    logout();
    history.push("/");
  };

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>Welcome</Title>
        <Button onClick={handleLogout} data-testid="logout">
          Logout
        </Button>
      </ShadowCard>
    </Container>
  );
};
