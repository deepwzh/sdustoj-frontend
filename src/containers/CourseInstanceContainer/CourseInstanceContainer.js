import React from "react";
import Page from "../../pages/CourseInstancePage";
import { connect } from 'react-redux';
import { learningCoursesListRequest } from '../../actions';
class CourseInstanceContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.pathname
        this.props.hash
        this.props.role ['STUDENT', 'TEACHER']

        // this.fetchCourseList();
    }
    // fetchCourseList = () => {
    //     this.props.getCourseList();
    // }
    render() {
        return (
            <Page {...this.props} 
             data={this.props.data} 
             loading={this.props.loading}
             error={this.props.error} />
        );
    }
}
const mapStateToProp = (state) => {
    return {
        pathname: state.router.
        // data: state.course.courseList,
        // loading: state.course.loading,
        // error: state.course.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCourseList: () => dispatch(learningCoursesListRequest())
    }
}
export default connect(mapStateToProp, mapDispatchToProps)(CourseInstanceContainer);