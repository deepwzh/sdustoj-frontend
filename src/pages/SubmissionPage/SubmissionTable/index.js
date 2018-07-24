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
      title: '提交ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
    }, {
      title: '题目',
      dataIndex: 'problem_title',
      key: 'problem_title',
      sorter: (a, b) => a.problem_title > b.problem_title, //从小到大
      sortOrder: sortedInfo.columnKey === 'problem_title' && sortedInfo.order,
      render: (text, record, index) => {
        console.log(record);
        let to = this.props.location.pathname + "/problem/" + record.problem;
        return <Link to={to} >{text}</Link>
      }
    }, {
      title: '语言',
      dataIndex: 'env_name',
      key: 'env_name',
      // sorter: (a, b) => a.start_time > b.start_time, //从小到大
      // sortOrder: sortedInfo.columnKey === 'start_time' && sortedInfo.order,
    }, {
      title: '状态',
      dataIndex: 'status_word',
      key: 'status_word',
      sorter: (a, b) => a.status_word > b.status_word, //从小到大
      sortOrder: sortedInfo.columnKey === 'status_word' && sortedInfo.order,
    }, {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      sorter: (a, b) => a.time > b.time, //从小到大
      sortOrder: sortedInfo.columnKey === 'time' && sortedInfo.order,
    }, {
      title: '内存',
      dataIndex: 'memory',
      key: 'memory',
      sorter: (a, b) => a.memory > b.memory, //从小到大
      sortOrder: sortedInfo.columnKey === 'memory' && sortedInfo.order,
    }, {
      title: '长度',
      dataIndex: 'length',
      key: 'length',
      sorter: (a, b) => a.length > b.length, //从小到大
      sortOrder: sortedInfo.columnKey === 'length' && sortedInfo.order,
    }, {
      title: '提交者',
      dataIndex: 'user_name',
      key: 'user_name',
      sorter: (a, b) => a.user_name > b.user_name, //从小到大
      sortOrder: sortedInfo.columnKey === 'user_name' && sortedInfo.order,
    }, {
      title: '提交时间',
      dataIndex: 'submit_time',
      key: 'submit_time',
      sorter: (a, b) => a.submit_time > b.submit_time, //从小到大
      sortOrder: sortedInfo.columnKey === 'submit_time' && sortedInfo.order,
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