import styled from "@emotion/styled";
import React from "react";
import { useAuth } from "./context/auth-context";
import { Row } from "./components/lib";
import HomePage from "./HomePage";
import { ReactComponent as SoftwareLogo } from "./assets/react-logo.svg";
import { Dropdown, Menu, Button } from "antd";

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <HomePage />
      </Main>
    </Container>
  );
};

const PageHeader = () => {
  const { logout } = useAuth();

  return (
    <Header between={true}>
      <HeaderLeft gap={true} between={true}>
        <SoftwareLogo
          width={"6rem"}
          height={"6rem"}
          color={"rgb(38,132,255)"}
        />
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <Button onClick={logout} type={"link"}>
                  Logout
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type={"link"} onClick={(e) => e.preventDefault()}>
            Hi !
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled(Row)``;
const Main = styled.div``;
