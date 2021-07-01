import {Button, Form, Input, Modal, Space} from "antd";
import React from 'react';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import './buttons.css'
import axios from "axios";

const server = "http://localhost:8080";

class ChangePasswordButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            setIsModalVisible: false,
            loading: false
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.showModal = this.showModal.bind(this);
        this.onFinish = this.onFinish.bind(this);
    }

    handleCancel() {
        this.setState({
            isModalVisible: false,
            setIsModalVisible: false
        });
    }

    showModal() {
        this.setState({
            isModalVisible: true,
            setIsModalVisible: true
        })
    }

    onFinish(values) {
        this.setState({ loading: true });
        let address = server + "/user/config/password";
        values.name = localStorage.getItem("user");
        console.log(values);
        axios.post(address, values).then(response => {
            if (response.data === 1) {
                alert("修改密码成功!");
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        visible: false,
                        isModalVisible: false,
                        setIsModalVisible: false
                    });
                }, 300);
            } else {
                alert("修改密码失败，请检查原密码是否正确！");
            }
        })
    }

    render() {
        return (
            <div style={{textAlign: 'center' }}>
                <Button onClick={this.showModal}>
                    修改密码
                </Button>
                <Modal title="修改个人信息"
                       visible={this.state.isModalVisible}
                       onCancel={this.handleCancel}
                       footer={[]}
                >
                    <Form
                        name="normal_login"
                        initialValues={{ remember: true, prefix: '86'}}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="old"
                            label={"原本密码"}
                            rules={[{
                                required: true, message: '请输入密码'
                            }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                className={"input-box"}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label={"输入密码"}
                            rules={[{
                                required: true, message: '请输入密码'
                            }, () => ({
                                validator(_, value) {
                                    if (value.length >= 6) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('密码的安全性过低!请修改密码'));
                                }})
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                className={"input-box"}
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="确认密码"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: '请再次输入密码',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('两次输入的密码不一致'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                className={"input-box"}/>
                        </Form.Item>
                        <Form.Item>
                            <div style={{textAlign: 'center'}}>
                                <Button type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                        loading={this.state.loading}>
                                    确定
                                </Button>
                                <Button className="login-form-button" onClick={this.handleCancel}>
                                    取消
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default ChangePasswordButton;