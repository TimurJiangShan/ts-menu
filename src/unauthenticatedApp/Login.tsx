import React from "react";
import { useAuth } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/useAsync";
import { useHistory } from "react-router-dom";

export const LoginScreen = (props: { onError: (error: Error) => void }) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync();
  const { onError } = props;
  const history = useHistory();

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      history.push("/homepage");
      await run(login(values));
    } catch (e: any) {
      onError(e);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input user name" }]}
      >
        <Input
          data-testid="login-username"
          placeholder={"username"}
          type="text"
          id={"username"}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input user password" }]}
      >
        <Input
          data-testid="login-password"
          placeholder="password"
          type="password"
          id={"password"}
        />
      </Form.Item>
      <Form.Item>
        <LongButton
          data-testid="login-button"
          loading={isLoading}
          htmlType={"submit"}
          type="primary"
        >
          Login
        </LongButton>
      </Form.Item>
      <div>
        <div>default username: admin</div>
        <div>default password: password</div>
      </div>
    </Form>
  );
};
