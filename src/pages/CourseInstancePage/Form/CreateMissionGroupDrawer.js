import moment from "moment";
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import React from 'react';
const { Option } = Select;
class DrawerForm extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (!err) {
          // values = {...values, start_time: values.start_time[0], end_time: values.start_time[1]};
          console.log('Received values of form: ', JSON.stringify(values));
          if (this.props.data) {
            this.props.onUpdate(values).then(() => this.props.onClose());
          } else {
            this.props.onCreate(values).then(() => this.props.onClose());
          }
        }

        // this.props.login(values.username, values.password);
        // let token_req  = this.get_token(); //获取token
        // let login_req = this.login("token", values);
        // login_req.then(
        //   (data) => 
        //     this.props.history.push(this.props.redirect)
        // )
        // .catch((err)=> alert(err)); //请求成功，调用login
        // values;
    });
}
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Drawer
          title="新建任务"
          width={720}
          placement="right"
          onClose={this.props.onClose}
          maskClosable={false}
          visible={this.props.visible}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
        >
          <Form  onSubmit={this.handleSubmit} layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="任务组名称">
                  {getFieldDecorator('caption', {
                    rules: [{ required: true, message: 'please enter user name' }],
                  })(<Input placeholder="请输入任务名称" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="权重">
                  {getFieldDecorator('weight', {
                    rules: [{ required: true, message: 'please enter url' }],
                  })(
                    <Input
                      style={{ width: '100%' }}
                      placeholder="请输入权重"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="可用">
                  {getFieldDecorator('available', {
                    initialValue: "true",
                    rules: [{ required: true, message: 'Please select an owner' }],
                  })(
                    <Select placeholder="请选择是否可用" defaultValue="true">
                      <Option value="true">可用</Option>
                      <Option value="false">不可用</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="废弃">
                  {getFieldDecorator('deleted', {
                    initialValue: "false",
                    rules: [{ required: true, message: 'Please choose the type' }],
                  })(
                    <Select placeholder="请选择是否废弃"  defaultValue="false">
                      <Option value="false">否</Option>
                      <Option value="true">是</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="任务组介绍">
                  {getFieldDecorator('introduction', {
                    rules: [
                      {
                        required: false,
                        message: 'please enter url description',
                      },
                    ],
                  })(<Input.TextArea rows={4} placeholder="please enter url description" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
              </Col>
            </Row>
            
          </Form>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px',
            }}
          >
            {/* <Button
              style={{
                marginRight: 8,
              }}
              onClick={this.onClose}
            >
              Cancel
            </Button>
            <Button onClick={this.onClose} type="primary">Submit</Button> */}
          </div>
        </Drawer>
      </div>
    );
  }
}


const CreateMissionDrawer = Form.create({
    mapPropsToFields({data}) {
        if (!data) {
          return {};
        }
        const {caption, introduction, weight,  available, deleted} = data;
        return {
            caption: Form.createFormField({value: caption}),
            weight: Form.createFormField({value: weight}),
            available: Form.createFormField({value: available + ""}),
            deleted: Form.createFormField({value: deleted + ""}),
            introduction: Form.createFormField({value: introduction }),

        };
  }}
)(DrawerForm);
export default CreateMissionDrawer;