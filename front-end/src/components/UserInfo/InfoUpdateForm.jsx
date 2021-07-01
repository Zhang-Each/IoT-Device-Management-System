import React, { useState } from 'react';
import {Space} from 'antd';
import ChangeInfoButton from "./ChangeInfoButton";
import ChangePasswordButton from "./ChangePasswordButton";

export default class InfoUpdateForm extends React.Component {
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <Space>
                    <ChangeInfoButton />
                    <ChangePasswordButton />
                </Space>
            </div>
        )
    }
}