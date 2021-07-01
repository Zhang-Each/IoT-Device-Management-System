import React from 'react'
import {Descriptions, Radio, Button, PageHeader} from 'antd';
import InfoUpdateForm from "./InfoUpdateForm";
import axios from "axios";

const server = "http://localhost:8080";

export default class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "张溢弛",
            gender: "男",
            position: "浙江杭州",
            email: "3180103772@zju.edu.cn",
            phone: "18888913487",
            birthday: "2000.05.07",
            introduce:
                <div>
                    浙江大学计算机科学与技术学院软件工程1801学生
                    <br/>
                    正在寻找那颗名为现在的星
                </div>
        }
        let address = server + "/user/" + localStorage.getItem("user");
        axios.get(address).then(response => {
            this.setState({
                username: response.data.name,
                email: response.data.email,
                phone: response.data.phone
            })
        });
    }
    render() {

        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    title="用户信息"
                    subTitle="您可以修改您的个人信息"
                />
                <Descriptions
                    bordered
                    size={'default'}
                    column={2}
                >
                    <Descriptions.Item label="用户名">{this.state.username}</Descriptions.Item>
                    <Descriptions.Item label="性别">{this.state.gender}</Descriptions.Item>
                    <Descriptions.Item label="位置">{this.state.position}</Descriptions.Item>
                    <Descriptions.Item label="电子邮箱">{this.state.email}</Descriptions.Item>
                    <Descriptions.Item label="联系方式">{this.state.phone}</Descriptions.Item>
                    <Descriptions.Item label="生日">{this.state.birthday}</Descriptions.Item>
                    <Descriptions.Item label="自我介绍">
                        {this.state.introduce}
                    </Descriptions.Item>
                </Descriptions>
                <br />
                <br />
                <br />
                <InfoUpdateForm/>
            </div>
        );
    }
}