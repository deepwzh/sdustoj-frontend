import React from 'react';
import Page from '../../pages/ProblemListPage';
import { getAPIUrl, API, has_permission, RESOURCE, PERMISSION } from '../../utils/config';
import { infoRequest } from '../../utils/message';
import { connect } from 'react-redux';

class ProblemListContainer extends React.Component {
    state = {
        dataSource: []
    }
    componentDidMount() {
        this.retrieveAvailableProblem(this.props.mission_id);
    }
    retrieveMissionProblem = infoRequest({
        loading_text: '正在获取题目信息',
        default_value: null, // 保证题目页面不出现异常,
    })((mission_id, problem_id) => {
        const url = getAPIUrl(API.GLOBAL_PROBLEM_INSTANCE(problem_id));
        const config = {
            method: 'get',
        }
        return fetch(url, config);
    })
    retrieveAvailableProblem = infoRequest({
        loading_text: '正在获取题库信息',
        callback: (data) => {
            // console.log(data);
            if (has_permission(RESOURCE.PROBLEM, PERMISSION.UPDATE)) {
                this.setState({
                    dataSource: data.results
                })
            }
        }
    })((mission_id) => {
        const url = getAPIUrl(API.AVAILABLE_PROBLEM(mission_id));
        const config = {
            method: 'get',
        };
        return fetch(url, config);
    })
    render() {
        return (
            <Page
                mission_id={this.props.mission_id}
                dataSource={this.state.dataSource}
                retrieveMissionProblem={(problem_id) => this.retrieveMissionProblem(this.props.mission_id, problem_id)}
            />
        );
    }
}
// mapDispatchToProps
function mapStateToProp(state, ownProps) {
    const { mission_id } = ownProps.match.params;
    return {
        mission_id: mission_id
    }
}
export default connect(mapStateToProp, null)(ProblemListContainer);