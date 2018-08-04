/**
 * @description 模仿virtual Judge 的contest overview  
 * 对于 overview 来说， 目前只有一个 Table
 */
import {Table, Card} from 'antd';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import TableComponent from '../ProblemTable'


const columns = [
    {
        title : 'Stat',
        dataIndex : 'stat',
        key : 'stat'
    }, {
        title : 'ProblemID',
        dataIndex : 'problem_id',
        key : 'problem_id'
    }, {
        title : 'Title',
        dataIndex : 'title',
        key : 'title',
        render: (text, record) => {
            console.log(record);
            let to = this.props.location.pathname + "/problem/" + record.id;
            return <Link to={to} >{text}</Link>
          }
    }
];

class OverView extends React.Component {
    constructor(props)
    {
        super(props);
    }


    render() {
        return(
            <Card>
                <TableComponent  data = {this.props.problemsData} />
            </Card>
        );
    }



} 



export default withRouter(OverView);
