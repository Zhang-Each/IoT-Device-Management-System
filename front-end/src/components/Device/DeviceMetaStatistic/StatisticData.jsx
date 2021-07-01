import React from 'react';
import { Statistic, Row, Col } from 'antd';
import { CustomerServiceTwoTone, FireTwoTone, FundTwoTone} from '@ant-design/icons';
import axios from "axios";

const server = "http://127.0.0.1:8080";

export default class StatisticData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            active: 0,
            msg: 0
        }
        let user = localStorage.getItem("user");
        let values = {
            "token": localStorage.getItem("token")
        }
        axios.post(server + "/device/query/all/" + user, values).then(response => {
            this.setState({
                total: response.data
            });
        })
        axios.get(server + "/device/query/list/active/" + user).then(response => {
            this.setState({
                active: response.data
            })
        })
        axios.get(server + "/message/user/all/" + user).then(response => {
            this.setState({
                msg: response.data
            })
        })
    }

    render() {
        return (
            <Row gutter={16}>
                <Col span={8}>
                    <Statistic title="设备总数" value={this.state.total}
                               prefix={<FundTwoTone />}
                    />
                </Col>
                <Col span={8}>
                    <Statistic title="当前活跃设备数"
                               value={this.state.active}
                               suffix={"/ " + this.state.total}
                               prefix={<FireTwoTone />}
                    />
                </Col>
                <br/>
                <Col span={8}>
                    <Statistic title="消息总数"
                               value={this.state.msg}
                               prefix={<CustomerServiceTwoTone />}
                    />
                </Col>
            </Row>
        );
    }
}