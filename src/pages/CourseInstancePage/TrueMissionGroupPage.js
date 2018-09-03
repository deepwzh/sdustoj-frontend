import React from 'react';
import { Button, Card, Popconfirm, message, Drawer, Form, } from 'antd';
import { Link } from 'react-router-dom'; 
import Table from '../../components/Table';
import { CreateMissionGroupDrawer }  from './Form';

import { HeaderPage } from '../HeaderPage';
import { RESOURCE, PERMISSION, has_permission } from '../../utils/config';
import { getFormattedTime } from '../../utils/common';
import { callbackDecorator } from '../../utils/message';

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
//
// TODO: 不知道是不是这么写，有待商榷
// const CompleteForm = WrappedTimeRelatedForm;
class MissionGroupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            drawerVisible: false,
            editing_record: null,
        }
    }
    componentDidMount() {
        this.fetchDataSource();
    }
    fetchDataSource = () => {
        let { listMissionGroup } = this.props;
        listMissionGroup().then(
            (data) => this.setState({
                dataSource: data.results,
                editing_record: null,
            })
        ) // 获取题目数据
        .catch((err)=> alert(err));
    }
    componentWillReceiveProps(newProps) {

    }
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
        });
    }
    render() {
        // let { sortedInfo, filteredInfo } = this.state;
        let { dataSource } = this.state;
        // let {data} = this.props;
        let columns = [{
            title: '任务组ID',
            dataIndex: 'id',
            key: 'id',
            // sorter: (a, b) => a.id - b.id,
            // sortOrder: this.state.sortedInfo.columnKey === 'id' && this.state.sortedInfo.order,
        }, {
            title: '任务组名称',
            dataIndex: 'caption',
            key: 'caption',
            // sorter: (a, b) => a.caption > b.caption, //从小到大
            // sortOrder: this.state.sortedInfo.columnKey === 'caption' && this.state.sortedInfo.order,
            render: (text, record, index) => {
                let to = "#mission_group/" + record.id;
                return <Link to={to} >{text}</Link>
            }
        }, {
            title: '任务组创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
            // sorter: (a, b) => a.create_time - b.create_time, //从小到大
            // sortOrder: this.state.sortedInfo.columnKey === 'start_time' && this.state.sortedInfo.order,

            render: (text, record, index) => {
                return getFormattedTime(text);
            },

        }, {
            title: '权重',
            dataIndex: 'weight',
            key: 'weight',
            render: (text) => (
                parseFloat(text).toFixed(2)
            )
            // sorter: (a, b) => a.weight - b.weight, //从小到大
            // sortOrder: this.state.sortedInfo.columnKey === 'end_time' && this.state.sortedInfo.order,

            // render: (text, record, index) => {
            //     return getFormattedTime(text);
            // },
        },
        //  {
        //     title: '状态',
        //     dataIndex: 'available',
        //     key : 'available',
        //     render: (text, record, index) => {
        //         return <span>{text?"可用":"废弃"}</span>
        //     }
        // }
        ];
        if(has_permission(RESOURCE.MISSION_GROUP, PERMISSION.UPDATE))   { // 如果可写，添加删除列项描述， 并在每条数据后加一个可编辑项
            columns.push(
                {
                    title: '操作',      
                    dataIndex: 'edit',
                    key: 'edit',
                    render: (text, record, index)=>(
                        <OperationItem 
                            onUpdate={() => this.setState({
                                editing_record: record,
                                drawerVisible: true,
                            })} 
                            onDelete={() => callbackDecorator(this.fetchDataSource)(this.props.deleteMissionGroup)(record.id)}
                            />
                    )
                }
            );
            dataSource = dataSource.map(
                (ele) => {
                    return Object.assign({}, ele, {edit : true});
                  }
            );
        }
        // let createMission = null;
        
        let extraContent = null;
        if (has_permission(RESOURCE.MISSION_GROUP, PERMISSION.CREATE)) {
            extraContent = (
                <Button 
                    onClick = {()=>this.setState({drawerVisible: true, editing_record: null})}
                    type="primary"
                    >
                    创建任务组
                </Button>
            );
        }
        return (
            <div>
                <HeaderPage
                caption={this.props.caption}
                introduction={this.props.introduction}
                />
                <Card extra = {extraContent}>
                    <Table columns={columns} dataSource={dataSource} onChange={this.handleChange} />
                    <CreateMissionGroupDrawer visible = {this.state.drawerVisible}
                        data={this.state.editing_record}
                        onCreate={(data) => callbackDecorator(this.fetchDataSource)(this.props.createMissionGroup)(data)}
                        onUpdate={(data) => callbackDecorator(this.fetchDataSource)(this.props.updateMissionGroup)(data, this.state.editing_record.id)}
                        onClose = {() => {this.setState({drawerVisible : false})}} />
                </Card>
            </div>
        );
    }
}
export default MissionGroupPage;