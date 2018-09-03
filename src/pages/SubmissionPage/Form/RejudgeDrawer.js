import React from 'react';
import { Tabs, Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';

const TabPane = Tabs.TabPane;

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
  callback = (key) => {
    console.log(key);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          Create
        </Button>
        <Drawer
          title="重判"
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
    <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane tab="根据条件选择" key="1">
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="任务名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入任务名' }],
                        })(<Input disabled />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="题目">
                        {getFieldDecorator('owner', {
                            rules: [{ required: true, message: '请选择题目' }],
                        })(
                            <Select 
                            // mode="multiple"
                            placeholder="请选择题目">
                                <Option value="all">全部</Option>
                                <Option value="A">问题A</Option>
                                <Option value="B">问题B</Option>
                            </Select>
                        )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="用户名">
                        {getFieldDecorator('approver', {
                            rules: [{ required: true, message: 'Please choose the approver' }],
                        })(
                            <Select placeholder="请选择用户名">
                                {/* mode="multiple" */}
                                <Option value="jack">201601060928</Option>
                                <Option value="tom">201601060927</Option>
                            </Select>
                        )}
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={16}>
                <Col span={12}>
                        <Form.Item label="提交时间">
                        {getFieldDecorator('dateTime', {
                            rules: [{ required: true, message: 'Please choose the dateTime' }],
                        })(
                            <DatePicker.RangePicker
                            style={{ width: '100%' }}
                            getPopupContainer={trigger => trigger.parentNode}
                            />
                        )}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
          </TabPane>
          <TabPane tab="根据提交ID选择" key="2">Content of Tab Pane 2</TabPane>
         </Tabs>
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
              onClick={this.onClose}
            >
              Cancel
            </Button>
            <Button onClick={this.onClose} type="primary">Submit</Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

const RejudgeDrawer = Form.create()(DrawerForm);
export default RejudgeDrawer;