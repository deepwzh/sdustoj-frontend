/**
 * @description 用以展示代码的页面 和qduoj类似 :) 
 * 我们需要一个Card 展示状态（data），一个Editor 展示代码（code），或者未来一个Table展示测试数据
 * 其中前两项数据需要上层组件传递。其中，data = {state, time, memory, language, author, } 暂定
 * @time 18-08-21
 */
import MonacoEditor from './../ProblemPage/MonacoEditor';
import {Card, Table, Tag} from 'antd';
import React from 'react';

const color = ['#f00', '#0f0'];

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
        let state = <span style = {{color: color, fontWeight: 'bold'}}>{data.state}</span>;
        let time = <span style = {{fontWeight: 'bold'}}>{data.time} </span>;
        let memory = <span style = {{fontWeight: 'bold'}}>{data.memory} </span>;
        let author = <span style = {{fontWeight: 'bold'}}>{data.author} </span>;
        let language = <span style = {{fontWeight: 'bold'}}>{data.language} </span>;
        
        return (
        <div>
            <h1 style = {{textAlign: 'center'}}>提交记录</h1>
            <Card>
                <div>
                    <h3 style = {{textAlign: 'center'}}>State: {state}</h3>
                </div>
                <div style = {{float: 'left'}}>
                    <h3>Time: {time} {' | '} Memory: {memory}</h3>
                </div>
                <div style = {{float: 'right'}}>
                    <h3>Author: {author} {' | '} Language: {language}</h3>
                </div>
            </Card>
            <br/>
            <MonacoEditor 
                width="100%"
                height="600"
                language={data.language}
                theme="vs-light"
                value={'注意 这里应该为具体的code'}      // 注意 这里应该为具体的code
            />
            <br/>
            <Table />
        </div>
        );
    }
}

export default CodeDisplay;