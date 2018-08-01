import React from 'react';
import Table from './SubmissionTable';
import { withRouter } from "react-router-dom";
import Cookie from 'js-cookie';
class SubmissionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    get_submission_list = () => {
        fetch('http://sdustoj.92ac.cn:8008/JudgeOnline/api/missions/3/submissions/', {
            method: 'get',
            mode:'cors',
            credentials: 'include',
            headers: {  
                // "X-CSRFTOKEN": Cookie.get('csrftoken')             
            }
        }).then((response) => response.json()).then((data) => this.setState({data: data.results}))
    }
    componentDidMount() {
        let { match } = this.props;
        let mission_id = match.params.mission_id;
        this.get_submission_list(mission_id);
    }
    render() {
        return (
            <div>
                <Table data={this.state.data}/>
            </div>
        );
    }
}
export default withRouter(SubmissionPage);