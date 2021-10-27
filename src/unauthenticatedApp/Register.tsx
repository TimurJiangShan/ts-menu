import React from "react";
import { useAuth } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/useAsync";

export const RegisterScreen = (props: { onError: (error: Error) => void }) => {
  const { register } = useAuth();
  const { onError } = props;
  const { run } = useAsync();
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("Password does not match"));
      return;
    }
    try {
      run(register(values));
    } catch (e: any) {
      onError(e);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input username" }]}
      >
        <Input
          data-testid="username"
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
          data-testid="password"
          placeholder="password"
          type="password"
          id={"password"}
        />
      </Form.Item>
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "Please confirm your password" }]}
      >
        <Input
          data-testid="cpassword"
          placeholder="password"
          type="password"
          id={"cpassword"}
        />
      </Form.Item>
      <Form.Item>
        <LongButton role="register-button" htmlType={"submit"} type="primary">
          Register
        </LongButton>
      </Form.Item>
    </Form>
  );
};
