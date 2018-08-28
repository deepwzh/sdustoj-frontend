import { Drawer, Form, Button, Col, Row, Input, Table, Tag, Divider } from 'antd';
import React from 'react';
import { studentDataParserFromCsv } from '../../../utils/course';
const { TextArea } = Input;

class DrawerForm extends React.Component {
  state = { visible: false, data: "" };

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
        //   console.log('Received values of form: ', JSON.stringify(values));
        //   let data = studentDataParserFromCsv(values.data);
          this.props.onSubmit(values);
        }
    });
}
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Drawer
          title="修改学生信息"
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
                <Form.Item label="姓名">
                  {getFieldDecorator('name', {
                    // initialValue: "201601060928  wzh\n201601060928 wzh",
                    rules: [{ required: true, message: '请输入数据' }],
                  })(<Input 
                        disabled   
                    />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="学号">
                  {getFieldDecorator('student_id', {
                    // initialValue: "201601060928  wzh\n201601060928 wzh",
                    rules: [{ required: true, message: '请输入数据' }],
                  })(<Input 
                        disabled   
                    />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="密码">
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入学生的新密码' }],
                  })(<Input type='password' placeholder="请输入学生的新密码"
                  />)}
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


const BatchCreateStudentDrawer = Form.create({
    mapPropsToFields({data}) {
        if (!data) {
          return {};
        }
        const { student_id, name } = data;
        return {
            student_id: Form.createFormField({value: student_id}),
            name: Form.createFormField({value: name}),
        };
  }})(DrawerForm);
export default BatchCreateStudentDrawer;