import React from 'react';
import { Card } from 'antd';
import ReactMarkDown from 'react-markdown';
import { runInDebugContext } from 'vm';
class ProblemDetailPage extends React.Component {
    
    render() {
        let {limit, number_test_data} = this.props.data;
        // console.log(limit);
        if (limit) {
            limit = limit[0];
        }
        let {title, description, sample, source} = this.props.data;
        return (
            <Card>
                <h1>{title}</h1>
                {limit?
                (
                <div>
                        <div>编程环境：{limit.env_name}</div>
                        <div>长度限制：{limit.length_limit}</div>
                        <div>时间限制：{limit.time_limit}</div>
                        <div>内存限制：{limit.memory_limit}</div>
                    <div>数据组数：{number_test_data}</div>
                </div>
                )
                :null
                }

                <div>
                    <Card style = {{backgroundColor : '#fee'}} hoverable = {true}>
                        {/* <h3>描述</h3> */}
                        <ReactMarkDown source={description} />
                    </Card>
                    <br/>
                    <Card style = {{backgroundColor : '#fee'}} hoverable = {true}>
                        {/* <h3>样例</h3> */}
                        <ReactMarkDown source={sample}/>
                    </Card>
                    <br/>
                    <Card style = {{backgroundColor : '#fee'}} hoverable = {true}>
                        <h3>来源</h3>
                        <p>
                            {source}
                        </p>
                    </Card>
                </div>
            </Card>
        );
    }
}
export default ProblemDetailPage;