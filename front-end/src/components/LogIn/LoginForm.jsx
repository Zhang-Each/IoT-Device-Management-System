import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react';
import './LoginForm.css';
import '../../config.js';
import axios from "axios";

const server = "http://localhost:8080";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
        this.toRegister = this.toRegister.bind(this);
    }

    onFinish(values) {
        let address = server + "/user/login";
        let data = {
            "username": values.username,
            "password": values.password
        }
        axios.post(address, data).then(response => {
            console.log(response.data);
            if (response.data.code === "401") {
                alert("账号不存在或密码错误，请重试!");
            } else {
                alert("登陆成功!欢迎使用物联网应用网站!");
                localStorage.setItem("user", response.data.name);
                localStorage.setItem("token", response.data.token);
                this.props.history.push('/main');
            }
        })
    }

    toRegister() {
        this.props.history.push('/register');
    }

    render() {
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
            >
                <Form.Item name={"title"}>
                    <h1>登 录 网 站</h1>
                </Form.Item>

                <Form.Item
                    name="username"
                    label={"账号"}
                    rules={[{ required: true, message: '请输入用户名!' }]}

                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />}
                           placeholder="Username" className={"input-box"}/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label={"密码"}
                    rules={[{ required: true, message: '请输入您的密码!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        className={"input-box"}
                    />
                </Form.Item>

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="config-form-button">
                        登录
                    </Button>
                    <Button className="login-form-button" onClick={this.toRegister}>
                        注册
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
export default LoginForm;


