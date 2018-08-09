import './index.css';
import React from 'react';
import { withRouter } from 'react-router-dom';
import Moment from 'moment';
import pic from "../../image/lesson_c.png";
// import LessonSideBar from './LessonSideBar';
import MissionGroupPage from './MissionGroupPage';
import { ProcessBarHeaderPage } from '../HeaderPage';
class LessonDetailPage extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() { 
    }
    render() {
        //TODO: 此处应该采用服务器时间，暂时用客户端时间来代替吧
        return (
            <div id="mission-instance">
                <ProcessBarHeaderPage 
                introduction={this.props.introduction}
                caption={this.props.caption}
                start_time={this.props.start_time}
                end_time={this.props.end_time}
                />
                <div id="mission-instance-container">
                    <div id="mission-instance-content">
                        <MissionGroupPage {...this.props}/>
                    </div>
                    <div id="mission-instance-info-sidebar">
                        
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(LessonDetailPage);