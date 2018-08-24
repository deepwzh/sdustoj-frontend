import React from "react";
import { Button, Card, Popconfirm, message } from 'antd';
import Table from "../../../components/Table";
import { Link } from 'react-router-dom';
import './index.css'
import CreateCourseDrawer from './CreateCourseDrawer';
import { getFormattedTime } from "../../../utils/common";
import { has_permission, RESOURCE, PERMISSION } from "../../../utils/config";
import { infoRequest, callbackDecorator } from "../../../utils/message";
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
      sortOrder: sortedInfo.columnKey === 'cid' && sortedInfo.order,
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
          title: '修改',
          dataIndex: 'edit',
          key: 'edit',
          render: (text, record, index) => {
            return (
              <Button onClick={() => this.setState({createCourseDrawerVisible: true, editing_record: record})}>
              修改
              </Button>
            )
          }
      });
      data = data.map((item) => (
        {...item,
          edit: true
        }
      ))
    }
    if (has_permission(RESOURCE.COURSE, PERMISSION.DELETE)) {
      columns.push({
          title: '删除',
          dataIndex: 'delete',
          key: 'delete',
          render: (text, record, index) => {
            return (
              <Popconfirm title="确定要删除该项?" 
                onConfirm={(e) => {
                callbackDecorator(this.fetchDataSource)(this.props.deleteCourse)(record.cid) 
                }}
                onCancel={(e) => message.error('取消成功')} 
                okText="Yes"
                cancelText="No">
              <Button>删除</Button>
              </Popconfirm>
            )
          }
      });
      data = data.map((item) => (
        {...item,
          delete: true
        }
      ))
    }
    return (
      <Card extra={extra}>
        <h1 id = "title-center">{this.props.title}</h1>
        <Table columns={columns} dataSource={data} onChange={this.handleChange} error={this.props.error} loading={this.props.loading}/>
        <CreateCourseDrawer 
          visible = {this.state.createCourseDrawerVisible}
          data={this.state.editing_record}
          listCourseMeta={() => this.props.listCourseMeta(this.props.organization_name)}
          onCreate={(data, course_meta_id) => callbackDecorator(this.fetchDataSource)(this.props.createCourse)(data, course_meta_id)}
          onUpdate={(data) => callbackDecorator(this.fetchDataSource)(this.props.updateCourse)(data, this.state.editing_record.cid)}
          onClose = {() => {this.setState({createCourseDrawerVisible : false})}} />
      </Card>
    );
  }
}

export default TableComponent;