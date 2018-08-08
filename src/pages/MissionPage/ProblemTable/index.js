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
    const columns = [
      
      {           //TODO: 我们需要一个用以判断当前题目状态的标记
                  // √ 表示通过 ? 表示尝试但未通过 x 表示测试结束 但未提交过任何代码
                  // 先放着，有空做
          title: '状态',
          dataIndex: 'problem_state',
          key: 'problem_state',
      },

      {
      title: '题目ID',
      dataIndex: 'problem_id',
      key: 'problem_id',
      sorter: (a, b) => a.problem_id - b.problem_id,
      sortOrder: sortedInfo.columnKey === 'problem_id' && sortedInfo.order,
    }, {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title > b.title, //从小到大
      sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
      render: (text, record, index) => {
        console.log(record);
        
        let to = this.props.location.pathname + "/problem/" + record.id;
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
    return (
      <div>
        <div className="table-operations">
         
        </div>
        <Table columns={columns} dataSource={this.props.data} onChange={this.handleChange} />
      </div>
    );
  }
}

export default withRouter(TableComponent);