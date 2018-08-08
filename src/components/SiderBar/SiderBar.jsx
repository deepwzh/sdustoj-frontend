import React from 'react';
import { Menu } from "antd";
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
class SiderBar extends React.Component {
    constructor(props) {
        super(props);
    }
<<<<<<< HEAD
    static defaultProps = {
        dataSource: [{
            key: "0",
            title: "任务组",
            target: "",
            childrens: [{
                key: "00",
                title: "实验",
                target: "/lesson/2/2", 
            }, {
                key: "01",
                title: "作业",
                target:"/lesson/2/1"
            }, {
                key: "02",
                title: "考试",
                target:"/lesson/2/考试"
            }] 
        }]
    }
=======
    // static defaultProps = {
    //     dataSource: [{
    //         key: "0",
    //         title: "任务组",
    //         target: "",
    //         childrens: [{
    //             key: "00",
    //             title: "实验",
    //             target: "/course/2/mission_group/2", 
    //         }, {
    //             key: "01",
    //             title: "作业",
    //             target:"/course/2/mission_group/1"
    //         }, {
    //             key: "02",
    //             title: "考试",
    //             target:"/lesson/2/考试"
    //         }]
    //     }]
    // }
>>>>>>> 0d64dc558088887db5b35a2cb84b745a45e0d416
    // renderItem = (props) = {

    // }
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
        // let selectedKey = selectedKeys[0];
        // console.log(selectedKeys);
        // this.props.push(this.props.dataSource[selectedKey].target);
    }
    render() {
        console.log(this.props.dataSource);
      return (
        <Menu
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
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
        dataSource: state.ui.siderbar.dataSource
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
        push: (path) => dispatch(push(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SiderBar);