/**
 * Copyright (c) 2018-present, SDUST ACM Association Development Group. 
 * @Author: deepwzh 
 * @Date: 2018-07-31 09:26:05 
 * @Last Modified by: deepwzh
 * @Last Modified time: 2018-07-31 21:31:48
 */

import React from "react";
import { Table, Button } from 'antd';
import Mock from "../../mocks/lessons.json";
console.log(Mock);
const data = Mock.results;

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
      title: '可用',
      dataIndex: 'available',
      key: 'available',
      render: (text, record, index) => {
        return <span>{text?"是":"否"}</span>
      }
    }, {
      title: '废弃',
      dataIndex: 'deleted',
      key: 'deleted',
      render: (text, record, index) => {
        return <span>{text?"是":"否"}</span>
      }
    }
  ];
    return (
      <div>
        <div className="table-operations">
          {/* <Button onClick={this.setAgeSort}>Sort age</Button> */}
          {/* <Button onClick={this.clearFilters}>Clear filters</Button> */}
          {/* <Button onClick={this.clearAll}>Clear filters and sorters</Button> */}
        </div>
        <Table columns={columns} dataSource={data} onChange={this.handleChange} />
      </div>
    );
  }
}

export default TableComponent;