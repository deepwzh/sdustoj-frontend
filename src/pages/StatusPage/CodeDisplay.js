/**
 * @description 用以展示代码的页面 和qduoj类似 :) 
 * 我们需要一个Card 展示状态（data），一个Editor 展示代码（code），或者未来一个Table展示测试数据
 * 其中前两项数据需要上层组件传递。其中，data = {state, time, memory, language, author, } 暂定
 * @time 18-08-21
 */
import MonacoEditor from './../ProblemPage/MonacoEditor';
import {Card, Table, Tag} from 'antd';
import React from 'react';
import { getFormattedTime } from '../../utils/common';

const color = ['#f00', '#0f0'];
const resultColor = {
    '' : "black",
    "Accepted" : "green",
    "Presentation Error" : "#ff0000",
    "Wrong Answer" : "red",
    "Time Limit Exceed" : "rgb(153,50,204)",
    "Memory Limit Exceed" : "rgb(153,50,204)",
    "Output Limit Exceed" : "rgb(153,50,204)",
    "Runtime Error" : "rgb(153,50,204)",
    "Compile Error" : "navy",
    "Compile OK" : "navy",
    "Invalid Word" : "navy",
    "Pending" : "rgb(128,128,128)",
    "Pending Rejudging" : "rgb(128,128,128)",
    "Compiling" : "rgb(128,128,128)",
    "Running & Judging" : "rgb(128,128,128)"
  };
class CodeDisplay extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        data : {
            state: 'Accepted',
            time: '100ms',
            memory: '1024Kb',
            author: 'rt-triangle',
            language: 'C++',
        }
    };


    render() {
        let data = this.props.data;
        let color = '#000'
        if(data.state == 'Accepted')
            color = '#0f0';
        else
            color = '#f00'; 
        // let state = <span style = {{color: color, fontWeight: 'bold'}}>{data.state}</span>;
        // let time = <span style = {{fontWeight: 'bold'}}>{data.time} </span>;
        // let memory = <span style = {{fontWeight: 'bold'}}>{data.memory} </span>;
        // let author = <span style = {{fontWeight: 'bold'}}>{data.author} </span>;
        // let language = <span style = {{fontWeight: 'bold'}}>{data.language} </span>;
        const columns = [{
            title: '提交ID',
            dataIndex: 'id',
            key: 'id',
            // sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
          }, {
            title: '题目',
            dataIndex: 'problem_title',
            key: 'problem_title',
            // sortOrder: sortedInfo.columnKey === 'problem_title' && sortedInfo.order,
            // render: (text, record, index) => {
            //   console.log(record);
            //   let to = "#problem/" + record.problem;
            //   return <Link to={to}>{text}</Link>
            // }
          }, {
            title: '语言',
            dataIndex: 'env_name',
            key: 'env_name',
            render: text => {return <span  >{text} </span>},
            // sorter: (a, b) => a.start_time > b.start_time, //从小到大
            // sortOrder: sortedInfo.columnKey === 'start_time' && sortedInfo.order,
          }, {
            title: '状态',
            dataIndex: 'status_word',
            key: 'status_word',
            // sortOrder: sortedInfo.columnKey === 'status_word' && sortedInfo.order,
            render: (text, record) => {
              return <Tag color = {resultColor[text]} >{text}</Tag>},
          }, {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
            render: text => {return <span >{text} </span>},
            // sortOrder: sortedInfo.columnKey === 'time' && sortedInfo.order,
            // render: (text, record, index) => {
            //   return getFormattedTime(text);
            // },
          },
           {
            title: '内存',
            dataIndex: 'memory',
            key: 'memory',
            render: text => {return <span >{text} </span>},
            // sortOrder: sortedInfo.columnKey === 'memory' && sortedInfo.order,
          }, {
            title: '长度',
            dataIndex: 'length',
            key: 'length',
            render: text => {return <span  >{text} </span>},
            // sortOrder: sortedInfo.columnKey === 'length' && sortedInfo.order,
          }, {
            title: '提交者',
            dataIndex: 'user_name',
            key: 'user_name',
            render: text => {return <span  >{text} </span>},
            // sortOrder: sortedInfo.columnKey === 'user_name' && sortedInfo.order,
          }, {
            title: '提交时间',
            dataIndex: 'submit_time',
            key: 'submit_time',
            // sortOrder: sortedInfo.columnKey === 'submit_time' && sortedInfo.order,
            render: (text, record, index) => {
              return <span>{getFormattedTime(text)} </span>
            },
          },
        ];
        let { dataSource } = this.props;
        let code = '';
        if (dataSource) {
            dataSource = [dataSource];
            code = dataSource.code;
        } else {
            dataSource = [];
        }
        return (
        <div>
            {/* <h1 style = {{textAlign: 'center'}}>提交记录</h1> */}
            <Card>
                <Table
                    pagination={{
                        hideOnSinglePage: true
                    }}
                    columns={columns}
                    dataSource={dataSource}
                >
                </Table>
                {/* <div>
                    <h3 style = {{textAlign: 'center'}}>State: {state}</h3>
                </div>
                <div style = {{float: 'left'}}>
                    <h3>Time: {time} {' | '} Memory: {memory}</h3>
                </div>
                <div style = {{float: 'right'}}>
                    <h3>Author: {author} {' | '} Language: {language}</h3>
                </div> */}
            </Card>
            <br/>
            <MonacoEditor 
                width="100%"
                height="600"
                language={data.language}
                theme="vs-light"
                value={this.props.code}      // 注意 这里应该为具体的code
            />
            <br/>
            <Table />
        </div>
        );
    }
}

export default CodeDisplay;