/**
 * @description 当我们统一侧边栏样式时，侧边栏菜单项便可以动态生成了
 * @time 18-08-06
 */
import {Menu} from 'antd';
import React from 'react';
import userConf from './../userConf.js'


/**
 * @description 为了加入 权限 概念 我们将选项提取 动态加入
 * @param page 哪一页
 * @returns 相应侧边栏菜单项
 */
let sideBarItems = (page) => {
    const Item = Menu.Item;
    const list = userConf.list;
    let items = [];

    let permissions = list[userConf.curUser][page];

     for(let key in permissions)
     {
        if(permissions[key][0] == 1)    // 如果该项可读， 那么就可以显示出来
        {
            items.push(
                <Item key = {key}>{key}</Item>
            );
        }
     }
     return items;
 }

/**
 * @description 突然发现 sidebar 也能复用
 */
class SideBar extends React.Component {
    constructor(props) {
        super(props); 
    }
    render() {
        return (
            <Menu onSelect = {this.props.onSelect}>
                {this.props.items}
            </Menu>
        );
    }
}

export {sideBarItems, SideBar};