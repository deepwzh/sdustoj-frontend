import React from "react";
import Page from "../../pages/CourseListPage";
import { connect } from 'react-redux';
import { learningCoursesListRequest } from '../../actions';
import { API, getAPIUrl } from "../../utils/config";
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
        let url = getAPIUrl(API.LEARNING_COURSES_LIST);
        fetch(url, {
            method: 'get',
            credentials: 'include'    
        }).then(res => res.json()).then((res)=> this.setState({data: res.results}));
    }
    render() {
        return (
            <Page {...this.props} 
             data={this.state.data} 
             loading={false}
             error={this.props.error} />
        );
    }
}
const mapStateToProp = (state) => {
    return {
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
export default connect(null, null)(CourseListContainer);