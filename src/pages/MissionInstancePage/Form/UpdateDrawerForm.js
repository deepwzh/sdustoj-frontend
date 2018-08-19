import { Drawer, Form, Tree, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import React from 'react';
import { get_problem_tree, get_mapping } from '../../../utils/tree';
import ProblemPage from '../../ProblemPage';
const TreeNode = Tree.TreeNode;
const Option = Select.Option;

class DrawerForm extends React.Component {
  state = { 
    visible: false,
  };
  componentDidUpdate(prevProps, prevState) {
    
  }
  componentWillReceiveProps(newProps) {
    if (newProps.data && newProps.selectedData) {
      let checkedKeys = [];
      // let tree_data = get_problem_tree(newProps.data);
      // let maps = get_mapping(tree_data);
      for (let item of newProps.selectedData) {
        checkedKeys.push(item.problem_id);
      }
      console.log(checkedKeys);
      this.setState({
        disableCheckedKeys: checkedKeys
      });
    }
  }

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
          // console.log('Received values of form: ', JSON.stringify(values));
         this.props.onSubmit(values);
        }
    });
    }
  render() {
    const { getFieldDecorator } = this.props.form;
    
    return (
      <div>
        <Drawer
          title="添加新题目"
          width={300}
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
                    <Select placeholder="请选择是否废弃"  initialValue="false">
                      <Option value="false">否</Option>
                      <Option value="true">是</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item >
                  <Button type="primary" htmlType="submit">确认更新</Button>
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


export default Form.create({
    mapPropsToFields({data}) {
        const {weight, available, deleted} = data;
        return {
            weight: Form.createFormField({value: weight}),
            available: Form.createFormField({value: available + ""}),
            deleted: Form.createFormField({value: deleted + ""}),
        };
  }})(DrawerForm);
