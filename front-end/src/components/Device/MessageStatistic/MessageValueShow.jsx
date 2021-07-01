import React from 'react';
import {Breadcrumb, Layout, PageHeader} from "antd";
import { Line } from '@ant-design/charts';
import "./Content.css"
import StatisticData from "../DeviceMetaStatistic/StatisticData";
import ValueLineChart from "./ValueLineChart";

const { Content} = Layout;


export default class MessageValueShow extends React.Component {
    render() {

        return (
            <Layout className="site-layout">
                <Content style={{margin: '0px 16px', textAlign: 'left'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>设备</Breadcrumb.Item>
                        <Breadcrumb.Item>变化趋势</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 540, textAlign: 'left'}}>
                        <PageHeader
                            className="site-page-header"
                            title="设备信息折线统计图"
                            subTitle="您可以看到设备的发送的value的折线图"
                        />
                        <br/>
                        <ValueLineChart/>
                        <br/>
                    </div>
                </Content>
            </Layout>
        );
    }
}