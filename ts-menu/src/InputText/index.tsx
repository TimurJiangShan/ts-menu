import * as React from "react";
import { Button, Col, Input, message, Row } from "antd";
import { TextContext } from "../context";
import { treeData } from "../CustomerMenu";
import "./style.css";

const { TextArea } = Input;

const InputText: React.FC<{}> = () => {
  const { text, setText } = React.useContext(TextContext);
  const [textInput, setTextInput] = React.useState("");
  const submitText = (_text: string) => {
    try {
      setText(JSON.parse(_text));
    } catch (e) {
      message.error("Oops, your input is not a json format.");
    }
  };

  return (
    <div>
      <h1>Please Type a proper Json followed by the rule on the right.</h1>
      <Row>
        <Col span={12}>
          <TextArea
            rows={20}
            cols={5}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </Col>
        <Col span={12}>
          <TextArea
            disabled={true}
            rows={20}
            cols={5}
            value={JSON.stringify(treeData, null, 4)}
          />
        </Col>
      </Row>
      <Button
        className="submit-button"
        onClick={() => submitText(textInput)}
        type="primary"
      >
        Submit
      </Button>
    </div>
  );
};

export default InputText;
