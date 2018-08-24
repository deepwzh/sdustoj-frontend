import './MenuSiderBarLayout.css';
import React from "react";
import { NavLink, withRouter  } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import { Dropdown, Icon } from 'antd';
import Menu from '../../components/Menu';
import SiderBar from "../../components/SiderBar";
import FooterComponent from "../../components/FooterComponent";

const { Header, Content, Footer } = Layout;
class Logo extends React.Component {
    render() {
        return (
            <div  className="logo">
                <span>课程管理平台</span>
            </div>
        )
    }
}
class MenuSiderBarLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [{
                    key: 0,
                    title: "主页",
                    target: "/"
                },{
                    key: 1,
                    title: "课程",
                    target: "/course"
                },{
                    key: 2,
                    title: "题库",
                    target: "/problemset"
                }, {
                    key: 3,
                    title: "提交",
                    target: "/submission"
                }
            ]
        };
    }
    render() {
        let { children } = this.props;
        return (
            <Layout className="layout" id="menu-sider-bar-layout">
                <Header className='fixed'>
                    <Logo/>
                    <Menu dataSource={this.state.menu} />
                </Header>
                <Content id="content">
                    <SiderBar id="siderbar"/>
                    {children}
                </Content>
                <FooterComponent/>
            </Layout>
        );
    }
}
export default withRouter(MenuSiderBarLayout);