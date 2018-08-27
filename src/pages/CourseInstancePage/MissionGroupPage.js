import React from 'react';
import { Button, Card, Popconfirm, message, Drawer, Form, } from 'antd';
import { Link } from 'react-router-dom'; 
import Table from '../../components/Table';
import { CreateMissionDrawer }  from './Form';
import { UpdateMissionDrawer }  from './Form';

import { HeaderPage } from '../HeaderPage';
import { RESOURCE, PERMISSION, has_permission } from '../../utils/config';
import { getFormattedTime } from '../../utils/common';
import { callbackDecorator } from '../../utils/message';

import './index.css';
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
        this.props.onDelete();
        // message.success('删除成功');
    }
    
    cancel = (e)=> {
        console.log(e);
        message.error('取消成功');
    }
    
    render() {  //TODO: 这个地方需要修改，原因是 现在还没有按钮动作 甚至更换按钮
        return (
          <Popconfirm title="确定要删除该项?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
           <Button>删除</Button>
          </Popconfirm>
        )
    }
}
// TODO: 不知道是不是这么写，有待商榷
// const CompleteForm = WrappedTimeRelatedForm;
class MissionGroupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createMissionFlag: false,
            createMissionGroupFlag: false,
            filteredInfo: {},
            sortedInfo: {},
            editing_record: null,
            dataSource: []
        }
    }
    componentDidMount() {
        this.fetchDataSource();
    }
    componentWillReceiveProps(newProps) {
        this.fetchDataSource({mission_group_id: newProps.mission_group_id});
    }
    fetchDataSource = (data) => {
        let { mission_group_id } = data || {};
        mission_group_id = mission_group_id || this.props.mission_group_id;
        if (!mission_group_id) return;
        if (mission_group_id == '0') {
            this.props.listRunningMission()
            .then(data => 
                this.setState({
                    dataSource: data.results,
                    createMissionFlag: false
                })
            ); 
        } else {
            this.props.listMission(mission_group_id)
                .then(data => 
                    this.setState({
                        dataSource: data.results
                    })
                ); 

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
        
        let {dataSource} = this.state;
        let columns = [{
            title: '任务ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            sortOrder: this.state.sortedInfo.columnKey === 'id' && this.state.sortedInfo.order,
        }, {
            title: '任务名称',
            dataIndex: 'caption',
            key: 'caption',
            sorter: (a, b) => a.caption > b.caption, //从小到大
            sortOrder: this.state.sortedInfo.columnKey === 'caption' && this.state.sortedInfo.order,
            render: (text, record, index) => {
                let to = this.props.pathname  + "/mission/" + (record.mission_id || record.id);
                return <Link to={to} >{text}</Link>
            }
        }, {
            title: '任务开始时间',
            dataIndex: 'start_time',
            key: 'start_time',
            sorter: (a, b) => a.start_time - b.start_time, //从小到大
            sortOrder: this.state.sortedInfo.columnKey === 'start_time' && this.state.sortedInfo.order,

            render: (text, record, index) => {
                return getFormattedTime(text);
            },

        }, {
            title: '任务结束时间',
            dataIndex: 'end_time',
            key: 'end_time',
            sorter: (a, b) => a.end_time - b.end_time, //从小到大
            sortOrder: this.state.sortedInfo.columnKey === 'end_time' && this.state.sortedInfo.order,

            render: (text, record, index) => {
                return getFormattedTime(text);
            },
        }, {
            title: '状态',
            dataIndex: 'available',
            key : 'available',
            render: (text, record, index) => {
                return <span>{text?"可用":"废弃"}</span>
            }
        }];
        if(has_permission(RESOURCE.MISSION, PERMISSION.UPDATE))   { // 如果可写，添加删除列项描述， 并在每条数据后加一个可编辑项
            columns.push(
                {
                    title: '修改',      // 名叫删除，索引编辑 cool :)
                    dataIndex: 'edit',
                    key: 'edit',
                    render: (text, record, index)=>(
                        <Button onClick={() => {
                            this.setState({
                                editing_record: record,
                                createMissionFlag: true,
                            })
                            // this.props.getMissionInstance(record.mission_id).then((data) => {
                            //     this.setState({
                            //         editing_record: data,
                            //         createMissionFlag: true,
                            //     });
                            // })
                        }
                        }>修改</Button> 
                    )
                }
            );
            dataSource = dataSource.map(
                (ele) => {
                    return Object.assign({}, ele, {edit : true});
                  }
            );
        }
        let createMission = null;
        
        if(has_permission(RESOURCE.MISSION, PERMISSION.DELETE))   { // 如果可写，添加删除列项描述， 并在每条数据后加一个可编辑项
            columns.push(
                {
                    title: '删除',      // 名叫删除，索引编辑 cool :)
                    dataIndex: 'delete',
                    key: 'delete',
                    render: (text, record, index)=>(
                        <DeleteItem 
                            onDelete={() => callbackDecorator(this.props.deleteMission)((record.id, this.props.mission_group_id))}
                         />)
                }
            );
            dataSource = dataSource.map(
                (ele) => {
                    return Object.assign({}, ele, {delete : true});
                  }
            );
        }
        if (has_permission(RESOURCE.MISSION, PERMISSION.CREATE)) {
            createMission = <CreateMission onCreate = {()=>{this.setState({createMissionFlag : true, editing_record: null})}}/>
        }
        return (
            <div>
            <Card extra = {createMission}>
                <Table columns={columns} dataSource={dataSource} onChange={this.handleChange} />
                {this.state.editing_record?
                <UpdateMissionDrawer visible = {this.state.createMissionFlag}
                    data={this.state.editing_record}
                    onUpdate={(data) => callbackDecorator(this.fetchDataSource)(this.props.updateMission)(data, this.props.mission_group_id, this.state.editing_record.id)}
                    onClose = {() => {this.setState({createMissionFlag : false})}} />
                :<CreateMissionDrawer visible = {this.state.createMissionFlag}
                    onCreate={(data) => callbackDecorator(this.fetchDataSource)(this.props.createMission)(data, this.props.mission_group_id)}
                    onClose = {() => {this.setState({createMissionFlag : false})}} />
                }
            </Card>
            </div>
        );
    }
}
export default MissionGroupPage;