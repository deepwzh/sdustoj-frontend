import React from 'react';
import { Card as AntdCard, Table } from 'antd';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { goForward, push  } from "connected-react-router";
// const dataSource = [{
//     key: '1',
//     title: <span style = {{fontWeight: 'bold', fontSize: '15px'}}>山东科技大学OnlineJudge系统正在试运行!</span>,
//     time: '2018-05-26',
//     author: 'wzh'
//   }, {
//       key: '2',
//       title: <span style = {{fontWeight: 'bold', fontSize: '15px'}}>山东科技大学OnlineJudge系统正在试运行!</span>,
//       time: '2018-05-26',
//       author: 'wzh'
// }];

  
class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            dataSource: []
        })
    }
    componentDidMount() {
        this.getContent();
    }
    getContent = () => {
        this.props.list().then((data) => {
            this.setState({
                dataSource: data
            })
        });
    }
    render() {
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (text,record) => {
                return <Link to={`/board/${record.id}`}>{text}</Link>
            }
          }, {
            title: '发布时间',
            dataIndex: 'pulish_time',
            key: 'pulish_time',
          }, {
            title: '作者',
            dataIndex: 'owner',
            key: 'owner',
          }];
        return (
            <AntdCard 
                title= {<span style = {{fontWeight: 'bold', fontSize: '20px'}}> 公告</span>} 
                extra={<Button type='primary' onClick={() => {
                    this.props.push('/board/new');
                }}>发布新公告</Button>}
            > 
                <Table dataSource={this.state.dataSource} columns={columns} />
            </AntdCard>
        );
    }
}
const dispatchToProps = (dispatch) => {
    return {
        push: (v) => dispatch(push(v))
    }
}
export default connect(null, dispatchToProps)(MainPage);