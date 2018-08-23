import React from 'react';
import './index.css';
import { Menu, Dropdown, Icon } from 'antd';
import { getAPIUrl, API } from '../../utils/config';
import { infoRequest } from '../../utils/message';
class AccountDropdown extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  logout =  infoRequest({
    loading_text: '正在注销',
    success_text: '注销成功，2秒后跳转到登录页',
    callback: () => {
      setTimeout(() => {
        this.props.push('/login');
      }, 2000);
    }
  })(() => {
    const url = getAPIUrl(API.LOGOUT);
    const config = {
      method:'get',
    }
    return fetch(url, config);
  })
  render() {
    let {username, role} = this.props.auth;
    const login_menu = (
      <Menu>
        <Menu.Item>
          <a /*target="_blank"*/ rel="noopener  " href="/account">用户管理</a>
        </Menu.Item>
        <Menu.Item>
          <a rel="noopener noreferrer" href="javascript:;" onClick={this.logout}>注销</a>
        </Menu.Item>
      </Menu>
    );
    const unlogin_menu = (
      <Menu>
        <Menu.Item>
          <a rel="noopener  " href="/login">登录</a>
        </Menu.Item>
      </Menu>
    )
    return (
      <div id="account-dropdown">
        <Dropdown overlay={username?login_menu:unlogin_menu}>
            <a className="ant-dropdown-link" href="javascript:;">
            {username?username:"未登录"} <Icon type="down" />
            </a>
        </Dropdown>
      </div>
      );

  }
}
export default AccountDropdown;