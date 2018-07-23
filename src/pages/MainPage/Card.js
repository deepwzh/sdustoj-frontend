import React from 'react';
import { Card as AntdCard, Table } from 'antd';
const dataSource = [{
    key: '1',
    title: '山东科技大学OnlineJudge系统正在试运行!',
    time: '2018-05-26',
    author: 'wzh'
  }, {
      key: '2',
      title: '山东科技大学OnlineJudge系统正在试运行!',
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
        <AntdCard title="公告" /*extra={<a href="#">More</a>}*/>
            <Table dataSource={dataSource} columns={columns} />
        </AntdCard>
    )
};
export default Card;