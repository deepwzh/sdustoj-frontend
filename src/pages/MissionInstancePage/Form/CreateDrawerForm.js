import { Drawer, Form, Tree, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import React from 'react';
import { get_problem_tree, get_mapping } from '../../../utils/tree';
import ProblemPage from '../../ProblemPage';
const TreeNode = Tree.TreeNode;


class DrawerForm extends React.Component {
  state = { 
    visible: false,
    preview_problem_id: 0,
    preview_problem_data: null,
    childrenDrawer: false,
    disableCheckedKeys: [],
    // expandedKeys: [],
    // autoExpandParent: true,
    checkedKeys: [],
    // selectedKeys: [],
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
          // console.log('Received values of form: ', JSON.stringify(values));
          let problems_id = [];
          for (let checkedKey of this.state.checkedKeys) {
            let problem_id = this.getProblemId(checkedKey);
            if (problem_id) {
              problems_id.push(problem_id);
            }
          }
          console.log("submiting problem ids " + problems_id);
          problems_id.forEach(
            (problem_id) => this.props.onCreate({ problem: problem_id})
          );
         // this.props.onSubmit(JSON.stringify(values));
        }
    });
}
  preview_problem(problem_id) {
    // this.setState({
    //   preview_problem_id: problem_id
    // })
    this.get_preview_problem_data(problem_id);
    this.showChildDrawer();
  }
  get_preview_problem_data(preview_problem_id) {
    let data = this.props.data.filter((item, index)=> item.id === preview_problem_id)
    this.setState({
      preview_problem_data: data[0]
    });
  }
  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false
    })
  }
  showChildDrawer() {
    this.setState({
      childrenDrawer: true
    });
  }
  getProblemId(selectedKey) {
    if (!selectedKey) return 0;
    let paths = selectedKey.split('-');
    paths.shift();
    let pos = paths.pop();
    let data = get_problem_tree(this.props.data);

    for (let path of paths) {
      data = data[path].children;
    }
    if (data[pos].children) {
      return 0;
    }
    return data[pos].id;
  }
  getSelectedKey(problemId) {
    let {data} = this.props;
    for (let item of data) {}
    data = data  || [];
  }
  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    // this.setState({
    //   expandedKeys,
    //   autoExpandParent: false,
    // });
  }

  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  }

  onSelect = (selectedKeys, info) => {
    if (selectedKeys.length <= 0) {
      return;
    }
    // console.log("selectedKeys" + " #" + selectedKeys);
    let problems_id = [];
    // for (let selectedKey of selectedKeys) {
    let problem_id = this.getProblemId(selectedKeys[0]);
    if (problem_id) {

      this.preview_problem(problem_id);
      console.log(problem_id);
    }
    // }
    
    // this.setState({ selectedKeys });
  }
renderTreeNodes = (data) => {
  return data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} isLeaf disableCheckbox={this.state.disableCheckedKeys.includes(item.id)?true:false}/>;
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
                <Form.Item label="题库">
                  <Tree
                    checkable
                    onExpand={this.onExpand}
                    autoExpandParent={this.state.autoExpandParent}
                    onCheck={this.onCheck}
                    checkedKeys={this.state.checkedKeys}
                    // expandedKeys={this.state.expandedKeys}
                    // checkedKeys={this.state.checkedKeys}
                    // selectedKeys={this.state.selectedKeys}
                    onSelect={this.onSelect}
                  >
                  {this.renderTreeNodes(get_problem_tree(this.props.data))}
                  </Tree>
                </Form.Item>
              </Col>
            </Row> 
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item >
                  <Button type="primary" htmlType="submit">确认添加</Button>
                </Form.Item>
              </Col>
            </Row>             
          </Form>
          <Drawer
            title="题目预览"
            width={600}
            closable={true}
            maskClosable={false}
            onClose={this.onChildrenDrawerClose}
            visible={this.state.childrenDrawer}
          >
            <ProblemPage 
                disableEditor
                data={this.state.preview_problem_data}
              />
          </Drawer>
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


export default Form.create()(DrawerForm);
