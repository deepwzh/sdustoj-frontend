import {Table, Button, Select, Input, Tag, Card} from 'antd';
import React, {PureComponent} from 'react';
import './index.css'

import '../StatisticsPage/index'
import STatisticsPage from '../StatisticsPage/index';

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
const resultColor = [
    "black",
    "#00ff00",
    "#ff0000",
    "red",
    "red",
    "red",
    "red",
    "red",
    "navy",
    "navy",
    "navy",
    "orange",
    "orange",
    "orange",
    "orange"
];



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
                <Button type="primary" onClick = {() =>{ console.log("gggg");}} >refresh</Button>
            </div>
        );
        
    }


}

class StatusPage extends React.Component {
    constructor(props)  {
        super(props);
        this.state = {
                value : {
                    problemID : '',   
                    userID : '',
                    language : -1,
                    result : -1,
                    },
                handle : {
                    onProblemIDChange : (e) =>{this.setState({value : {...this.state.value, problemID : e.target.value}})},
                    onUserIDChange : (e) =>{this.setState({value : {...this.state.value, userID : e.target.value}})},
                    onLanguageChange : (val) => {this.setState({value : {...this.state.value, languageID : val}})},
                    onResultChange : (val) => {this.setState({value : {...this.state.value, result : val}})}
                }
            };
            /**/ 
        this.p(this.data);
        
    }

    columns = [ {
            title: 'RunID',
            dataIndex: 'runID',
            key: 'runId',
        }, {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            render: text => { return <a herf = "#">{text}</a>},
        }, {
            title: 'Problem',
            dataIndex: 'problem',
            key: 'problem',
            render: text => {return <a herf = "#">{text}</a>},
        }, {
            title: 'Result',
            dataIndex: 'result',
            key: 'result',
            render: text => {return <Tag color = {resultColor[text]}>{resultType[text]}</Tag>},
        }, {
            title: 'Memory',
            dataIndex: 'memory',
            key: 'memory',
        }, {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        }, {
            title: 'Language',
            dataIndex: 'language',
            key: 'language',
            render: text => {return (languageType[text]);},
        }, {
            title: 'Code Length /B',
            dataIndex: 'codeLength',
            key: 'codeLength',
        }, {
            title: 'Submit Time',
            dataIndex: 'submitTime',
            key: 'submitTime',
        }
    ]
    
    data = [
        {
            key : 1,
            runID : 1,
            user : 1,
            problem : 1,
            result : 1,
            memory : 1,
            time : 1,
            language : 1,
            codeLength : 1,
            submitTime : 1,
        }
    ];

    p(data)
    {
        
        for(let i = 0; i < 40; ++i)
        {
            data.push(data[0]);
        }
    }

    render()
    {
        const content = (
            <div id = "state-page">
                <Selector onChange = {this.state.handle} value = {this.state.value}/>
                <Table bordered = "true" size = "small" columns = {this.columns} dataSource = {this.data} />
            </div>
        );

        return (
            <div>
                <Card>
                    {content}
                </Card>
                <STatisticsPage />
            </div>
        );
    }
}

export default StatusPage;
