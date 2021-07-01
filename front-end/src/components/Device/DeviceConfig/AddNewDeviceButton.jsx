import {Button, Form, Input, Modal, Select, Space} from "antd";
import React from 'react';
import { AlertOutlined } from '@ant-design/icons';
import './ConfigForm.css'
import axios from "axios";

const {Option} = Select;
const server = "http://localhost:8080";

class AddNewDeviceButton extends React.Component {
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
        console.log(values);
        let address = server + "/device/new";
        values.user = localStorage.getItem("user");
        axios.post(address, values).then(response => {
            if (response.data === 1) {
                alert("新设备添加成功！您可以在统计信息界面看到新设备的相关信息");
            } else {
                alert("设备名已被使用，请修改后重新添加!");
            }
            setTimeout(() => {
                this.setState({
                    loading: false,
                    visible: false,
                    isModalVisible: false,
                    setIsModalVisible: false
                });
            }, 300);
        });
    }

    render() {
        return (
            <div>
                <Button
                    className="add-new-device-button"
                    onClick={this.showModal}
                >
                    新增设备
                </Button>
                <Modal title="新增物联网设备"
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
                            name="device"
                            label="设备名称"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入设备名称!',
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    width: '100%',
                                }}
                                prefix={<AlertOutlined />}
                                className={"input-box"}
                            />
                        </Form.Item>

                        <Form.Item
                            name="kind"
                            label="设备类型"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择设备类型',
                                },
                            ]}
                        >
                            <Select placeholder="请选择设备的类型"
                                    className={"input-box"}>
                                <Option value="1">车载设备</Option>
                                <Option value="2">可穿戴设备</Option>
                                <Option value="3">智能家居</Option>
                                <Option value="4">其他设备</Option>
                            </Select>

                        </Form.Item>
                        <Form.Item
                            name="description"
                            label={"设备描述"}
                            rules={[{ required: true, message: '请输入新的设备描述' }]}
                        >
                            <Input.TextArea prefix={<AlertOutlined
                                className="site-form-item-icon" />}
                                            placeholder="添加新的设备描述，不能为空"
                                            className={"input-box"}
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
export default AddNewDeviceButton;