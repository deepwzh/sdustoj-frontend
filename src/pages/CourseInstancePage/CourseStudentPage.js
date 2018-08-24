/**
 * @description student table 
 * @time 18-08-16
 * 有点太久了 emmm
 */

import React from 'react';
import { Button, Card, Popconfirm, message, Drawer, Form, } from 'antd';
import { Link } from 'react-router-dom'; 
import Table from '../../components/Table';
import { BatchCreateStudentDrawer }  from './Form';
import { RESOURCE, PERMISSION, has_permission } from '../../utils/config';
import {simpleTime} from './../../utils/simpleTime';
import { HeaderPage } from '../HeaderPage';

/**
 * @description 一个小按钮而已(添加按钮)
 */
class CreateMission extends React.Component {
    render() {
        return (
        <div>
            <Button>
                添加
            </Button>
            <Button onClick={this.props.onBatchCreate}>
                批量添加
            </Button>
        </div>
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
        this.props.onSubmit();
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
// TODO: 不知道是不是这么写，有待商榷
// const CompleteForm = WrappedTimeRelatedForm;
class StudentTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createMissionFlag: false,
            filteredInfo: {},
            sortedInfo: {},
            batchCreateStudentDrawerVisible: false,
        }
    }
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
        });
    }
    componentDidMount() {
        // this.props.RetrieveMissionStudent();
    }
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        
        let {data} = this.props;
        let columns = [{
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            sorter: (a, b) => a.username > b.username,
        //    sortOrder: this.state.sortedInfo.columnKey === 'id' && this.state.sortedInfo.order,
        }, {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name > b.name, //从小到大 (so, are you sure??)
        //    sortOrder: this.state.sortedInfo.columnKey === 'caption' && this.state.sortedInfo.order,
            render: (text, record, index) => {
                let to = this.props.pathname + "/mission/" + record.mission_id;
                return <Link to={to} >{text}</Link>
            }
        }, {
            title: '学号',
            dataIndex: 'student_id',
            key: 'student_id',
            sorter: (a, b) => a.student_id - b.student_id, //从小到大
        //    sortOrder: this.state.sortedInfo.columnKey === 'start_time' && this.state.sortedInfo.order,
        }, {
            title: '专业',
            dataIndex: 'major',
            key: 'major',
            sorter: (a, b) => a.update_time - b.update_time, //从小到大
        //    sortOrder: this.state.sortedInfo.columnKey === 'end_time' && this.state.sortedInfo.order,
        }, {
            title: '性别',
            dataIndex: 'sex',
            key : 'sex',
        }, {
            title: '删除',      // 名叫删除，索引编辑 cool :)
            dataIndex: 'edit',
            key: 'edit',
            render: (text, record, index)=>(
                <DeleteItem 
                // id={record.id} 
                onSubmit={() => this.props.deleteMissionStudent(record.id)} />)
        }
            ];
        let createMission = <CreateMission onBatchCreate = {()=>{this.setState({batchCreateStudentDrawerVisible : true})}}/>;
        console.log(data);

        return (
            <div  id="lesson-detail">
                <HeaderPage {...this.props}/>
                <Card id='lesson-detail-content' extra = {createMission}>
                    <Table columns={columns} dataSource={data} onChange={this.handleChange} />
                    <BatchCreateStudentDrawer visible = {this.state.batchCreateStudentDrawerVisible}
                        onSubmit={(data) => this.props.createMission(data, this.props.mission_group_id)}
                        onClose = {() => {this.setState({batchCreateStudentDrawerVisible : false})}} />
                </Card>
            </div>
        );
    }
}
export default StudentTable;