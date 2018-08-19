import React from 'react';
import { Menu } from "antd";
import { connect } from 'react-redux';
import { push } from 'connected-react-router'

import {setSiderbarKey} from './../../actions'

class SiderBar extends React.Component {
    constructor(props) {
        super(props);
    }


    getMenuItemList = (data) => {
        let items = [];
        for (let item of data) {
            if (item.childrens) {
                let childItems = this.getMenuItemList(item.childrens);
                items.push(
                    <Menu.SubMenu key={item.key} title={item.title}>
                        {childItems}
                    </Menu.SubMenu>
                )
            } else {
                items.push(
                    <Menu.Item target={item.target} key={item.key}>{item.title}</Menu.Item>
                )
            }
        }
        return items;
    }
    handleClick = ({ item, key, selectedKeys }) => {
        // console.log(item);
        this.props.push(item.props.target);
        this.props.setSiderbarKey(key);
        // let selectedKey = selectedKeys[0];
        // this.props.push(this.props.dataSource[selectedKey].target);
    }
    render() {
      return (
        <Menu
          onSelect={this.handleClick}
          style={{ width: 256 }} 
          defaultSelectedKeys={[this.props.siderbarKey]}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
        {this.getMenuItemList(this.props.dataSource)}
        </Menu>
      );
    }
}
function mapStateToProps(state) {
    console.log('before the render' + state.ui.siderbar.key);
    return ({
        siderbarKey: state.ui.siderbar.key + '',
        dataSource: state.ui.siderbar.dataSource,
    })
    // return ({
    //     // pathname: state.router.location.pathname,
    //     // search: state.router.location.search,
    //     // hash: state.router.location.hash,
    //     // auth: state.auth
    // });
    // console.log(state); // state
    // console.log(arguments[1]); // undefined
}
function mapDispatchToProps(dispatch) {
    return {
        push: (path) => dispatch(push(path)),
        setSiderbarKey: (key) => dispatch(setSiderbarKey(key))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SiderBar);