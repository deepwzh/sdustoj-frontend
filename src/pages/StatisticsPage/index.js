import {Table, Card} from 'antd';
import ReactEcharts from 'echarts-for-react';
import React from 'react';
import './index.css'

const resultType = [
    "problem", "AC", "PE", "WA", "TLE", "MLE", "OLE", "RE", "CE", "Total",
];

const LanguageType = [
    "C", "C++", "Pascal", "Java", "Ruby", "Bash", "Python", "PHP", "Perl", "C#",
];

const keywords = [
    "分数段", "人数", "平均分", "占比", "题目", "解决人数", "解决占比",
];


let columnsNew = function(keys) {
    let columns = keys.map((val) => { return {title : val, dataIndex : val, key : val}});
    return columns;
};

let testResultData = [
    {
        key : 1,
        problem : 'A',
        AC : 10,
        PE : '',
        WA : 10,
        TLE : '',
        Total : 20,
    },
    {
        key : 2,
        problem : 'B',
        AC : 10,
        PE : '',
        WA : 10,
        TLE : '',
        Total : 20,
    },
    {
        key : 3,
        problem : 'C',
        AC : 10,
        PE : '',
        WA : 10,
        TLE : '',
        Total : 20,
    },
    {
        key : 4,
        problem : 'D',
        AC : 10,
        PE : '',
        WA : 10,
        TLE : '',
        Total : 20,
    },
    
];


class LLL extends React.Component {
    render() {
      let option = {
            xAxis: {
                type: 'category',
                data: ['0 ~ 50', '50 ~ 60', '60 ~ 70', '70 ~ 80', '80 ~ 90', '90 ~ 100']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [5, 6, 1, 9, 13, 41],
                type: 'bar'
            }]
        };
        return (
        <ReactEcharts option = {option} />
        );
    }
}



class STatisticsPage extends React.Component {


    render() {
        return (
            <div>
            <Card>
                <div id = "float-left">
                    <Table columns = {columnsNew(resultType)} dataSource = {testResultData} size = "small" pagination = {false}/>
                </div>
                <div id = "float-right">
                    <Table columns = {columnsNew(resultType)} dataSource = {testResultData} size = "small" pagination = {false}/>
                </div>
            </Card>
            <Card>
                <div id = "float-left">
                    <Table columns = {columnsNew(resultType)} dataSource = {testResultData} size = "small" pagination = {false}/>
                </div>
                <div id = "float-right">
                    <Table columns = {columnsNew(resultType)} dataSource = {testResultData} size = "small" pagination = {false}/>
                </div>
                </Card>
            <Card>
                <div id = "float-left">
                    <LLL />
                </div>
                <div id = "float-right">
                    <LLL />
                </div>
            </Card>
            </div>
        );
    }


}

export default STatisticsPage;