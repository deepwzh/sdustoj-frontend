import './index.css';
import React from 'react';
import MissionContentPage from './MissionSideBar';
import { withRouter } from "react-router-dom";

import {sideBarItems, SideBar} from './../../utils'

let items = sideBarItems('MissionPage');

class LessonDetailPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            column : [],
            selected_id: 0,
            problem_data: []
        }
    }
    get_lesson_detail = () => {
       
    }
    componentDidMount() {
        let {match} = this.props;
        this.get_mission_group(match.params.id); 
        this.get_mission(this.props.match.params.mission_id);   
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
    get_mission = (mission_id) =>{
        let url = `http://192.168.130.249:8008/JudgeOnline/api/missions/${mission_id}/problems/?ordering=problem_id`;
        // console.log(url);
        fetch(url, {
            method: 'get',
            credentials: 'include'    
        }).then(res => res.json()).then((res)=> this.setState({problem_data: res.results}));
    }
    onSelectedChange = (selected_id) => {
        this.setState({
            selected_id: selected_id
        })
        if (selected_id == 1) {
            // console.log(this.props.match);
            //TODO: 这里设置了临时数据，不要忘记修改
            let mission_id = this.props.match.params.mission_id;
            this.get_mission(mission_id); 
        }
    }
    render() {

        console.log("MissionPage\n" + this.state.problem_data);

        return (
            <div >
                <div id="lesson-detail-banner">
                    {/* 程序设计基础 - 吴振寰 - 2018年秋季 */}
                    {/* <img src={pic}/> */}
                </div>
                <div>

                    <SideBar items = {items} />
                    <div>
                        <MissionContentPage problemsData = {this.state.problem_data} />
                    </div>

                </div>
            </div>
        );
    }
}
export default withRouter(LessonDetailPage);
