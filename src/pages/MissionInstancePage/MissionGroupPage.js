import React from 'react';
import { Button, Card, Popconfirm, message, Drawer, Form, } from 'antd';
import { Link } from 'react-router-dom'; 
import Table from '../../components/Table';
import { DrawerForm, CreateProblemQuick }  from './Form';
import { RESOURCE, PERMISSION, has_permission } from '../../utils/config';
import { CreateDrawerForm, UpdateDrawerForm }  from './Form';
import { callbackDecorator } from '../../utils/message';


/**
 * @description 一个小按钮而已(添加按钮)
 */
class CreateProblem extends React.Component {
    render() {
        return (
            <div>
                <Button onClick = {this.props.onCreate} type = {'primary'}>
                    添加题目
                </Button>
                <Button onClick = {this.props.onQuickCreate} type = {'primary'}>
                    快速添加题目
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

class MissionGroupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateDrawerFormVisible: false,
            editing_record: {}, //此ID为主键ID
            createProblemFlag: false,
            filteredInfo: {},
            sortedInfo: {},
            dataSource: [],
            available_problem_data: [],
            problemCreateQuickVisible: false
            // data: []
        }
    }
    fetchDataSource = () => {
        this.props.listMissionProblem(this.props.mission_id).then(data => {
            this.setState({
                dataSource: data.results
            });
        });
    }
    componentDidMount() {
        this.fetchDataSource();
    }
    componentWillReceiveProps(newProps) {
        // this.setState({
        //     data: newProps.data || []
        // });
    }
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
        });
    }
    updateSelectedData(problems_id) {
        let ids = [...problems_id];
        this.setState({
            data: [
                ...this.state.data.filter(
                        (item) => {
                            let index = ids.indexOf(item.problem_id);
                            if(index !== -1) {
                                ids.splice(index, 1);
                                return true;
                            } else {
                                return false;
                            }
                        }
                    ),
                 ...this.props.available_problem_data.map((v) => v.problem).filter(
                     (item) => ids.includes(item.problem_id)
                    )
                ]
        })
    }
    render() {

        let { sortedInfo, filteredInfo } = this.state;
        let {dataSource} = this.state;
        let score_state = [
            {
                title: '分数',
                dataIndex: 'score',
                key: 'score',
                render: (text, item, index) => {
                    if (this.props.grade_info && this.props.grade_info[item.problem_id]) {
                        return this.props.grade_info[item.problem_id]['score']
                    } else {
                        return "-";
                    }
                }
            }, {
                 title: '状态',
                 dataIndex: 'problem_state',
                 key: 'problem_state',
                 render: (text, item, index) => {
                    if (this.props.grade_info && this.props.grade_info[item.problem_id]) {
                        return this.props.grade_info[item.problem_id]['status']
                    } else {
                        return "-";
                    }
                }
            },
        ];
        let columns = [...score_state,
             {
                title: '题目ID',
                render: (text, record, index) => {
                // 计算Problem ID
               // return `Problem ${String.fromCharCode('A'.charCodeAt(0) + index)}`;
               return index +1;
               
            }
            // dataIndex: 'index',
            // key: 'index',
            // sorter: (a, b) => a.index - b.problem_id,
            // sortOrder: sortedInfo.columnKey === 'problem_id' && sortedInfo.order,
          }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title > b.title, //从小到大
            sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
            render: (text, record, index) => {
              console.log(record);
                
              let to = this.props.location.pathname + "#problem/" + String.fromCharCode('A'.charCodeAt(0) + index);
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
        if(has_permission(RESOURCE.PROBLEM, PERMISSION.UPDATE))   { 
            columns.push(
                {
                    title: '权重',     
                    dataIndex: 'weight',
                    key: 'weight',
                    render: (text) => (
                        Number.prototype.toFixed.call(parseFloat(text), 3)
                    )
                }
            );
        }
        if(has_permission(RESOURCE.PROBLEM, PERMISSION.UPDATE))   { // 如果可写，添加删除列项描述， 并在每条数据后加一个可编辑项
            columns.push(
                {
                    title: '操作',      
                    dataIndex: 'edit',
                    key: 'edit',
                    render: (text, record, index)=>(
                        <OperationItem 
                            onUpdate={() => this.setState({
                                editing_record: record,
                                updateDrawerFormVisible: true,
                            })} 
                            onDelete={() =>  callbackDecorator(this.fetchDataSource)(this.props.deleteMissionProblem)(this.props.mission_id, record.id)}
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
        

        if (has_permission(RESOURCE.PROBLEM, PERMISSION.CREATE)) {
            if (this.state.problemCreateQuickVisible) {
                createProblem = <CreateProblemQuick
                    onCreate={(data) => callbackDecorator(this.fetchDataSource)(this.props.createMissionProblem)(data, this.props.mission_id)}
                    onClose={() => this.setState({
                        problemCreateQuickVisible: false
                    })}
                />
            } else {
                createProblem = <div>
                <CreateProblem 
                    onCreate = {
                        () => {
                            this.setState({createProblemFlag : true});
                            this.props.retrieveAvailableProblem(this.props.mission_id)
                                .then((res) => {
                                    this.setState({
                                        available_problem_data: res.results
                                    })
                                })
                        }
                    }
                    onQuickCreate = {
                        () => this.setState({
                            problemCreateQuickVisible: true
                        })
                    }
                    />
                </div>
            }
        }
        return (
            <Card extra = {createProblem}>
                <Table columns={columns} dataSource={dataSource} onChange={this.handleChange} />
                <CreateDrawerForm 
                    visible = {this.state.createProblemFlag}
                    data={this.state.available_problem_data}
                    onCreate={(data) => callbackDecorator(this.fetchDataSource)(this.props.createMissionProblem)(data, this.props.mission_id)}
                    selectedData={dataSource}
                    onClose = {() => {this.setState({createProblemFlag : false})}} />
                <UpdateDrawerForm
                    visible = {this.state.updateDrawerFormVisible}
                    data = {this.state.editing_record}
                    onSubmit={(data) => callbackDecorator(this.fetchDataSource)(this.props.updateMissionProblem)(data, this.props.mission_id, this.state.editing_record.id)}
                    onClose = {() => {this.setState({ updateDrawerFormVisible: false})}} />
            </Card>
        );
    }
}
export default MissionGroupPage;