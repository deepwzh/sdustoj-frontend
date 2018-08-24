import './MenuSiderBarLayout.css';
import React from "react";
import { NavLink, withRouter  } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import { Dropdown, Icon, Card } from 'antd';
import Menu from '../../components/Menu';
import SiderBar from "../../components/SiderBar";

const { Header, Content, Footer, Sider } = Layout;
class Logo extends React.Component {
    render() {
        return (
            <div  className="logo">
                <span>某管理平台</span>
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
                title: <div><Icon type = 'home' style = {{fontSize: 25}} ></Icon><span style = {{fontWeight: 'bold'}}>主页</span></div>,
                target: "/",
            },{
                key: 1,
                title: <div><Icon type = 'book' style = {{fontSize: 25}}> </Icon><span style = {{fontWeight: 'bold'}}>课程</span></div>,
                target: "/course"
            },{
                key: 2,
                title: <div><Icon type = 'database' style = {{fontSize: 25}}> </Icon><span style = {{fontWeight: 'bold'}}>题库</span></div>,
                target: "/problemset"
                
            }, {
                key: 3,
                title: <div><Icon type = 'trophy' style = {{fontSize: 25}}> </Icon><span style = {{fontWeight: 'bold'}}>提交</span></div>,
                target: "/submission"
            }]
        };
    }
    render() {
        let { children } = this.props;
        return (
            <Layout className="layout" id="menu-sider-bar-layout">
            <Header>
                <Logo/>
                <Menu dataSource={this.state.menu} />
            </Header>
            <Layout >
                <Sider style = {{background: '#fff'}}>
                <br/>
                <SiderBar />
                </Sider>
                <Content id = 'content'>
                    {children}
                </Content>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>
             Ant Design ©2016 Created by Ant UED
            </Footer>
            </Layout>
        );
    }
}
export default withRouter(MenuSiderBarLayout);