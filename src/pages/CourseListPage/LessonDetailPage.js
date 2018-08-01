import './index.css';
import React from 'react';
import { withRouter } from 'react-router-dom';
import pic from "../../image/lesson_c.png";
import MissionSideBar from './MissionSideBar';
import MissionGroupPage from './MissionGroupPage';
// const data = [
//     {
//         key: 0,
//         title: '课程概述',
//         description: ''
//     }, {
//         key: 2,
//         title: '实验',
//         description: ''
//     }, {
//         key: 3,
//         title: '作业',
//         description: ''
//     }
// ];
class LessonDetailPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            column : [],
            mission_id: 2,
            mission_data: []
        }
    }
    get_lesson_detail = () => {
        // fetch('', {
    
        // }).then(
            
        // );
    }
    componentDidMount() {
        let { match } = this.props;
        this.get_mission_group(match.params.id);    
    }
    _convert_mission_group_data = (v) => {
        let data = [];
        v.results.map((item, key) => {
            data.push({key: item.id, title: item.caption})
            // console.log(data);
        })
        return data;
    }
    get_mission_group = (lesson_id) => {
        fetch(`http://192.168.130.249:8008/JudgeOnline/api/courses/${lesson_id}/mission-groups/`, {
            method: 'get',
            credentials: 'include'    
        }).then(res => res.json()).then((v) => this.setState({column: this._convert_mission_group_data(v)}));
    }
    get_mission = (mission_group_id) =>{
        let url = `http://192.168.130.249:8008/JudgeOnline/api/mission-groups/${mission_group_id}/missions/`;
        fetch(url, {
            method: 'get',
            credentials: 'include'    
        }).then(res => res.json()).then((res)=> this.setState({mission_data: res.results}));
    }
    onMissionChange = (mission_id) => {
        this.setState({
            mission_id: mission_id
        })
        this.get_mission(mission_id);
    }
    render() {
        return (
            <div id="lesson-detail">
                <div id="lesson-detail-banner">
                    程序设计基础 - 吴振寰 - 2018年秋季
                    {/* <img src={pic}/> */}
                </div>
                <div id="lesson-detail-container">
                    <div id="lesson-detail-mission-sidebar">
                        <MissionSideBar column={this.state.column} onMissionChange={this.onMissionChange} />
                    </div>
                    <div id="lesson-detail-content">
                        <MissionGroupPage data={this.state.mission_data}/>
                    </div>
                    <div id="lesson-detail-info-sidebar">
                        
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(LessonDetailPage);