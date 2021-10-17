import React from "react";
import CustomerMenu from "../CustomerMenu";
import InputText from "../InputText";
import { TextContext } from "../context/text-context";
import { useDebounce } from "../utils";

const HomePage: React.FC<{}> = () => {
  const [text, setText] = React.useState("");
  const debouncedText = useDebounce(text, 200);

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
