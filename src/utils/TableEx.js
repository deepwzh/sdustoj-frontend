import React from "react";
import { Table, Button, Card, Popconfirm, message } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { Record } from "../../node_modules/immutable";


const columns = [
    ,
    {
        title = '删除',
        dataIndex = 'edit',
        key = 'edit',
        render : (text, record)=> {
            <Popconfirm title="确定要删除该项?" onConfirm={() => {this.props.deleteItem(record.key)}} >
                <Button>Delete</Button>
            </Popconfirm>
        }
    }
]; 


class TableEx extends React.Component {


    addItem = () => {   // 同步数据库添加

    }

    deleteItem = (key) => { // 我们需要同步数据库删除

    }

    render() {

    }
}