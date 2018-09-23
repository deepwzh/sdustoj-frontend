import moment from "moment";
import { Card, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
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
          values = {...values, start_time: values.start_time[0], end_time: values.start_time[1]};
          values = {...values, config: {
            ...this.props.data.config,
            type: values.mode,
            difficulty: values.difficulty
          }}
          // console.log('Received values of form: ', JSON.stringify(values));
          if (this.props.data) {
            this.props.onUpdate(values);
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
        <Card title='任务管理'>
          <Form  onSubmit={this.handleSubmit} layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="任务名称">
                  {getFieldDecorator('caption', {
                    rules: [{ required: true, message: 'please enter user name' }],
                  })(<Input placeholder="请输入任务名称" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="起止时间">
                  {getFieldDecorator('start_time', {
                    rules: [{ required: true, message: '请选择任务的起止时间' }],
                  })(
                    <DatePicker.RangePicker
                      showTime={{ format: 'HH:mm' }}
                      format="YYYY-MM-DD HH:mm"
                      style={{ width: '100%' }}
                      getPopupContainer={trigger => trigger.parentNode}
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
              <Col span={12}>
                <Form.Item label="模式">
                  {getFieldDecorator('mode', {
                    rules: [{ required: true, message: '请选择模式' }],
                  })(
                    <Select placeholder="请选择模式" defaultValue="Experiment">
                      <Option value="Experiment">实验</Option>
                      <Option value="Homework">作业</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="难度值">
                  {getFieldDecorator('difficulty', {
                    rules: [{ required: true, message: '请选择难度值' }],
                  })(
                    <Select placeholder="请选择难度值" defaultValue="0">
                      <Option value="0">0</Option>
                      <Option value="10">10</Option>
                      <Option value="15">15</Option>
                      <Option value="20">20</Option>
                      <Option value="25">25</Option>
                      <Option value="30">30</Option>
                      <Option value="35">35</Option>
                      <Option value="40">40</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>  
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="任务介绍">
                  {getFieldDecorator('introduction', {
                    rules: [
                      {
                        required: true,
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
        </Card>
      </div>
    );
  }
}


const CreateMissionForm = Form.create({
    mapPropsToFields({data}) {
        if (!data) {
          return {};
        }
        const {caption, introduction, start_time, end_time, mode, available, deleted, config } = data;
        const { difficulty } = config || {};
        return {
            // weight: Form.createFormField({value: weight}),
            available: Form.createFormField({value: available + ""}),
            deleted: Form.createFormField({value: deleted + ""}),
            caption: Form.createFormField({value: caption}),
            introduction: Form.createFormField({value: introduction }),
            mode: Form.createFormField({value: mode}),
            start_time: Form.createFormField({value: [moment(start_time), moment(end_time)]}),
            difficulty: Form.createFormField({value: difficulty}),
        };
  }}
)(DrawerForm);
export default CreateMissionForm;