import React from "react";
import CustomerMenu from "../CustomerMenu";
import InputText from "../InputText";
import styled from "@emotion/styled";
import { TextContext } from "../context/text-context";
import { useDebounce, useDocumentTitle } from "../utils";
import {
  Background,
  Header,
  LargeCard,
  Container,
} from "../unauthenticatedApp";

const HomePage: React.FC<{}> = () => {
  const [text, setText] = React.useState("");
  const debouncedText = useDebounce(text, 200);

  useDocumentTitle("Home Page", false);

  const textValue = {
    text: debouncedText,
    setText,
  };

  return (
    <TextContext.Provider value={textValue}>
      <Container>
        <Header />
        <Background />
        <LargeCard>
          <InnerContainer>
            <CustomerMenu />
            <InputText />
          </InnerContainer>
        </LargeCard>
      </Container>
    </TextContext.Provider>
  );
};

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export default HomePage;
