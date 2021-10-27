import { Button, Card, Divider, Typography } from "antd";
import React from "react";
import { LoginScreen } from "./Login";
import { RegisterScreen } from "./Register";
import logo from "../assets/software-logo.svg";
import left from "../assets/left.svg";
import right from "../assets/right.svg";
import styled from "@emotion/styled";
import { useDocumentTitle } from "../utils";
import { useHistory } from "react-router-dom";

export const UnauthenticatedAPP = () => {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  useDocumentTitle("Please login to continue");
  const history = useHistory();
  const handleGoBack = () => {
    history.push("/");
  };

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRegistered ? "Please Login" : "Please Register"} </Title>
        {error ? (
          <Typography.Text type={"danger"}>{error.message}</Typography.Text>
        ) : null}
        {isRegistered ? (
          <LoginScreen onError={setError} />
        ) : (
          <RegisterScreen onError={setError} />
        )}
        <Divider />
        <Button
          role="switch-button"
          type="link"
          onClick={() => setIsRegistered(!isRegistered)}
        >
          {isRegistered
            ? "No Account? Register new account"
            : "Already have account? Login"}
        </Button>
        <Button data-testid="back-home-button" onClick={handleGoBack}>
          Back
        </Button>
      </ShadowCard>
    </Container>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`;

export const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

export const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

export const Background = styled.div`
  z-index: -10;
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

export const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

export const LargeCard = styled(Card)`
  width: 120rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
