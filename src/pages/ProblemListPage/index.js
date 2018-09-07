import React from 'react';
import { Table, Modal } from 'antd';
import ProblemInstancePage from '../ProblemPage';
class ProblemListPage extends React.Component {
    state={
        problem_data: null
    }
    static defaultProps = {
        dataSource: [],
        // problem_data: null,
    }
    render() {
        const columns = [{
            title: '题号',
            dataIndex: 'problem.id',
            key: 'id',
        }, {
            title: '题目名',
            dataIndex: 'problem.title',
            key: 'title',
            render: (text, item) => {
                return (<a 
                href='javascript:;'    
                onClick={() => this.setState({
                    problem_data: item
                })}>{text}</a>);
            }
        }, {
            title: '所属题库',
            dataIndex: 'category',
            key: 'category'
        }, {
            title: '目录',
            dataIndex: 'directory',
            key: 'directory',
            render: (text, item, index) => (
                item.directory.join(" > ")
            )
        }]
        return (
            <div>
                <Table dataSource={this.props.dataSource} columns={columns}></Table>
                <Modal
                    visible={this.state.problem_data?true:false}
                    onCancel={() => this.setState({
                        problem_data: null
                    })}
                >
                    <ProblemInstancePage 
                        disableEditor={true}
                        dataSource={this.state.problem_data}
                    />
                </Modal>
            </div>
        );
    }
}
export default ProblemListPage;