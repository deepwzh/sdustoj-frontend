import React from 'react';
import { Card, List, Table } from 'antd';
class ScorePage extends React.Component {
    render() {
        let data = [];
        let overview_dataSource = [];
        let problem_dataSource = [];
        const overview_columns = [{
                title: '解决题数',
                dataIndex: 'ac_cnt',
                key: 'ac_cnt',
            },{
                title: '分数',
                dataIndex: 'score',
                key: 'score',
                render: (text) => (
                    Number.prototype.toFixed.call(Number(text), 2)
                )
            },{
                title: '部分解决题数',
                dataIndex: 'solve_cnt',
                key: 'solve_cnt',
            },{
                title: '提交次数',
                dataIndex: 'vaild_submit_num',
                key: 'vaild_submit_num',
            },{
                title: '用时',  
                dataIndex: 'time',
                key: 'time',
                render: (text) => {
                    let num = Number(text);
                    let sec = num % 60;
                    let min = Math.floor(num /60) % 60;
                    let hour = Math.floor(num / 3600);
                    return `${hour}时${min}分${sec}秒`;
                    // Number.prototype.toFixed.call(Number(text), 2)
                }
            },
        ]
                            // data = [...data, ...[ 
                    //     "#####################",
                    //     "通过率:" +  value.pass_rate,
                    //     "题目ID:" +  value.problem_id,
                    //     "分数:" +  value.score,
                    //     "状态:" +  value.status,
                    //     "提交数:" +  value.submit_num,
                    //     "用时:" +  value.time,
                    //     "有效提交数:" +  value.valid_submit_num,
                    // ]];
        const problem_columns = [{
                title: 'ID',
                dataIndex: 'problem_id',
                key: 'problem_id',
            },{
                title: '通过数据比率',
                dataIndex: 'pass_rate',
                key: 'pass_rate',
                render: (text) => (
                    Number.prototype.toFixed.call(Number(text), 2)
                )
            },{
                title: '分数',
                dataIndex: 'score',
                key: 'score',
                render: (text) => (
                    Number.prototype.toFixed.call(Number(text), 2)
                )
            },{
                title: '状态',
                dataIndex: 'status',
                key: 'status',
            },{
                title: '提交次数',
                dataIndex: 'vaild_submit_num',
                key: 'vaild_submit_num',
            },{
                title: '用时',  
                dataIndex: 'time',
                key: 'time',
                render: (text) => {
                    let num = Number(text);
                    let sec = num % 60;
                    let min = Math.floor(num /60) % 60;
                    let hour = Math.floor(num / 3600);
                    return `${hour}时${min}分${sec}秒`;
                    // Number.prototype.toFixed.call(Number(text), 2)
                }
                // render: (text) => (
                //     Number.prototype.toFixed.call(Number(text), 2)
                // )
            },
        ]
        let statistic_dataSource = [];
        const statistic_columns = [{
            title: '题目ID',
            dataIndex: 'problem_id',
            key: 'problem_id',
        }, {
            title: '最快提交最高正确率提交',
            dataIndex: 'first_solve_time',
            key: 'first_solve_time',    
            render: (text) => {
                let num = Number(text);
                let sec = num % 60;
                let min = Math.floor(num /60) % 60;
                let hour = Math.floor(num / 3600);
                return `${hour}时${min}分${sec}秒`;
                // Number.prototype.toFixed.call(Number(text), 2)
            }        
        }];
        if (this.props.dataSource) {
            for (let [key, value] of Object.entries(this.props.dataSource)) {
                if (key == "overview") {
                    overview_dataSource.push({
                        'ac_cnt': value.ac_cnt,
                        'score': value.score,
                        'solve_cnt': value.solve_cnt,
                        'vaild_submit_num': value.valid_submit_num,
                        'time': value.time,
                    })
                } else if (key == "statistic") {
                    for (let [problem_id, item] of Object.entries(value)) {
                        statistic_dataSource.push({
                            'problem_id': problem_id,
                            'first_solve_rate': item.first_solve_rate,
                            'first_solve_time': item.first_solve_time
                        });
                    }
                }else {
                    problem_dataSource.push({
                        'pass_rate': value.pass_rate,
                        'problem_id': value.problem_id,
                        'score': value.score,
                        'status': value.status,
                        'submit_num': value.submit_num,
                        'time': value.time,
                        'vaild_submit_num': value.valid_submit_num,
                    })
                    // data = [...data, ...[ 
                    //     "#####################",
                    //     "通过率:" +  value.pass_rate,
                    //     "题目ID:" +  value.problem_id,
                    //     "分数:" +  value.score,
                    //     "状态:" +  value.status,
                    //     "提交数:" +  value.submit_num,
                    //     "用时:" +  value.time,
                    //     "有效提交数:" +  value.valid_submit_num,
                    // ]];
                }
            }

            // overview_dataSource = this.props.dataSource['overview']
        }
        return (
            <Card>
                <Table
                    columns={overview_columns}
                    dataSource={overview_dataSource}
                >
                </Table>
                <Table
                    columns={problem_columns}
                    dataSource={problem_dataSource}
                >
                </Table>
                <Table
                    columns={statistic_columns}
                    dataSource={statistic_dataSource}
                >
                </Table>
            </Card>
        );
    }
}
export default ScorePage;