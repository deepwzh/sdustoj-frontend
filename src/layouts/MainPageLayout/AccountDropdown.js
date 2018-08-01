import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
const unlogin_menu = (
  <Menu>
    <Menu.Item>
      <a rel="noopener  " href="/login">登录</a>
    </Menu.Item>
  </Menu>
)
function logout() {
  let url = 'http://192.168.130.249:8008/JudgeOnline/api/logout/';
  fetch(url, {
    method:'get',
    credentials:'include'
  });
}
function session() {
  let url = 'http://192.168.130.249:8008/JudgeOnline/api/session/';
  return fetch(url, {
    method:'get',
    credentials:'include'
  }).then((response)=>response.json());
}
const login_menu = (
  <Menu>
    <Menu.Item>
      <a /*target="_blank"*/ rel="noopener  " href="/account">用户管理</a>
    </Menu.Item>
    <Menu.Item>
      <a rel="noopener noreferrer" href="javascript:;" onClick={logout}>注销</a>
    </Menu.Item>
  </Menu>
);

class AccountDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null
    }
  }
  componentDidMount() {
    session().then((data)=> {
      this.setState({
        username: data.username
      })
    })
  }
  render() {
    let {username} = this.state;
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