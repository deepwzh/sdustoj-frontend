import React from "react";
import { Table, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
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
    const { match, location, history } = this.props
    let { sortedInfo, filteredInfo } = this.state;
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
    }, 
    // {
    //   title: '可用',
    //   dataIndex: 'available',
    //   key: 'available',
    //   render: (text, record, index) => {
    //     return <span>{text?"是":"否"}</span>
    //   }
    // }, {
    //   title: '废弃',
    //   dataIndex: 'deleted',
    //   key: 'deleted',
    //   render: (text, record, index) => {
    //     return <span>{text?"是":"否"}</span>
    //   }
    // }, 
    {
      title: '状态',
      dataIndex: 'available',
      key : 'available',
      render: (text, record, index) => {
        return <span>{text?"可用":"废弃"}</span>
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
        <Table columns={columns} dataSource={this.props.data} onChange={this.handleChange} />
      </div>
    );
  }
}

export default withRouter(TableComponent);