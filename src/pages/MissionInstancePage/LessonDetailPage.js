import './index.css';
import React from 'react';
import { withRouter } from 'react-router-dom';
import pic from "../../image/lesson_c.png";
// import LessonSideBar from './LessonSideBar';
import MissionGroupPage from './MissionGroupPage';
import {Card} from 'antd';
import { HeaderPage } from '../HeaderPage';

class LessonDetailPage extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let { match } = this.props;
        // this.get_mission_group(match.params.course_id);    
    }


    // onSideBarChange = (key) =>{
    //     if(key != this.state.sideBarEntryID)
    //         this.setState({sideBarEntryID : key});
    // }

    render() {
        return (
            <div id="lesson-detail">
                <HeaderPage {...props}/>
                <div id="lesson-detail-container">
                    <div id="lesson-detail-mission-sidebar">
                        {/* <LessonSideBar onSideBarChange={this.onMissionChange} /> */}
                    </div>
                    <div id="lesson-detail-content">
                        <MissionGroupPage {...this.props}/>
                    </div>
                    <div id="lesson-detail-info-sidebar">
                        
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(LessonDetailPage);