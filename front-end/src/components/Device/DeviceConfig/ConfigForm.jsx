import React from 'react';
import {Button, Form, Input, Select} from "antd";
import { AndroidOutlined, AlertOutlined} from '@ant-design/icons';
import './ConfigForm.css'
import NewDeviceForm from "./NewDeviceForm";
import axios from "axios";

const { Option } = Select;

const server = "http://127.0.0.1:8080";
export default class ConfigForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            devices: []
        }
        this.onFinish = this.onFinish.bind(this);
        this.getSelectDevice = this.getSelectDevice.bind(this);
        let user = localStorage.getItem("user");
        axios.get(server + "/device/query/list/all/" + user).then(response => {
            console.log(response.data);
            this.setState({
                devices: response.data
            });
        });
    }

    onFinish(values) {
        let address = server + "/device/config";
        axios.post(address, values).then(response => {
            console.log(response);
            if (response.data === 1) {
                alert("修改配置成功!");
            } else {
                alert("配置修改失败，请重试!");
            }
        })
        console.log('Received values of form: ', values);
    }

    getSelectDevice() {
        let result = this.state.devices.map((item, index) => {
            return <Select.Option value={item.name}>{item.name}</Select.Option>
        });
        console.log(result);
        return result;
    }

    render() {
        return (
            <Form
                name="normal_login"
                className="config-form"
                initialValues={{ remember: true, prefix: '86', }}
                onFinish={this.onFinish}
            >
                <Form.Item
                    name="device"
                    label={"选择设备"}
                    rules={[{ required: true, message: '请选择设备!!!' }]}
                >
                    <Select defaultValue="请选择设备">
                        {this.getSelectDevice()}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="kind"
                    label={"设备类型"}
                    rules={[{ required: true, message: '请选择新的设备类型!!!' }]}
                >
                    <Select defaultValue="请选择设备">
                        <Select.Option value='1'>车载设备</Select.Option>
                        <Select.Option value='2'>可穿戴设备</Select.Option>
                        <Select.Option value='3'>智能家居</Select.Option>
                        <Select.Option value='4'>基础设施</Select.Option>
                        <Select.Option value='5'>其他设备</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="description"
                    label={"设备描述"}
                    rules={[{ required: true, message: '请输入新的设备描述' }]}

                >
                    <Input.TextArea prefix={<AlertOutlined className="site-form-item-icon" />}
                           placeholder="添加新的设备描述，不能为空" className={"input-box"}/>
                </Form.Item>

                <Form.Item>
                    <NewDeviceForm />
                </Form.Item>
            </Form>
        );
    }
}