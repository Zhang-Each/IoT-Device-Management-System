import React from 'react';
import {Breadcrumb, Layout, PageHeader} from "antd";
import "./Content.css"
import StatisticData from "./StatisticData";
import DevicePieDiagram from "./DevicePieDiagram";

const { Content} = Layout;


export default class DeviceStatisticInfo extends React.Component {
    render() {
        return (
            <Layout className="site-layout">
                <Content style={{ margin: '0px 16px', textAlign: 'left'}}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>设备</Breadcrumb.Item>
                        <Breadcrumb.Item>统计信息</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 540,  textAlign: 'left'}}>
                        <PageHeader
                            className="site-page-header"
                            title="查看设备统计信息"
                            subTitle="您可以看到设备的统计信息"
                        />
                        <br />
                        <StatisticData />
                        <br/>
                        <br/>
                        <h2>持有设备种类分布情况</h2>
                        <br/>
                        <br/>
                        <DevicePieDiagram />
                    </div>
                </Content>
            </Layout>
        );
    }
}