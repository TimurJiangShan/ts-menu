import React, { Dispatch, SetStateAction } from "react";

export type TextContextType = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};

const textContext: TextContextType = {
  text: "",
  setText: (): void => {},
};

export const TextContext = React.createContext<TextContextType>(textContext);
