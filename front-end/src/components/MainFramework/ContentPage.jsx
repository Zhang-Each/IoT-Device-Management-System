import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import "./Content.css"

const { Content} = Layout;


class ContentPage extends React.Component {
    render() {
        return (
            <Layout className="site-layout">
                <Content style={{ margin: '0px 16px', textAlign: 'left'}}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background"
                         style={{ padding: 24, minHeight: 540,  textAlign: 'left'}}
                    >
                        Bill is a cat.
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default ContentPage;