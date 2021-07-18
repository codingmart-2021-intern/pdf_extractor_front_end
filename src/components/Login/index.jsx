import React from 'react';
import { Form, Input, Button } from 'antd';
import {platformApi} from  '../../helpers/api';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import classes from "./login.module.css";
import { Link, useHistory } from "react-router-dom";



const Index = () => {
    const form = Form.useForm();
    const history = useHistory();

    const onSubmit = (values) => {
        console.log('Received values of form: ', values);

        platformApi.post("/user/authenticate",values)
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            console.log(error.response.data);
        })
        // history.push("/")
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

                    <Form.Item>
                        <a className={classes.login_forgot} href="#/">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item style={{ marginTop: "-2rem" }}>
                        <Button type="primary" block htmlType="submit" >
                            Log in
                        </Button>
                        <Link
                            className={classes.signup_forgot}
                            style={{ marginTop: "10px", float: "right" }}
                            to="/signup"
                        >register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}


export default Index
