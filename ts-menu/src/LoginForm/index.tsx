import React, { useState, useCallback } from "react";
import { Input, Button, Form, Modal, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";


export const SERVER_URL= 'http://localhost:8000'
const LoginForm: React.FC<{}> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleLogin = useCallback(async (_username: string, _password: string) => {
    try{
      await axios
      .post( new URL("/user/login" ,SERVER_URL).href
        , {
        username: _username,
        password: _password,
      })
      .then((res: any) => {
        if ( res.data.code === 200) {
          message.success("Login Success");
        } else {
          message.error("Login Failed");
        }
      });
    }catch(e){
      console.log(e)
      message.error("Login Failed");
    }
  },[]);


  const onSubmit = useCallback(async () => {
    setConfirmLoading(true);
    await handleLogin(username, password);
    setModalVisible(false);
    setConfirmLoading(false);
  }, [handleLogin, username, password]);


  return (
    <div className="login-container">
      <Button type="primary" onClick={()=> setModalVisible(true)} className="login-button">
        Login
      </Button>
      <Modal
        title="Login"
        visible={modalVisible}
        onOk={onSubmit}
        okText="Login"
        confirmLoading={confirmLoading}
        onCancel={()=>setModalVisible(false)}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LoginForm;
