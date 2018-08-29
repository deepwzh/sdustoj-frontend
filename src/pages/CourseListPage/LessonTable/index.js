import React from "react";
import { Button, Card, Popconfirm, message } from 'antd';
import Table from "../../../components/Table";
import { Link } from 'react-router-dom';
import './index.css'
import CreateCourseDrawer from './CreateCourseDrawer';
import { getFormattedTime } from "../../../utils/common";
import { has_permission, RESOURCE, PERMISSION } from "../../../utils/config";
import { infoRequest, callbackDecorator } from "../../../utils/message";

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


class TableComponent extends React.Component {
  componentDidMount() {
    this.fetchDataSource();
  }
  state = {
    filteredInfo: null,
    sortedInfo: null,
    createCourseDrawerVisible: false,
    editing_record: null,
    dataSource: []
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  }

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  }

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  }
  fetchDataSource = () => {
    this.props.listCourse().then((data) => {
      this.setState({
        dataSource: data.results,
        createCourseDrawerVisible: false
      })
    })
  }
  render() {
    let data = this.state.dataSource;
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [{
      title: '课程ID',
      dataIndex: 'cid',
      key: 'cid',
      sorter: (a, b) => a.cid - b.cid,
      sortOrder: 'descend',
    }, {
      title: '课程名称',
      dataIndex: 'caption',
      key: 'caption',
      sorter: (a, b) => a.caption > b.caption, //从小到大
      sortOrder: sortedInfo.columnKey === 'caption' && sortedInfo.order,
      render: (text, record, index) => {
        // console.log(record);
        let to = "/course/" + record.cid; 
        return <Link to={to} >{text}</Link>
      }
    }, {
      title: '开课时间',
      dataIndex: 'start_time',
      key: 'start_time',
      sorter: (a, b) => a.start_time - b.start_time, //从小到大
      sortOrder: sortedInfo.columnKey === 'start_time' && sortedInfo.order,
      render: (text, record, index) => {
        return getFormattedTime(text);
      },
    }, {
      title: '结课时间',
      dataIndex: 'end_time',
      key: 'end_time',
      sorter: (a, b) => a.end_time - b.end_time, //从小到大
      sortOrder: sortedInfo.columnKey === 'end_time' && sortedInfo.order,
      render: (text, record, index) => {
        return getFormattedTime(text);
      },
    }, {
      title: '状态',
      dataIndex: 'available',
      key: 'available',
      render: (text, record, index) => {
        return <span>{text?"可用":"废弃"}</span>
      }
    }
  ];
    let extra = null;
    if (has_permission(RESOURCE.COURSE, PERMISSION.CREATE)) {
      extra = (
        <div>
          <Button type='primary' onClick={() => this.setState({createCourseDrawerVisible: true})}>创建新课程</Button>
        </div>
      );
    }
    if (has_permission(RESOURCE.COURSE, PERMISSION.UPDATE)) {
      columns.push({
          title: '操作',
          dataIndex: 'edit',
          key: 'edit',
          render: (text, record, index) => {
            return (
              <OperationItem 
                            onUpdate={() => this.setState({
                              createCourseDrawerVisible: true, 
                              editing_record: record
                            })} 
                            onDelete={() => callbackDecorator(this.fetchDataSource)(this.props.deleteCourse)(record.cid) }
                            />
            )
          }
      });
      data = data.map((item) => (
        {...item,
          edit: true
        }
      ))
    }
   
    return (
      <Card extra={extra}>
        <h1 id = "title-center">{this.props.title}</h1>
        <Table columns={columns} dataSource={data} onChange={this.handleChange} error={this.props.error} loading={this.props.loading}/>
        {has_permission(RESOURCE.COURSE, PERMISSION.CREATE)? 
        (<CreateCourseDrawer 
          visible = {this.state.createCourseDrawerVisible}
          data={this.state.editing_record}
          listCourseMeta={() => this.props.listCourseMeta(this.props.organization_name)}
          onCreate={(data, course_meta_id) => callbackDecorator(this.fetchDataSource)(this.props.createCourse)(data, course_meta_id)}
          onUpdate={(data) => callbackDecorator(this.fetchDataSource)(this.props.updateCourse)(data, this.state.editing_record.cid)}
          onClose = {() => {this.setState({createCourseDrawerVisible : false})}} />
        ):null}
      </Card>
    );
  }
}

export default TableComponent;