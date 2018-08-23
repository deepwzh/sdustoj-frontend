import React from "react";
import { NavLink, withRouter  } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import './MainPageLayout.css';
import { Dropdown, Icon } from 'antd';
import Menu from '../../components/Menu';



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

class MainPageLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [{
                    key: 0,
                    title: <Icon type = 'home' style = {{fontSize: 25}} ></Icon>,
                    target: "/",
                },{
                    key: 1,
                    title: <Icon type = 'book' style = {{fontSize: 25}}> </Icon>,
                    target: "/course"
                },{
                    key: 2,
                    title: <Icon type = 'database' style = {{fontSize: 25}}> </Icon>,
                    target: "/problemset"
                    
                }, {
                    key: 3,
                    title: <Icon type = 'trophy' style = {{fontSize: 25}}> </Icon>,
                    target: "/submission"
                }
            ]
        };
    }
    // onselect = ({ item, key, selectedKeys }) => {
    //     const { match, location, history } = this.props
    //     if (selectedKeys[0] == 1) {
    //         this.props.history.push('/');
    //     } else if (selectedKeys[0] == 2) {
    //         this.props.history.push('/lesson');
    //     } else if (selectedKeys[0] == 4) {
    //         this.props.history.push('/status');
    //     }
    // }
    render() {
        // const { match, location, history } = this.props
        let { children } = this.props;
        // let cur_item = '1';
        // if (match.path === "/") {
        //     cur_item = '1';
        // } else if (match.path.startsWith("/lesson")) {
        //     cur_item = '2'; 
        // } else if (match.path.startsWith("/status")) {
        //     cur_item = '4';
            
        // }
        return (
            <Layout className="layout" id="menu-layout-content">
                <Header>
                    <Logo/>
                    <Menu dataSource={this.state.menu} />
                </Header>
                <Content id="content">
                    {children}
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div> */}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
                </Footer>
            </Layout>
        );
    }

}
export default withRouter(MainPageLayout);