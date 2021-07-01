import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import "./HomePage.css"
import { Carousel, PageHeader } from 'antd';
import img1 from "../../img/iot2.jpg";
import img2 from "../../img/iot.jpg";
import img3 from "../../img/internet.jpg";


const contentStyle = {
    height: '500px',
    color: '#000',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#d0d0d0',
};

const contentStyle2 = {
    height: '200px',
    color: '#000',
    lineHeight: '160px',

    background: '#ffffff',
};


const { Content} = Layout;


class HomePage extends React.Component {
    render() {
        return (
            <Layout className="site-layout">
                <Content style={{ margin: '0px 16px', textAlign: 'left'}}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>网站介绍</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 540,  textAlign: 'left'}}>
                        <PageHeader
                            className="site-page-header"
                            title="欢迎来到物联网应用网站!"
                            subTitle="您可以在本网站中修改个人信息，并修改设备配置，
                            查看您的物联网设备的信息"
                        />
                        <Carousel autoplay>
                            <div>
                                <img src={img1} style={contentStyle}/>
                            </div>
                            <div>
                                <img src={img2} style={contentStyle}/>
                            </div>
                            <div>
                                <img src={img3} style={contentStyle}/>
                            </div>
                        </Carousel>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default HomePage;
