import React from 'react';
import { Card as AntdCard, Table } from 'antd';
const dataSource = [{
    key: '1',
    title: <span style = {{fontWeight: 'bold', fontSize: '15px'}}>山东科技大学OnlineJudge系统正在试运行!</span>,
    time: '2018-05-26',
    author: 'wzh'
  }, {
      key: '2',
      title: <span style = {{fontWeight: 'bold', fontSize: '15px'}}>山东科技大学OnlineJudge系统正在试运行!</span>,
      time: '2018-05-26',
      author: 'wzh'
}];
  const columns = [{
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  }, {
    title: '发布时间',
    dataIndex: 'time',
    key: 'time',
  }, {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
  }];
  
const Card = (props) => {
    return (
    <AntdCard title= {<span style = {{fontWeight: 'bold', fontSize: '20px'}}> 公告</span>} > 
            <Table dataSource={dataSource} columns={columns} />
        </AntdCard>
    )
};
export default Card;