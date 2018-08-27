import React from 'react';
import {Table} from 'antd';
import { Selector } from './SubmissionTable';
import { Card, Button, Tag } from 'antd';
import './index.css';
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { getFormattedTime, urlEncode } from "../../utils/common";
import { Link } from 'react-router-dom';
import SubmissionInstancePage from './SubmissionInstancePage';
import { getAPIUrl, API } from '../../utils/config';
import { infoRequest } from '../../utils/message';

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
  
class SubmissionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredInfo: null,
            sortedInfo: null,
            dataSource: [],
            showing_record: null,
            value : {
                problemID : '',   
                userID : '',
                language : '',
                result : '',
            },
            code: '',
            // limit: 1,
            // offset: 0,
            pagination: {
                pageSize: 1,
                showSizeChanger: true,
                pageSizeOptions: ['1', '2', '3', '5', '10', '20', '50', '100']
            },
            visible: false,
        }
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
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        this.setState({
          pagination: pager,
          filteredInfo: filters,
          sortedInfo: sorter,
        });
        this.fetchDataSource(this.getParam({
          limit: pager.pageSize,
          offset: (pager.current - 1) * pager.pageSize,
        //   sortField: sorter.field,
        //   sortOrder: sorter.order,
        //   ...filters,
        }));
      }
    handle =  {
      onProblemIDChange : (val) =>{this.setState({
          value : {
              ...this.state.value, 
              problemID : val
            }})},
      onUserIDChange : (e) =>{this.setState({value : {...this.state.value, userID : e.target.value}})},
      onLanguageChange : (val) => {this.setState({value : {...this.state.value, language : val}})},
      onResultChange : (val) => {this.setState({value : {...this.state.value, result : val}})}
    }
    getParam = (current_pager_params) => {
        const filter_params = {
          problem: this.state.value.problemID,
          user__username: this.state.value.userID,
          status: this.state.value.result,
          environment: this.state.value.language
        };
        const pager_params = current_pager_params || {
            limit: this.state.pagination.pageSize,
            offset: (this.state.pagination.current - 1) * this.state.pagination.pageSize,
        }
        const params = urlEncode({...filter_params, ...pager_params});
        this.props.push('#submission?' + params);
        return params;
    }
    onFlush = () => {
      const params = this.getParam();
      this.fetchDataSource(params);
    }
    columns = [{
        title: '提交ID',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
        // sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
      }, {
        title: '题目',
        dataIndex: 'problem_title',
        key: 'problem_title',
        sorter: (a, b) => a.problem_title > b.problem_title, //从小到大
        // sortOrder: sortedInfo.columnKey === 'problem_title' && sortedInfo.order,
        render: (text, record, index) => {
          console.log(record);
          let to = "#problem/" + record.problem;
          return <Link to={to}>{text}</Link>
        }
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
        sorter: (a, b) => a.status_word > b.status_word, //从小到大
        // sortOrder: sortedInfo.columnKey === 'status_word' && sortedInfo.order,
        render: (text, record) => {
          if (!this.state.showing_record) {
              this.setState({
                showing_record: record
              });
          }
          return <Link to={`#submission/${record.id}`}><Tag color = {resultColor[text]} >{text}</Tag></Link>},
      }, {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        render: text => {return <span >{text} </span>},
        sorter: (a, b) => a.time > b.time, //从小到大
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
        sorter: (a, b) => a.memory > b.memory, //从小到大
        // sortOrder: sortedInfo.columnKey === 'memory' && sortedInfo.order,
      }, {
        title: '长度',
        dataIndex: 'length',
        key: 'length',
        render: text => {return <span  >{text} </span>},
        sorter: (a, b) => a.length > b.length, //从小到大
        // sortOrder: sortedInfo.columnKey === 'length' && sortedInfo.order,
      }, {
        title: '提交者',
        dataIndex: 'user_name',
        key: 'user_name',
        render: text => {return <span  >{text} </span>},
        sorter: (a, b) => a.user_name > b.user_name, //从小到大
        // sortOrder: sortedInfo.columnKey === 'user_name' && sortedInfo.order,
      }, {
        title: '提交时间',
        dataIndex: 'submit_time',
        key: 'submit_time',
        sorter: (a, b) => a.submit_time > b.submit_time, //从小到大
        // sortOrder: sortedInfo.columnKey === 'submit_time' && sortedInfo.order,
        render: (text, record, index) => {
          return <span>{getFormattedTime(text)} </span>
        },
      },
    ];
    componentDidMount() {
        this.fetchDataSource();
    }
    componentWillReceiveProps(newProps) {
        if (!this.props.submission_id && newProps.submission_id) {
            this.retrieveSubmissionCode(newProps.submission_id);
        }
    }
    fetchDataSource = (params) => {
        this.props.listSubmissionList(this.props.mission_id, params)
        .then((res) => this.setState({
            dataSource: res.results,
            pagination: {
                ...this.state.pagination,
                total: 1000
            }

        }));
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
      }
    
    //   handleOk = () => {
    //     this.setState({ loading: true });
    //     setTimeout(() => {
    //       this.setState({ loading: false, visible: false });
    //     }, 3000);
    //   }
    
      handleCancel = () => {
        this.setState({
            showing_record: null
        });
        this.props.push('#submission?' + this.getParam());
      }
    retrieveSubmissionCode = infoRequest({
        'loading_text': '正在获取代码',
        callback: (data) => {
            this.setState({
                code: data.code
            })
        } 
    })((submission_id) => {
        const url = getAPIUrl(API.SUBMISSIONCODE(submission_id));
        const config = {
            method: 'get',
        }
        return fetch(url, config);
    })
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        return (
            <Card id="submission-card">
                {/* <Button onClick={() => }>刷新</Button> */}
                <Selector 
                    dataSource={{
                        problem: [{
                            title: 'A: A+B',
                            value: 1
                        }, {
                            title: 'B: A-B',
                            value: 2
                        }],
                        environment: [{
                            title: 'gcc',
                            value: 2
                        }, {
                            title: 'g++',
                            value: 3
                        }],
                        status: [{
                            title: 'Pending',
                            value: 'PD'
                        }]
                    }}
                    onChange={this.handle}
                    onFlush={this.onFlush}
                    value = {this.state.value}
                    />
                <Table
                    columns={this.columns}
                    dataSource={this.state.dataSource}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    />
                <SubmissionInstancePage
                    submission_id={this.props.submission_id}
                    data={this.state.showing_record}
                    // retrieveSubmissionCode={this.props.retrieveSubmissionCode}
                    code={this.state.code}
                    visible={this.props.submission_id? true: false}
                    showModal={this.showModal}
                    onClose={this.handleCancel}
                    />
            </Card>
        );
    }
}
function mapStateToProp(state, ownProps) {
    const hash = state.router.location.hash;
    // const tmp = hash.split('/');
    const pattern = /#submission\/\d+/
    let submission_id = null;
    if (pattern.test(hash)) {
        submission_id = hash.split('/')[1];
    }
    return {
        search: state.router.location.search,
        pathname: state.router.location.pathname,
        hash: state.router.location.hash,
        submission_id,
      }
    }
    function mapDispatchToProps(dispatch) {
      return {
        push: (path) => dispatch(push(path)),
      }
    }
    export default connect(mapStateToProp, mapDispatchToProps)(SubmissionPage);