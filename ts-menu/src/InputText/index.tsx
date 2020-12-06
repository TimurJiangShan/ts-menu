import React from "react";
import { Button, Col, Input, message, Row } from "antd";
import { TextContext } from "../context";
import { treeData } from "../CustomerMenu";
import "./style.css";

const { TextArea } = Input;
export const JSON_FORMAT_ERROR="Oops, your input is not a required json format."
const InputText: React.FC<{}> = () => {
  const { setText } = React.useContext(TextContext);
  const [textInput, setTextInput] = React.useState("");

  const submitText = (_text: string) => {
    try {
      setText(_text);
    } catch (e) {
      message.error(JSON_FORMAT_ERROR);
    }
  };

  return (
    <div>
      <h1>Please input JSON the same format as right side</h1>
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
