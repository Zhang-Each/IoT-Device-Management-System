import React from 'react';
import {Layout, Menu, Breadcrumb, PageHeader} from 'antd';
import "../../MainFramework/Content.css"
import ConfigForm from "./ConfigForm";

const { Content} = Layout;


class DeviceConfiguration extends React.Component {
    render() {
        return (
            <Layout className="site-layout">
                <Content style={{ margin: '0px 16px', textAlign: 'left'}}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>
                            设备
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            修改配置
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 540,  textAlign: 'left'}}>
                        <PageHeader
                            className="site-page-header"
                            title="设备配置信息修改"
                            subTitle="您可以填写下面的表单修改配置信息，也可以点击新增设备按钮来添加一个设备"
                        />
                        <ConfigForm />
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default DeviceConfiguration;