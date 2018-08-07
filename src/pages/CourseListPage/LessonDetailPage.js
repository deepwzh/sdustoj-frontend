import './index.css';
import React from 'react';
import { withRouter } from 'react-router-dom';
import pic from "../../image/lesson_c.png";
import MissionGroupPage from './MissionGroupPage';
import {Card} from 'antd';

// 引入用户权限配置
import userConf from "./../../userConf.js";
import {sideBarItems, SideBar} from './../../utils'

let items = sideBarItems('LessonPage');

class LessonDetailPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            column : [],
            mission_id: 2,
            mission_data: [],
            
            sidebarItemIsRead : false,      // 选择的项是否可写的标记
        }
    }
    get_lesson_detail = () => {
      
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
        fetch(`http://www.92ac.cn:8008/JudgeOnline/api/courses/${lesson_id}/mission-groups/`, {
            method: 'get',
            credentials: 'include'    
        }).then(res => res.json()).then((v) => this.setState({column: this._convert_mission_group_data(v)}));
    }
    get_mission = (mission_group_id) =>{
        let url = `http://www.92ac.cn:8008/JudgeOnline/api/mission-groups/${mission_group_id}/missions/`;
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

    onSideBarChange = (e) =>{
        const flag = userConf.list[userConf.curUser]['LessonPage'][e.key][1]; // 获取写标记
        if(flag == 1)   {   // 如果可写，设置 可写标记 
            this.setState({sidebarItemIsRead : true});
        }    else   {
            this.setState({sidebarItemIsRead : false});    
        }
    }

    changeLessonContentBy = (key)=>{
    
    }


    render() {
        return (
            <div id="lesson-detail">
                <div >
                    <Card>这个地方放些课程简要什么的</Card>
                </div>
                <div id="lesson-detail-container">
                    <div id="lesson-detail-mission-sidebar">
                        <SideBar onSelect={this.onSideBarChange} items = {items} />
                    </div>
                    <div id="lesson-detail-content">
                        <MissionGroupPage data={this.state.mission_data} isRead = {this.state.sidebarItemIsRead}/>
                    </div>
                    <div id="lesson-detail-info-sidebar">
                        
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(LessonDetailPage);