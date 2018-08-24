import React from 'react';
import Table from './SubmissionTable';
import { Card, Button } from 'antd';
import './index.css';
import Cookie from 'js-cookie';
class SubmissionPage extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return (
            <Card id="submission-card">
                <Table data={this.props.data}/>
            </Card>
        );
    }
}
export default SubmissionPage;