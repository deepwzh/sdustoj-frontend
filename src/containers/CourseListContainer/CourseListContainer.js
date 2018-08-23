import React from "react";
import Page from "../../pages/CourseListPage";
import { connect } from 'react-redux';
import { learningCoursesListRequest } from '../../actions';
import { API, getAPIUrl, ROLE } from "../../utils/config";
import { infoRequest } from "../../utils/message";
class CourseListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this.listCourse();
    }
    createCourse = infoRequest({
        loading_text: '正在创建课程',
        message_text: '创建成功'
    })((data, course_meta_id) => {
        const url = getAPIUrl(API.COURSE_LIST(course_meta_id));
        const config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        return fetch(url, config);
    });
    updateCourse = infoRequest({
        loading_text: '正在更新',
        success_text: '更新成功'
    })((course_id) => {
        const url = getAPIUrl(API.COURSE_INSTANCE(course_id));
        const option = {
            method: 'PATCH',
        }
        return fetch(url, option);
    })
    deleteCourse = infoRequest({
        loading_text: '正在删除',
        success_text: '删除成功'
    })((course_id) => {
        const url = getAPIUrl(API.COURSE_INSTANCE(course_id));
        const option = {
            method: 'get',
        }
        return fetch(url, option);
    })
    listCourse = infoRequest({
        callback:(res) => this.setState({data: res.results}),
    })(() => {
        let url = null;
        let option = {
            method: 'get',
        }
        if (this.props.auth.role === ROLE.STUDENT) {
            url = getAPIUrl(API.LEARNING_COURSES_LIST);
        } else {
            url = getAPIUrl(API.TEACHING_COURSES_LIST);
        }
        return fetch(url, option);
    })
    render() {
        return (
            <Page {...this.props} 
             listCourse={this.listCourse}
             createCourse={this.createCourse}
             deleteCourse={this.deleteCourse}
             updateCourse={this.updateCourse}
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