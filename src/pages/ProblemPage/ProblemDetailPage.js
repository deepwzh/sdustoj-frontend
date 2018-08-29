import React from 'react';
import { Card } from 'antd';
import ReactMarkDown from 'react-markdown';
import {message, Icon} from 'antd';
import {CopyToClipboard} from 'react-copy-to-clipboard'
import './index.css'

class ProblemDetailPage extends React.Component {
    
    onCopy = () => {
        message.success('复制成功');
    }


    render() {
        let {limit, number_test_data} = this.props.data;
        // console.log(limit);
        let {title, description, sample, source} = this.props.data;
        return (
            <Card style = {{backgroundColor : '#ffd'}}>
                <h1 id = 'problem-title'>{title}</h1>
                {limit?
                (
                <Card id = 'problem-title'>
                    <div style = {{fontWeight:'bold'}}>编程环境：{limit.env_name}</div>
                    <div style = {{fontWeight:'bold'}}>时间限制：{limit.time_limit} 内存限制：{limit.memory_limit}</div>
                </Card>
                )
                :null
                }
                <br/>
                <div>
                    <h3>题目描述</h3>
                    <Card style = {{backgroundColor : '#fee'}} hoverable = {true}>
                        <ReactMarkDown source={description} />
                    </Card>
                    <br/>
                    <h3>样例 <Icon type = 'copy' /></h3>
                    <CopyToClipboard onCopy = {this.onCopy} text = {sample}>
                        <Card style = {{backgroundColor : '#fee'}} hoverable = {true}>
                            <ReactMarkDown source={sample}/>
                        </Card>
                    </CopyToClipboard>
                    <br/>
                    <h3>来源</h3>
                    <Card style = {{backgroundColor : '#fee'}} hoverable = {true}>
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

//