import React from 'react';
import Table from './SubmissionTable';
import { Card, Button } from 'antd';
import './index.css';
import Cookie from 'js-cookie';
class SubmissionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
    }
    componentDidMount() {
        this.fetchDataSource();
    }
    fetchDataSource = () => {
        this.props.listSubmissionList(this.props.mission_id)
        .then((res) => this.setState({
            dataSource: res.results 
        }));
    }
    render() {
        return (
            <Card id="submission-card">
                <Button onClick={() => this.props.listSubmissionList(this.props.mission_id)}>刷新</Button>
                <Table data={this.state.dataSource}/>
            </Card>
        );
    }
}
export default SubmissionPage;