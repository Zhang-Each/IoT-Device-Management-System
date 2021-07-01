import React from 'react';
import {Menu, Button, Layout} from 'antd';
import {Link} from "react-router-dom";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    HomeOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar } from 'antd';

const { SubMenu } = Menu;

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind();
    }

    logOut() {
       alert("退出登录");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.reload();
    }

    render() {
        let name = localStorage.getItem("user");
        return (
            <Layout>
                <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
                    <Menu.Item>
                        <Avatar size={32} icon={<UserOutlined />} />
                        &nbsp;&nbsp;&nbsp;&nbsp;{name}&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button ghost={"true"} onClick={this.logOut}>退出</Button>
                    </Menu.Item>

                    <Menu.Item key="0" icon={<HomeOutlined />}>
                        <Link to={"/main"} >首页</Link>
                    </Menu.Item>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to={"/main/user"} >个人信息</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        <Link to={"/main/config"} >设备配置</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<PieChartOutlined />}>
                        <Link to={"/main/show"} >查看设备</Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<PieChartOutlined />}>
                        <Link to={"/main/message"} >设备趋势图</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<PieChartOutlined />}>
                        <Link to={"/main/statistic"} >统计信息</Link>
                    </Menu.Item>
                    {
                        /**
                         <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                         <Menu.Item key="3">Tom</Menu.Item>
                         <Menu.Item key="4">Bill</Menu.Item>
                         <Menu.Item key="5">Alex</Menu.Item>
                         </SubMenu>
                         <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                         <Menu.Item key="6">Team 1</Menu.Item>
                         <Menu.Item key="8">Team 2</Menu.Item>
                         </SubMenu>
                         <Menu.Item key="9" icon={<FileOutlined />}>
                         Files
                         </Menu.Item>
                         */
                    }

                </Menu>
            </Layout>
        );
    }
}
export default MainMenu;