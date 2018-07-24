import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { withRouter } from "react-router-dom";
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  static defaultProps = {
    redirect: '/'
  }
  login = (token, values) => 
    new Promise((resolve, reject) => { 
      // let data = FormData();
      // data.
      fetch('http://sdustoj.92ac.cn/JudgeOnline/api/login/',{
                method: 'post',
                mode:'cors',
                headers: {
                  'X-CSRFTOKEN': token,
                  "Content-Type": "application/json" 
                },
                credentials:'include',
                body: JSON.stringify(values),
            }).then((response) => {
                if(response.status == 200)
                  resolve("登录成功")
                else
                  reject("认证失败")
                })
              .catch((err) => reject(err))
    }
  );
  
  get_token = () => 
    new Promise((resolve, reject) => {
      fetch('http://sdustoj.92ac.cn/JudgeOnline/api/csrf_token/',{
        method:'get',
        mode:'cors',
      }).then(
        (response) => response.json()
      )
      .then(
        (value)=> resolve(value.token)
      ).catch(
        (err) => reject(err)
      );
    });
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (!err) {
        console.log('Received values of form: ', values);
        }
        let token_req  = this.get_token(); //获取token
        let login_req = token_req.then((token) => this.login(token, values));
        login_req.then(
          (data) => 
            this.props.history.push(this.props.redirect)
        )
        .catch((err)=> alert(err)); //请求成功，调用login
        values;
    });
  
}
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          Or <a href="">现在注册</a>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default withRouter(WrappedNormalLoginForm);