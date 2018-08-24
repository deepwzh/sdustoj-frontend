import moment from "moment";
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import React from 'react';
import { getFormattedDate } from "../../../utils/common";
const { Option } = Select;
class DrawerForm extends React.Component {
  state = { 
    visible: false,
    course_meta_list: []
  };
  componentDidMount() {
    this.props.listCourseMeta().then((data) => {
      this.setState({course_meta_list: data.results})
    })
  }
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
          values = {...values, start_time: getFormattedDate(values.start_time[0]), 
            end_time: getFormattedDate(values.start_time[1]),
          };
          if (this.props.data) {
            this.props.onUpdate(values);
          } else {
            this.props.onCreate(values, values.course_meta_id);
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
    const { course_meta_list } = this.state;
    return (
      <div>
        <Drawer
          title="新建课程"
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
                <Form.Item label="课程名称">
                  {getFieldDecorator('caption', {
                    rules: [{ required: true, message: 'please enter user name' }],
                  })(<Input placeholder="请输入任务名称" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="课元">
                  {getFieldDecorator('course_meta_id', {
                    rules: [{ required: true, message: 'Please select an owner' }],
                  })(
                    <Select disabled={this.props.data?true:false} placeholder="请选择课元">
                      {
                        course_meta_list.map((item) => (
                        <Option value={item.id}>{item.caption}</Option>
                      ))
                      }
                    </Select>
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
                    <Select placeholder="请选择是否可用">
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
              <Col span={24}>
                <Form.Item label="课程介绍">
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
        const {caption, introduction, meta, start_time, end_time, mode, available, deleted} = data;
        return {
            course_meta_id: Form.createFormField({value: meta}),
            available: Form.createFormField({value: available + ""}),
            deleted: Form.createFormField({value: deleted + ""}),
            caption: Form.createFormField({value: caption}),
            introduction: Form.createFormField({value: introduction }),
            start_time: Form.createFormField({value: [moment(start_time), moment(end_time)]}),
        };
  }}
)(DrawerForm);
export default CreateMissionDrawer;