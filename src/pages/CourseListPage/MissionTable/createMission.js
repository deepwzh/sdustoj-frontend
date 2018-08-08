/**
 * TODO:
 * @description 虽然有点不情愿，但是目前该文件放到这确实是合适的。
 * 后期可考虑将其放到MissionPage文件夹下
 * 顺带说一下，这是一个抽屉型的表单。
 * @time 18-08-05
 */
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import React from 'react';

const { Option } = Select;

class DrawerForm extends React.Component {

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Drawer
          title="Create"
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
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Name">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'please enter user name' }],
                  })(<Input placeholder="please enter user name" />)}
                </Form.Item>
              </Col>
              
            </Row>
            
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Description">
                  {getFieldDecorator('description', {
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
            <Button
              style={{
                marginRight: 8,
              }}
              onClick={this.props.onClose}
            >
              Cancel
            </Button>
            <Button onClick={this.props.onClose} type="primary">Submit</Button>
          </div>
        </Drawer>
      </div>
    );
  }
}
const App = Form.create()(DrawerForm);

export default App;
