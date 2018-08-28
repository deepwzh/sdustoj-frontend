import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Card } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  componentDidMount() {
      this.props.getProfileData();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.updateProfileData(values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 2 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 },
      },
    };
    const tailFormItemLayout = {
      // wrapperCol: {
      //   xs: {
      //     span: 24,
      //     offset: 0,
      //   },
      //   sm: {
      //     span: 16,
      //     offset: 8,
      //   },
      // },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form  layout={'horizontal'} onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="用户名"
        >
          {getFieldDecorator('username', { })(
            <Input disabled/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="性别"
        >
          {getFieldDecorator('sex', {
          })(
            <Select>
                <Select.Option value="MALE">男</Select.Option>
                <Select.Option value="FEMALE">女</Select.Option>
                <Select.Option value="SECRET">保密</Select.Option>
            </Select>
          )}
        </FormItem>
        <FormItem
         {...formItemLayout}
         label="姓名"
        >
          {getFieldDecorator('name', {
          })(
            <Input/>
          )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="个人介绍"
        >
          {getFieldDecorator('profile.introduction', {
          })(
            <Input.TextArea rows={4}/>
          )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="学号"
        >
          {getFieldDecorator('student_id', {
          })(
            <Input/>
          )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="专业"
        >
          {getFieldDecorator('major', {
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="年级"
        >
          {getFieldDecorator('grade', {
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="班级"
        >
          {getFieldDecorator('class_in', {
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">修改</Button>
        </FormItem>
      </Form>
      
    );
  }
}

const WrappedRegistrationForm = Form.create(
    {
    mapPropsToFields({data}) {
        
        let {name, student_id, grade, class_in, major, profile} = data;
        let { introduction, username, sex } = profile || {};
        return {
            username: Form.createFormField({
                value: username,
            }),
            name: Form.createFormField({
                value: name,
            }),
            sex: Form.createFormField({
                value: sex,
            }),
            student_id: Form.createFormField({
                value: student_id,
            }),
            class_in: Form.createFormField({
                value: class_in,
            }),
            grade: Form.createFormField({
                value: grade,
            }),
            major: Form.createFormField({
                value: major,
            }),
            'profile.introduction': Form.createFormField({
                value: introduction,
            }),
        };
    }
    }
)(RegistrationForm);

export default (props) => (
  <Card title = {<span style = {{fontSize: '18px'}}>用户信息</span>}>
    <WrappedRegistrationForm {...props}/>
  </Card>
)