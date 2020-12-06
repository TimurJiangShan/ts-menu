import React from "react";
import CustomerMenu from "../CustomerMenu";
import LoginForm from "../LoginForm";
import "./style.css";
import InputText from "../InputText";
import { TextContext } from "../context";

const HomePage: React.FC<{}> = () => {
  const [text, setText] = React.useState("");
  const textValue = {
    text,
    setText,
  };

  return (
    <TextContext.Provider value={textValue}>
      <div className="header-container">
        <CustomerMenu />
        <LoginForm />
      </div>
      <div className="content-container">
        <InputText />
      </div>
    </TextContext.Provider>
  );
};

export default HomePage;
