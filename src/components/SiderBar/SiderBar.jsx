import React from 'react';
import { Menu } from "antd";
import { connect } from 'react-redux';
import { push } from 'connected-react-router'

import {setSiderbarKey} from './../../actions'

class SiderBar extends React.Component {
    hash2KeyMapping = null;
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: null
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.dataSource && newProps.dataSource !== this.props.dataSource) {
            let hash2KeyMapping = new Map();    
            for (let item of newProps.dataSource) {
                if (item.childrens) {
                    this.getMenuItemList(item.childrens);
                } else {
                    hash2KeyMapping.set(item.target, item.key);
                }
            }
            this.setState({
                selectedKey: hash2KeyMapping.get(newProps.hash)
            })
        }
    }
    getMenuItemList = (data) => {
        this.hash2KeyMapping = new Map();
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
                this.hash2KeyMapping.set(item.target, item.key);
            }
        }

        return items;
    }
    handleClick = ({ item, key, selectedKeys }) => {
        // console.log(item);
        this.props.push(item.props.target);
        // this.props.setSiderbarKey(key);
        // let selectedKey = selectedKeys[0];
        // this.props.push(this.props.dataSource[selectedKey].target);
    }
    render() {
      return (
        <Menu
          onSelect={this.handleClick}
          style={{ width: '100%' }} 
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
    return ({
        hash: state.router.location.hash,
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