import React from "react";
import CustomerMenu from "../CustomerMenu";
import InputText from "../InputText";
import { TextContext } from "../context/text-context";
import { useDebounce, useDocumentTitle } from "../utils";

const HomePage: React.FC<{}> = () => {
  const [text, setText] = React.useState("");
  const debouncedText = useDebounce(text, 200);

  useDocumentTitle("Home Page");

  const textValue = {
    text: debouncedText,
    setText,
  };

  return (
    <TextContext.Provider value={textValue}>
      <CustomerMenu />
      <InputText />
    </TextContext.Provider>
  );
};

export default HomePage;
