import React from "react";
import Page from "../../pages/CourseListPage";
import { connect } from 'react-redux';
import { learningCoursesListRequest } from '../../actions';
import { API, getAPIUrl, ROLE } from "../../utils/config";
class CourseListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this.fetchCourseList();
    }
    fetchCourseList = () => {
        let url = null;
        if (this.props.auth.role === ROLE.STUDENT) {
            url = getAPIUrl(API.LEARNING_COURSES_LIST);
        } else {
            url = getAPIUrl(API.TEACHING_COURSES_LIST);
        }
        fetch(url, {
            method: 'get',
            credentials: 'include'    
        }).then(res => res.json()).then((res)=> this.setState({data: res.results}));
    }
    render() {
        return (
            <Page {...this.props} 
             data={this.state.data} 
             role={this.props.role}
              />
        );
    }
}
const mapStateToProp = (state) => {
    return {
        auth: state.auth
        // data: state.course.courseList,
        // loading: state.course.loading,
        // error: state.course.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return dispatch;
    // return {
    //     getCourseList: () => dispatch(RETRIEVE_COURSE_LIST_REQUEST())
    // }
}
export default connect(mapStateToProp, null)(CourseListContainer);