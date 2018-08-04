import React from "react";
import { Button, Card } from 'antd';
import Table from "../../../components/Table";
import { Link } from 'react-router-dom';
import './index.css'
class TableComponent extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
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

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [{
      title: '课程ID',
      dataIndex: 'meta',
      key: 'id',
      sorter: (a, b) => a.meta - b.meta,
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
    }, {
      title: '课程名称',
      dataIndex: 'caption',
      key: 'caption',
      sorter: (a, b) => a.caption > b.caption, //从小到大
      sortOrder: sortedInfo.columnKey === 'caption' && sortedInfo.order,
      render: (text, record, index) => {
        // console.log(record);
        let to = "/lesson/" + record.meta; 
        return <Link to={to} >{text}</Link>
      }
    }, {
      title: '开课时间',
      dataIndex: 'start_time',
      key: 'start_time',
      sorter: (a, b) => a.start_time - b.start_time, //从小到大
      sortOrder: sortedInfo.columnKey === 'start_time' && sortedInfo.order,
    }, {
      title: '结课时间',
      dataIndex: 'end_time',
      key: 'end_time',
      sorter: (a, b) => a.end_time - b.end_time, //从小到大
      sortOrder: sortedInfo.columnKey === 'end_time' && sortedInfo.order,
    }, {
      title: '状态',
      dataIndex: 'available',
      key: 'available',
      render: (text, record, index) => {
        return <span>{text?"可用":"废弃"}</span>
      }
    }
  ];
    return (
      <Card hoverable = {true}>
        <h1 id = "title-center">我学习的课程</h1>
        <Table columns={columns} dataSource={this.props.data} onChange={this.handleChange} error={this.props.error} loading={this.props.loading}/>
      </Card>
    );
  }
}

export default TableComponent;