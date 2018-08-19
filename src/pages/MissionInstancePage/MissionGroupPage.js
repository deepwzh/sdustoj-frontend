import React from 'react';
import { Button, Card, Popconfirm, message, Drawer, Form, } from 'antd';
import { Link } from 'react-router-dom'; 
import Table from '../../components/Table';
import { DrawerForm }  from './Form';
import { RESOURCE, PERMISSION, has_permission } from '../../utils/config';
/**
 * @description 一个小按钮而已(添加按钮)
 */
class CreateProblem extends React.Component {
    render() {
        return (
            <Button onClick = {this.props.onCreate}>
                添加题目
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
        let {mission_group_id, mission_id} = this.props;
        this.props.deleteMission(mission_group_id, mission_id);
        // message.success('删除成功');
    }
    
    cancel = (e)=> {
        console.log(e);
        message.error('取消成功');
    }
    
    render() {  //TODO: 这个地方需要修改，原因是 现在还没有按钮动作 甚至更换按钮
        return (
          <Popconfirm title="确定要删除该项?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
           <Button>Delete</Button>
          </Popconfirm>
        )
    }
}

class MissionGroupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createProblemFlag: false,
            filteredInfo: {},
            sortedInfo: {},
        }
    }
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
        });
    }
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        
        let {data} = this.props;
        data = data || [];
        let columns = [
            // {
            //     title: '状态',
            //     dataIndex: 'problem_state',
            //     key: 'problem_state',
            // },
      
            {
            title: '题目ID',
            dataIndex: 'problem_id',
            key: 'problem_id',
            sorter: (a, b) => a.problem_id - b.problem_id,
            sortOrder: sortedInfo.columnKey === 'problem_id' && sortedInfo.order,
          }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title > b.title, //从小到大
            sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
            render: (text, record, index) => {
              console.log(record);
              
              let to = this.props.location.pathname + "/problem/" + record.id;
              return <Link to={to} >{text}</Link>
            }
          }, {
            title: '简介',
            dataIndex: 'introduction',
            key: 'introduction',
            // sorter: (a, b) => a.start_time > b.start_time, //从小到大
            // sortOrder: sortedInfo.columnKey === 'start_time' && sortedInfo.order,
          }, {
            title: '来源',
            dataIndex: 'source',
            key: 'source',
            sorter: (a, b) => a.source > b.source, //从小到大
            sortOrder: sortedInfo.columnKey === 'source' && sortedInfo.order,
          }
        ];
        let createProblem = null;
        let role = this.props.auth.role;
        if(has_permission(role, RESOURCE.PROBLEM, PERMISSION.DELETE))   { // 如果可写，添加删除列项描述， 并在每条数据后加一个可编辑项

            columns.push(
                {
                    title: '删除',      // 名叫删除，索引编辑 cool :)
                    dataIndex: 'edit',
                    key: 'edit',
                    render: (text, record, index)=>(
                        <DeleteItem 
                        mission_id={record.id} 
                        mission_group_id={this.props.mission_group_id}
                        deleteMission={this.props.deleteMission}
                         />)
                }
            );
            data = data.map(
                (ele) => {
                    return Object.assign({}, ele, {edit : true});
                  }
            );
            console.log(data);
        }

        if (has_permission(role, RESOURCE.MISSION, PERMISSION.CREATE)) {
            createProblem = <CreateProblem onCreate = {()=>{this.setState({createMissionFlag : true})}}/>
        }
        return (
            <Card extra = {createProblem}>
                <Table columns={columns} dataSource={data} onChange={this.handleChange} />
                <DrawerForm visible = {this.state.createProblemFlag}  onSubmit={(data) => this.props.createMission(data, this.props.mission_group_id)}
                    onClose = {() => {this.setState({createProblemFlag : false})}} />
            </Card>
        );
    }
}
export default MissionGroupPage;