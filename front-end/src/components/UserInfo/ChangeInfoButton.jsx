import {Button, Form, Input, Modal, Space} from "antd";
import React from 'react';
import { UserOutlined, MobileOutlined , MailOutlined } from '@ant-design/icons';
import './buttons.css'
import axios from "axios";

const server = "http://localhost:8080";

class ChangeInfoButton extends React.Component {
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
        values.name = localStorage.getItem("user");
        console.log(values);
        let address = server + "/user/config/info";
        axios.post(address, values).then(response => {
            if (response.data === 1) {
                alert("修改成功!");
                window.location.reload();
            } else if (response.data === -1) {
                alert("该邮箱已经被注册!");
            } else {
                alert("修改失败，请重试!");
            }
            setTimeout(() => {
                this.setState({
                    loading: false,
                    visible: false,
                    isModalVisible: false,
                    setIsModalVisible: false
                });
            }, 300);
        })
    }

    render() {
        return (
            <div style={{textAlign: 'center' }}>
                <Button type="primary" onClick={this.showModal}>
                    编辑信息
                </Button>
                <Modal title="修改个人信息"
                       visible={this.state.isModalVisible}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}
                       footer={[]}
                >
                    <Form
                        name="normal_login"
                        initialValues={{ remember: true, prefix: '86'}}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="email"
                            label="电子邮箱"
                            rules={[
                                {
                                    type: 'email',
                                    message: '无效的E-mail!',
                                },
                                {
                                    required: true,
                                    message: '请输入邮箱'
                                }
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined className="site-form-item-icon" />}
                                className={"input-box"} placeholder="e-mail"
                            />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="手机号码"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号码'
                                }
                            ]}
                        >
                            <Input
                                style={{
                                    width: '100%',
                                }}
                                className={"input-box"}
                                prefix={<MobileOutlined />}
                                placeholder="phone"
                            />
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
export default ChangeInfoButton;