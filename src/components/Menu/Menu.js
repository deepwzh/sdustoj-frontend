import React from 'react';
import AccountDropdown from "./AccountDropdown";
import { Menu as AntdMenu } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators} from 'react';
import { push } from 'connected-react-router';

import {setMainMenuKey} from './../../actions';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cur_item: "0"
        }
    }
    onselect = ({ item, key, selectedKeys }) => {
        let selectedKey = selectedKeys[0];
        this.props.push(this.props.dataSource[selectedKey].target);
       this.props.setMainMenuKey(key);
    }
    getActiveItemKey = (items, pathname) => {
        let selected = 0 + "";
        items.map((item, key) => {
            if (pathname.startsWith(item.target)) {
                selected = item.key + "";
            }
        })
        return selected;
    }
    render() {
        // const { pathname, search, hash } = this.props;
        // console.log(pathname);
        // console.log(search);
        // console.log(hash);
        const items = this.props.dataSource || [];
        // let cur_item = this.getActiveItemKey(items, pathname);
        // console.log(cur_item);
        return (
            <AntdMenu
                onSelect={this.onselect}
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={this.props.mainMenuKey}
                selectedKeys = {this.props.mainMenuKey}
                style={{ lineHeight: '64px' }}>
                {
                    items.map((item) => (
                    <AntdMenu.Item key={item.key}>{item.title}</AntdMenu.Item>
                    ))
                }
                <AccountDropdown auth={this.props.auth}/>
            </AntdMenu>
        );
    }
}
function mapStateToProps(state) {
    return ({
    //     pathname: state.router.location.pathname,
    //     search: state.router.location.search,
    //     hash: state.router.location.hash,
        auth: state.auth,
        mainMenuKey: state.ui.mainMenuKey + '',
    });
    // console.log(state); // state
    // console.log(arguments[1]); // undefined
}
function mapDispatchToProps(dispatch) {
    return {
        push: (path) => dispatch(push(path)),
        setMainMenuKey: (key) => dispatch(setMainMenuKey(key))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);