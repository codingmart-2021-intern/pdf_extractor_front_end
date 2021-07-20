import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { platformApi } from "../../helpers/api";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import classes from "./login.module.css";
import { Link, useHistory } from "react-router-dom";
import { setAccessToken, setUserId } from "../../utils";

const Index = () => {
  const form = Form.useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false)

  const onSubmit = (values) => {
    setLoading(true)
    platformApi
      .post("/user/authenticate", values)
      .then((result) => {
        let { data } = result;
        setAccessToken(data.token);
        setUserId(data.id);
        history.push("/");
        message.success("Login success", 2);
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)

        message.error(
          !error.response
            ? error.message
            : error.response.data.message
          , 2
        );
      });
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.login_form_heading}>Login Form</h2>
      <div className={classes.loginForm}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: false }}
          onFinish={onSubmit}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please Enter your Email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please Enter your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          {/* <Form.Item>
            <a className={classes.login_forgot} href="#/">
              Forgot password
            </a>
          </Form.Item> */}

          <Form.Item style={{ marginTop: "0rem" }}>
            <Button type="primary" block htmlType="submit" loading={loading}>
              Log in
            </Button>
            <Link
              className={classes.signup_forgot}
              style={{ marginTop: "10px", float: "right" }}
              to="/signup"
            >
              register now!
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Index;
