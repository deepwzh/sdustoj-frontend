/**
 * @description 关于 完整的表格，至少包括一个最右边的删除列（具有写权限才显示），
 * 删除之后的动作由上层提供。
 * 一个创建新表格行的添加按钮（具有写权限显示），点击按钮后需要一个表单，经过考虑，表单由上层提供。
 * 还有最重要的表格。
 * 表格的 1列项描述(columns) 2数据(dataSource) 3是否可写(isRead) 4删除动作(handleDelete) 5表单(Form) 皆由上层提供（不提供默认选项）
 * @time 18-08-07 
 * 因为某些BUG，（重复添加删除列项描述）
 * （如果可写，添加删除列项描述， 并在每条数据后加一个可编辑项）交由上层处理吧
 */
import React from "react";
import { Table, Button, Card, Popconfirm, message, Drawer, Form, } from 'antd';
import { withRouter } from 'react-router-dom';

/**
 * @description 一个小按钮而已(添加按钮)
 */
class CreateMission extends React.Component {
    render() {
        return (
            <Button onClick = {this.props.onCreate}>
                Create
            </Button>
        );
    }
}

/**
 * @description 另一个小按钮(每个列项最后的删除按钮)
 */
class DeleteItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    confirm = (e)=> {
        console.log(e);
        message.success('Click on Yes');
    }
      
    cancel = (e)=> {
        console.log(e);
        message.error('Click on No');
    }
    
    render() {  //TODO: 这个地方需要修改，原因是 现在还没有按钮动作 甚至更换按钮
        return (
          <Popconfirm title="确定要删除该项?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
           <Button>Delete</Button>
          </Popconfirm>
        )
    }
}


/**
 * @description 与提交表单相关的一个小抽屉
 */
class DrawerForm extends React.Component {

    render() {
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
          {/*上层传递的表单*/}
          {this.props.Form}

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

  // TODO: 不知道是不是这么写，有待商榷
const CompleteForm = Form.create()(DrawerForm);

/**
 * @description 一个表格模板
 */
class TableEx extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            createMissionFlag: false,    // 判断创建按钮是否点击
        };

    }

    addItem = () => {   // 同步数据库添加

    }

    deleteItem = (key) => { // 我们需要同步数据库删除

    }

    render() {
        let createMission = null;

        if(this.props.isRead)   { 
            
            createMission = <CreateMission onCreate = {()=>{this.setState({createMissionFlag : true})}}/>
        }

        return (
            <Card extra = {createMission}>
                <Table  columns = {this.props.columns} dataSource = {this.props.dataSource}/>
                <CompleteForm visible = {this.state.createMissionFlag} 
                    onClose = {() => {this.setState({createMissionFlag : false})}} />
            </Card>
        );
    }
}

export default withRouter(TableEx);

/*
const columns = [
    ,
    {
        title = '删除',
        dataIndex = 'edit',
        key = 'edit',
        render : (text, record)=> {
            <Popconfirm title="确定要删除该项?" onConfirm={() => {this.props.deleteItem(record.key)}} >
                <Button>Delete</Button>
            </Popconfirm>
        }
    }
]; 
*/
/*
  columns.push(
                {
                    title: '删除',      // 名叫删除，索引编辑 cool :)
                    dataIndex: 'edit',
                    key: 'edit',
                    render: ()=>{<DeleteItem />}
                }
            );
            let newData = dataSource.map(
                (ele) => {
                    return Object.assign({}, ele, {edit : true});
                  }
            );
            dataSource = newData;


*/