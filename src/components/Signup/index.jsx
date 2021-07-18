import React from 'react';
import { platformApi } from '../../helpers/api';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import classes from "./signup.module.css";
import { Link, useHistory } from "react-router-dom";

const Index = () => {

    const form = Form.useForm();
    const history = useHistory();

    const onSubmit = (values) => {
        console.log('Received values of form: ', values);
        platformApi.post("/user/signup", values)
            .then(result => {
                console.log(result)
                message.success("signup successfull",2)
                history.push("/login")
            })
            .catch(error => {
                console.log(error.response.data);
                message.error(error.response.data.message,2)
            })
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
                        name="name"
                        rules={[{ required: true, message: 'Please Enter your name!' }]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="UserName"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
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

                    {/* <Form.Item style={{ marginTop: "-1rem" }}>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item> */}

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
