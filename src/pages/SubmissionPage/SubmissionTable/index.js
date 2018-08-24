import React from "react";
import {Table, Button, Select, Input, Tag, Card} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { getFormattedTime } from "../../../utils/common";


const languageType = [
  "All", "C", "C++", "Pascal", "Java", "Ruby", "Bash", "Python", "PHP", "Perl", "C#"
];
const resultType = [
  "All",
  "Accepted",
  "Presentation Error",
  "Wrong Answer",
  "Time Limit Exceed",
  "Memory Limit Exceed",
  "Output Limit Exceed",
  "Runtime Error",
  "Compile Error",
  "Compile OK",
  "Invalid Word",
  "Pending",
  "Pending Rejudging",
  "Compiling",
  "Running & Judging"
];
const resultColor = {
  '' : "black",
  "Accepted" : "#00ff00",
  "Presentation Error" : "#ff0000",
  "Wrong Answer" : "red",
  "Time Limit Exceed" : "red",
  "Memory Limit Exceed" : "red",
  "Output Limit Exceed" : "red",
  "Runtime Error" : "red",
  "Compile Error" : "navy",
  "Compile OK" : "navy",
  "Invalid Word" : "navy",
  "Pending" : "orange",
  "Pending Rejudging" : "orange",
  "Compiling" : "orange",
  "Running & Judging" : "orange"
};





/**
 * @description 一个小选择器，目的是为了提供提交结果的搜索。
 * 我们将提供以下四个选项：｛ProblemID，User，Language，Result｝
 */
class Selector extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    options = function(data)
    {
        const Option = Select.Option;
        let result = data.map((val, index) =>{ return (<Option value = {index - 1}>{val}</Option>); })
        return result;
    }

    render()
    {
        
        const Option = Select.Option;
        return (
            <div id = "selector">
                
                <Input placeholder = "ProblemID" onChange = {this.props.onChange.onProblemIDChange} value = {this.props.value.problemID}  />
                <Input placeholder = "User" onChange = {this.props.onChange.onUserIDChange} value = {this.props.value.userID}  />
                
                <p value = "Language:"  />
                <div >
                <Select style={{ width: 120 }} defaultValue = "All"  onSelect = {this.props.onChange.onLanguageChange}>
                    {this.options(languageType)}
                </Select>
                </div>
                <p value = "Result:" />
                <div>
                <Select style={{ width: 240 }} defaultValue = "All" onSelect = {this.props.onChange.onResultChange}>
                    {this.options(resultType)}
                </Select>
                </div>
                <Button type="primary" onClick = {() =>{ console.log(this.props.value);}} >refresh</Button>
            </div>
        );
        
    }


}



class TableComponent extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,

    value : {
      problemID : '',   
      userID : '',
      language : -1,
      result : -1,
    },
    handle : {
      onProblemIDChange : (e) =>{this.setState({value : {...this.state.value, problemID : e.target.value}})},
      onUserIDChange : (e) =>{this.setState({value : {...this.state.value, userID : e.target.value}})},
      onLanguageChange : (val) => {this.setState({value : {...this.state.value, language : val}})},
      onResultChange : (val) => {this.setState({value : {...this.state.value, result : val}})}
    }

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
        let to = this.props.location.pathname + "#problem/" + record.problem;
        return <Link to={to} style = {{fontSize: '15px', fontWeight: 'bold'}}>{text}</Link>
      }
    }, {
      title: '语言',
      dataIndex: 'env_name',
      key: 'env_name',
      render: text => {return <span style = {{fontSize: '15px', fontWeight: 'bold'}} >{text} </span>},
      // sorter: (a, b) => a.start_time > b.start_time, //从小到大
      // sortOrder: sortedInfo.columnKey === 'start_time' && sortedInfo.order,
    }, {
      title: '状态',
      dataIndex: 'status_word',
      key: 'status_word',
      render: text => {return <Tag color = {resultColor[text]} style = {{fontSize: '17px', fontWeight: 'bold'}} >{text}</Tag>},
      sorter: (a, b) => a.status_word > b.status_word, //从小到大
      sortOrder: sortedInfo.columnKey === 'status_word' && sortedInfo.order,
    }, {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      render: text => {return <span style = {{fontSize: '15px', fontWeight: 'bold'}} >{text} </span>},
      sorter: (a, b) => a.time > b.time, //从小到大
      sortOrder: sortedInfo.columnKey === 'time' && sortedInfo.order,
      // render: (text, record, index) => {
      //   return getFormattedTime(text);
      // },
    },
     {
      title: '内存',
      dataIndex: 'memory',
      key: 'memory',
      render: text => {return <span style = {{fontSize: '15px', fontWeight: 'bold'}} >{text} </span>},
      sorter: (a, b) => a.memory > b.memory, //从小到大
      sortOrder: sortedInfo.columnKey === 'memory' && sortedInfo.order,
    }, {
      title: '长度',
      dataIndex: 'length',
      key: 'length',
      render: text => {return <span style = {{fontSize: '15px', fontWeight: 'bold'}} >{text} </span>},
      sorter: (a, b) => a.length > b.length, //从小到大
      sortOrder: sortedInfo.columnKey === 'length' && sortedInfo.order,
    }, {
      title: '提交者',
      dataIndex: 'user_name',
      key: 'user_name',
      render: text => {return <span style = {{fontSize: '15px', fontWeight: 'bold'}} >{text} </span>},
      sorter: (a, b) => a.user_name > b.user_name, //从小到大
      sortOrder: sortedInfo.columnKey === 'user_name' && sortedInfo.order,
    }, {
      title: '提交时间',
      dataIndex: 'submit_time',
      key: 'submit_time',
      sorter: (a, b) => a.submit_time > b.submit_time, //从小到大
      sortOrder: sortedInfo.columnKey === 'submit_time' && sortedInfo.order,
      render: (text, record, index) => {
        return <span style = {{fontSize: '15px', fontWeight: 'bold'}} >{getFormattedTime(text)} </span>
      },
    },
  ];
    return (
      <div id = "state-page">
        <Selector onChange = {this.state.handle} value = {this.state.value}/>
        <Table columns={columns} dataSource={this.props.data} />
      </div>
    );
  }
}

export default withRouter(TableComponent);