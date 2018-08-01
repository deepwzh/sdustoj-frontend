import React from "react";
import Page from "../../pages/CourseListPage";
class CourseListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            error: null,
            loading: true
        }
    }
    componentDidMount() {
        this.fetchCourseList();
    }
    fetchCourseList = () => {
        // this.setState({
        //     loading: true
        // })
        fetch('http://192.168.130.249:8008/JudgeOnline/api/learning-courses/', {
            method:'get',
            mode:'cors',
            credentials: "include"
        }).then(response => response.json())
        .then((data)=> this.setState({
            data: data.results,
            loading: false
        }))
        .catch((err) => {
            this.setState({
                error: err,
                loading: true
            })
        });
    }
    render() {
        return (
            <Page {...this.props} 
             data={this.state.data} 
             loading={this.state.loading}
             error={this.state.error} />
        );
    }
}
export default CourseListContainer;