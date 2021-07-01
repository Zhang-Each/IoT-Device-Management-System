import React from 'react';
import {Layout, Menu, Breadcrumb, PageHeader, List, Avatar} from 'antd';
import {Map, Marker, NavigationControl, ZoomControl, Label, MapTypeControl, InfoWindow} from 'react-bmapgl';
import { Form, Input, Button, Select } from 'antd';
import ksm from "../../../img/star.jpg";
import Polyline from 'react-bmapgl/Overlay/Polyline';
import "../../MainFramework/Content.css"
import axios from "axios";


const { Content} = Layout;
const { Option } = Select;

const server = "http://127.0.0.1:8080";

class DevicePosition extends React.Component {
    constructor(props) {
        super(props);
        this.getPositionMark = this.getPositionMark.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.getPositionAlert = this.getPositionAlert.bind(this);
        this.state = {
            show: false,
            path: [],
            devices: [],
            msg: []
        }
        let user = localStorage.getItem("user");
        axios.get(server + "/device/query/list/all/" + user).then(response => {
            console.log(response.data);
            this.setState({
                devices: response.data
            });
        });
    }

    getPositionMark() {
        if (this.state.show) {
            let result = this.state.path.map((item, index) => {
                if (index === 0) {
                    return <Marker
                        key={index}
                        position={{lng: item["lng"], lat: item["lat"]}}
                        icon={"start"}
                    />
                } else if (index === this.state.path.length - 1) {
                    return <Marker
                        key={index}
                        position={{lng: item["lng"], lat: item["lat"]}}
                        icon={"end"}
                    />
                }
                return <Marker
                    key={index}
                    position={{lng: item["lng"], lat: item["lat"]}}
                    icon={"loc_blue"}
                />
            });
            console.log(result);
            return result;
        }
    }

    getPositionAlert() {
        if (this.state.show) {
            let result = this.state.path.map((item, index) => {
                if (item["alert"] === 1) {
                    return <Label
                        key={index}
                        position={{lng: item["lng"], lat: item["lat"]}}
                        text="此处设备状态异常!"
                        onClick={e => {console.log(e)}}
                    />
                }
            });
            console.log(result);
            return result;
        }
    }

    getPositionTrack() {
        if (this.state.show) {
            return (
                <Polyline
                    strokeStyle={"solid"}
                    path={this.state.path}
                    strokeColor="#f00"
                    strokeWeight={4}
                />
            );
        }
    }

    getSelectDevice() {
        let result = this.state.devices.map((item, index) => {
            return <Select.Option value={item.name}>{item.name}</Select.Option>
        });
        console.log(result);
        return result;
    }

    onFinish(values) {
        console.log(values)
        let device = values.device;
        axios.get(server + "/message/path/" + device).then(response => {
            console.log(response.data);
            this.setState({
                path: response.data,
                show: true
            })
            if (response.data.length >= 10) {
                alert("消息数量过多，仅显示最近10条消息");
            }
        })
        axios.get(server + "/message/info/" + device).then(response => {
            this.setState({
                msg: response.data.reverse(),
            })
        })
    }

    render() {
        return (
            <Layout className="site-layout">
                <Content style={{ margin: '0px 16px', textAlign: 'left'}}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>设备</Breadcrumb.Item>
                        <Breadcrumb.Item>运动轨迹</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 540,  textAlign: 'left'}}>
                        <PageHeader
                            className="site-page-header"
                            title="查看设备历史轨迹"
                            subTitle="您可以输入设备编号查询对应的设备运动轨迹"
                        />
                        <br />
                        <Form name="horizontal_login" layout="inline" onFinish={this.onFinish}>
                            <Form.Item
                                name="device"
                                label={"选择想要查看的设备"}
                                rules={[{ required: true, message: '请选择设备!!!' }]}
                            >
                                <Select defaultValue="请选择设备">
                                    {this.getSelectDevice()}
                                </Select>
                            </Form.Item>
                            <Form.Item shouldUpdate>
                                {() => (
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        查询
                                    </Button>
                                )}
                            </Form.Item>
                        </Form>
                        <br />
                        <br />
                        <Map
                            zoom={12}
                            tilt={40}
                            style={{height: '550px'}}
                            center={{lng: 120.1, lat: 30.3}}
                        >
                            <MapTypeControl />
                            <NavigationControl />
                            <ZoomControl />
                            {this.getPositionTrack()}
                            {this.getPositionMark()}
                            {this.getPositionAlert()}
                        </Map>
                        <br />
                        <h2>设备消息记录</h2>
                        <br/>
                        <div>
                            <List
                                itemLayout="horizontal"
                                dataSource={this.state.msg}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={ksm} />}
                                            title={<a>{"消息发送时间：" + item.stamp}</a>}
                                            description={"消息内容：" + item.info}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default DevicePosition;