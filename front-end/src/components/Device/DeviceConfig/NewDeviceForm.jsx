import React from 'react';
import {Button, Space} from 'antd';
import AddNewDeviceButton from "./AddNewDeviceButton";
import "./ConfigForm.css";


export default class NewDeviceForm extends React.Component {
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <Space>
                    <Button type="primary" htmlType="submit" className="config-form-button">
                        修改配置
                    </Button>
                    <AddNewDeviceButton />
                </Space>
            </div>
        )
    }
}