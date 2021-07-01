import React from 'react';
import MainMenu from "../components/MainFramework/MainMenu";
import ContentBox from "../components/MainFramework/ContentBox";
import MainFooter from "../components/MainFramework/MainFooter";
import {Layout, Button} from "antd";
import {Redirect} from "react-router-dom";

const {Header, Footer, Sider, Content} = Layout;

class MainPage extends React.Component {
    render() {
        if (!localStorage.getItem("token")) {
            console.log("1111");
            return (
                <Redirect to={{
                    pathname: "/login",
                }} />
            )
        }
        return (
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider>
                        <MainMenu />
                    </Sider>
                    <Layout>
                        <Header>
                            <div>
                                <text style={{color: "white", fontSize: "25px"}}>物联网应用平台</text>
                            </div>
                        </Header>
                        <Content>
                            <ContentBox />
                        </Content>
                        <Footer>
                            <MainFooter />
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default MainPage;

