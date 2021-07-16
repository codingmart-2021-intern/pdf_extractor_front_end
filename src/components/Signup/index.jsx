import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import classes from "./signup.module.css";
import { Link, useHistory } from "react-router-dom";

const Index = () => {

    const form = Form.useForm();
    const history = useHistory();

    const onSubmit = (values) => {
        console.log('Received values of form: ', values);
        history.push("/login")
    };

    return (
        <div className={classes.container}>
            <h2 className={classes.signup_form_heading}>signup Form</h2>
            <div className={classes.signupForm}>
                <Form
                    name="normal_signup"
                    className="signup-form"
                    initialValues={{ remember: false }}
                    onFinish={onSubmit}
                >

                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please Enter your name!' }]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="UserName"
                        />
                    </Form.Item>

                    <Form.Item
                        name="Email"
                        rules={[{ required: true, message: 'Please Enter your Email!' }]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Email"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please Enter your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item style={{ marginTop: "-1rem" }}>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item style={{ marginTop: "-1rem" }}>
                        <Button type="primary" block htmlType="submit" >
                            Sign up
                        </Button>
                        <Link
                            className={classes.signup_forgot}
                            style={{ marginTop: "10px" }}
                            to="/login"
                        >Already login!</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Index
