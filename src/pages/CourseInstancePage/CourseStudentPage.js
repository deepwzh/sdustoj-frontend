/**
 * @description student table 
 * @time 18-08-16
 * 有点太久了 emmm
 */

import React from 'react';
import { Button, Card, Popconfirm, message, Drawer, Form, } from 'antd';
import { Link } from 'react-router-dom'; 
import Table from '../../components/Table';
import { BatchCreateStudentDrawer, UpdateStudentDrawer }  from './Form';
import { RESOURCE, PERMISSION, has_permission } from '../../utils/config';
import {simpleTime} from './../../utils/simpleTime';
import { HeaderPage } from '../HeaderPage';
import { callbackDecorator } from '../../utils/message';

/**
 * @description 一个小按钮而已(添加按钮)
 */
class CreateMission extends React.Component {
    render() {
        return (
        <div>
            <Button type = {'primary'}>
                添加
            </Button>
            {' '}
            <Button onClick={this.props.onBatchCreate} type = {'primary'}>
                批量添加
            </Button>
        </div>
        );
    }
}
/**
 * @description 另一个小按钮(每个列项最后的删除按钮)
 */
class OperationItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    confirm = (e)=> {
        this.props.onDelete();
    }
    
    cancel = (e)=> {
        console.log(e);
        message.error('取消成功');
    }
    
    render() {  //TODO: 这个地方需要修改，原因是 现在还没有按钮动作 甚至更换按钮
        return (
          <div>
                <a href="javascript:;" onClick={this.props.onUpdate}>修改</a>
                <span> | </span>
                <Popconfirm title="确定要删除该项?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <a href="javascript:;">删除</a>
                </Popconfirm>
          </div>
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
            updateStudentDrawerVisible: false,
            dataSource: [],
            editing_record: null
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
        this.fetchDataSource();
    }
    fetchDataSource = () => {
        this.props.listMissionStudent().then((data) => {
            this.setState({
                dataSource: data.results,
                editing_record: null,
                updateStudentDrawerVisible: false,
                batchCreateStudentDrawerVisible: false
            });
        });
    }
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        
        let {dataSource} = this.state;
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
            title: '操作',    
            dataIndex: 'operation',
            key: 'edit',
            render: (text, record, index)=>{
                return (<OperationItem 
                    onUpdate={() => this.setState({
                        updateStudentDrawerVisible: true,
                        editing_record: record
                    })} 
                    onDelete={() => callbackDecorator(this.fetchDataSource)(this.props.deleteMissionStudent)(record.id)} 
                    />)
                }
        }];
        let createMission = <CreateMission onBatchCreate = {()=>{this.setState({batchCreateStudentDrawerVisible : true})}}/>;

        return (
            <div  id="lesson-detail">
                <HeaderPage {...this.props}/>
                <Card id='lesson-detail-content' extra = {createMission}>
                    <Table columns={columns} dataSource={dataSource} onChange={this.handleChange} />
                    <BatchCreateStudentDrawer 
                        visible = {this.state.batchCreateStudentDrawerVisible}
                        onSubmit={(data) => callbackDecorator(this.fetchDataSource)(this.props.createMissionStudent)(data)}
                        onClose = {() => {this.setState({batchCreateStudentDrawerVisible : false})}} 
                        />
                    <UpdateStudentDrawer 
                        data={this.state.editing_record}
                        visible = {this.state.updateStudentDrawerVisible}
                        onSubmit={(data) => callbackDecorator(this.fetchDataSource)(this.props.updateMissionStudent)(data, this.state.editing_record.id)}
                        onClose = {() => {this.setState({updateStudentDrawerVisible : false})}} 
                        />
                </Card>
            </div>
        );
    }
}
export default StudentTable;