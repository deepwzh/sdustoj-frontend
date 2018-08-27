import './MenuSiderBarLayout.css';
import React from "react";
import { NavLink, withRouter  } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import { Dropdown, Icon, Card } from 'antd';
import Menu from '../../components/Menu';
import SiderBar from "../../components/SiderBar";
import FooterComponent from "../../components/FooterComponent";

const { Header, Content, Footer, Sider } = Layout;
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
        // this.state = {
        //     menu: [{
        //         key: 0,
        //         title: <div><Icon type = 'home-fill' spin={true}  style = {{fontSize: 15}} ></Icon><span style = {{fontWeight: 'bold'}}>主页</span></div>,
        //         target: "/",
        //     },{
        //         key: 1,
        //         title: <div><Icon type = 'book' style = {{fontSize: 25}}> </Icon><span style = {{fontWeight: 'bold'}}>课程</span></div>,
        //         target: "/course"
        //     },{
        //         key: 2,
        //         title: <div><Icon type = 'database' style = {{fontSize: 25}}> </Icon><span style = {{fontWeight: 'bold'}}>题库</span></div>,
        //         target: "/problemset"
                
        //     }, {
        //         key: 3,
        //         title: <div><Icon type = 'trophy' style = {{fontSize: 25}}> </Icon><span style = {{fontWeight: 'bold'}}>提交</span></div>,
        //         target: "/submission"
        //     }]
        // };
        this.state = {
            menu: [{
                key: 0,
                title: '主页',
                target: "/",
            },{
                key: 1,
                title: '课程',
                target: "/course"
            },{
                key: 2,
                title: '题库',
                target: "/problemset"
                
            }, {
                key: 3,
                title: '提交',
                target: "/submission"
            }]
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
                    <SiderBar/>
                    {children}
                </Content>
                <FooterComponent/>
            </Layout>
        );
    }
}
export default withRouter(MenuSiderBarLayout);