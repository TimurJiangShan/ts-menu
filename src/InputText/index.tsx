import React from "react";
import { Button, Col, Input, message, Row } from "antd";
import { TextContext } from "../context/text-context";
import { treeData } from "../CustomerMenu";
import styled from "@emotion/styled";
import { isVoid } from "../utils/index";

interface InputTextProps {
  onSubmission?: () => void;
}

const { TextArea } = Input;
export const JSON_FORMAT_ERROR =
  "Oops, your input is not a required json format.";

const InputText: React.FC<InputTextProps> = (props: InputTextProps) => {
  const { setText } = React.useContext(TextContext);
  const [textInput, setTextInput] = React.useState("");
  const { onSubmission } = props;

  const submitText = (_text: string) => {
    try {
      if (!isVoid(_text)) {
        setText(_text);
        onSubmission && onSubmission();
      } else {
        throw Error;
      }
    } catch (e) {
      message.error(JSON_FORMAT_ERROR);
    }
  };

  return (
    <Container>
      <h1 id="title">Please input JSON the same format as right side</h1>
      <Row>
        <ColContainer span={8}>
          <TextArea
            role="textarea-input"
            rows={20}
            cols={5}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </ColContainer>
        <ColContainer span={8}>
          <TextArea
            disabled={true}
            role="textarea-output"
            rows={20}
            cols={5}
            value={JSON.stringify(treeData, null, 4)}
          />
        </ColContainer>
      </Row>
      <SubmitButton
        className="submit-button"
        onClick={() => submitText(textInput)}
        type="primary"
        role="submit-button"
      >
        Submit
      </SubmitButton>
    </Container>
  );
};

const Container = styled.div`
  padding: 24px;
`;

const ColContainer = styled(Col)`
  margin: 12px;
`;

const SubmitButton = styled(Button)`
  margin-top: 24px;
`;

export default InputText;
