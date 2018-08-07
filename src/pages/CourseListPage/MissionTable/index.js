import React from "react";
import { Table, Button, Card, Popconfirm, message } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import App from './createMission';

class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
  }

  confirm = (e)=> {
    console.log(e);
    message.success('Click on Yes');
  }
  
  cancel = (e)=> {
    console.log(e);
    message.error('Click on No');
  }

  render() {
    return (
      <Popconfirm title="确定要删除该项?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
       <Button>Delete</Button>
      </Popconfirm>
    )
  }
}


/**
 * @description 生成列项 最后一项是一个 删除该项的按钮，只有当表格可写时才显示
 */
let createColumns = (flag, state)=> {

  let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

  const columns = [{
    title: '任务ID',
    dataIndex: 'mission_id',
    key: 'mission_id',
    sorter: (a, b) => a.meta - b.meta,
    sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
  }, {
    title: '任务名称',
    dataIndex: 'caption',
    key: 'caption',
    sorter: (a, b) => a.caption > b.caption, //从小到大
    sortOrder: sortedInfo.columnKey === 'caption' && sortedInfo.order,
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
    sortOrder: sortedInfo.columnKey === 'start_time' && sortedInfo.order,
  }, {
    title: '任务结束时间',
    dataIndex: 'end_time',
    key: 'end_time',
    sorter: (a, b) => a.end_time - b.end_time, //从小到大
    sortOrder: sortedInfo.columnKey === 'end_time' && sortedInfo.order,
  }, {
    title: '状态',
    dataIndex: 'available',
    key : 'available',
    render: (text, record, index) => {
      return <span>{text?"可用":"废弃"}</span>
    }
  } ];
    if(flag)
    {
      columns.push(
        {
          title: '删除',
          dataIndex: 'edit',
          key: 'edit',
          render: (flag)=>{<DeleteButton />}
        }
      );
    }
  return columns;
}
/**
 * @description 如何表格可写，我们需要在每条数据后加一个按钮项
 */
let dataforEdit = (data) => {
  let newData = data.map(
    (ele) => {
      return Object.assign({}, ele, {edit : true});
    }
  );
  return newData;
}


class TableComponent extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,

    createMissionFlag: false,   // 判断创建按钮是否点击
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
    const { match, location, history } = this.props
    
    
  /**
   * @description 这里需要添加一个Card 组件， 用以支持 创建新内容
   * @time 18-08-05
   */
    let createMission = null;
    if(this.props.isRead)
    {
      createMission = (
        <Button onClick = {()=>{this.setState({createMissionFlag : true})}} >
          Create
        </Button>
      );
    }

    console.log('this.createMissionFlag : ' + this.state.createMissionFlag)
    return (
      <Card extra = {createMission}>
        
        <Table columns={createColumns(this.props.isRead, this.state)} dataSource={this.props.data} onChange={this.handleChange} />

        <App visible = {this.state.createMissionFlag} onClose = {() => {this.setState({createMissionFlag : false})}} />
      </Card>
    );
  }
}

export default withRouter(TableComponent);