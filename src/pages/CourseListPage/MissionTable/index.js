import React from "react";
import { Table, Button, Card, Popconfirm, message } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import {TableEx} from './../../../utils'

/**
 * @description 保留此文件的原因：只是因为在这里生成列项
 */

/**
 * @description 生成列项
 */
let createColumns = ()=> {

  const columns = [{
    title: '任务ID',
    dataIndex: 'mission_id',
    key: 'mission_id',
    sorter: (a, b) => a.meta - b.meta,
  //  sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
  }, {
    title: '任务名称',
    dataIndex: 'caption',
    key: 'caption',
    sorter: (a, b) => a.caption > b.caption, //从小到大
  //  sortOrder: sortedInfo.columnKey === 'caption' && sortedInfo.order,
    render: (text, record, index) => {
      // console.log(record);
      let to = this.props.location.pathname + "/mission/" + record.mission_id;
      // let to = this.props.his + record.mission_id; 
      return <Link to={to} >{text}</Link>
    }
  }, {
    title: '任务开始时间',
    dataIndex: 'start_time',
    key: 'start_time',
    sorter: (a, b) => a.start_time - b.start_time, //从小到大
  //  sortOrder: sortedInfo.columnKey === 'start_time' && sortedInfo.order,
  }, {
    title: '任务结束时间',
    dataIndex: 'end_time',
    key: 'end_time',
    sorter: (a, b) => a.end_time - b.end_time, //从小到大
  //  sortOrder: sortedInfo.columnKey === 'end_time' && sortedInfo.order,
  }, {
    title: '状态',
    dataIndex: 'available',
    key : 'available',
    render: (text, record, index) => {
      return <span>{text?"可用":"废弃"}</span>
    }
  } ];
  
  return columns;
}


class TableComponent extends React.Component {
  
  render() {
    return (
    <TableEx columns = {createColumns()} isRead = {this.props.isRead} />);
  }
}

export default withRouter(TableComponent);