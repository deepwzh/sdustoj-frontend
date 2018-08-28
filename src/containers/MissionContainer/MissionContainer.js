import React from "react";
import Page from "../../pages/MissionInstancePage";
import SubmissionPage from "../../pages/SubmissionPage";
import ProblemInstancePage from "../../pages/MissionInstancePage/ProblemInstancePage";
import SubmissionInstancePage from "../../pages/MissionInstancePage/SubmissionInstancePage";
import { connect } from 'react-redux';
import { getAPIUrl, API, ROLE, PERMISSION_TABLE, PERMISSION, RESOURCE, has_permission} from "../../utils/config";
import { setSiderbarDataSource } from '../../actions';
import { infoRequest } from "../../utils/message";
import MissionInfoPage from "../../pages/MissionInstancePage/MissionInfoPage";

// 一个用以判断是否已经加载过的标记
let isInitFlag = false;

let studentSiderBar = [
    {
        key:"0",
        title: "概览",
        target: "#overview"
    }, {
        key: "1",
        title: "题目",
        target: "#problem",
        childrens: []
    }, {
        key: "2",
        title: "提交",
        target: "#submission",
    }, {
        key: 3,
        title: "成绩",
        target: "#score"
    }
];



class MissionInstanceContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problem_data: [],
            submission: [],
            last_mission_group_id: 0,
            last_hash: '',
            problem_id: null,
            problem_detail_data: null,
            available_problem_data: null,
            problem_prev_data: null,
        }

    }
    static defaultProps = {
        siderbar : []
    }
    componentDidMount() {
        // this.setProblemId(this.props.hash);
        this.getSiderBar();
        this.props.setSiderbarDataSource(this.props.siderbar);
        this.listMissionProblem(this.props.mission_id);
        this.retrieveMission(this.props.mission_id);
        // this.get_instance(this.props.mission_id);
        // this.get_problem(this.props.mission_id);
       
    }
    componentWillReceiveProps(newProps) {
        // let new_hash = newProps.hash;
        // let old_hash = this.props.hash;
        // if (new_hash != old_hash) {
        //     this.setProblemId(new_hash);
        // }
    }

    /**
     * @description 尝试获取侧边栏
     */
    getSiderBar() {
       if(isInitFlag) return;
       isInitFlag = true;

        if(has_permission(RESOURCE.MISSION, PERMISSION.UPDATE))
        {
            this.props.siderbar.push(
                {
                    key:"-1",
                    title: "任务管理",
                    target: "#info"
                }
            );
        } 
        this.props.siderbar.push(...studentSiderBar);
        
    }


    /**
     * 获取提交列表
     * @param mission_id 任务ID
     */
    listSubmissionList = infoRequest({
        loading_text: '正在获取提交记录',
    })((mission_id, params) => {
        const url = getAPIUrl(API.SUBMISSION_LIST(mission_id, params));
        const config = {
            method: 'get',
        }
        return fetch(url, config);
    })

    createSubmission = infoRequest({
        loading_text: '正在提交',
        success_text: '提交成功',
    })((data, mission_id)=> {
        const url = getAPIUrl(API.SUBMISSION_LIST(mission_id));
        const config = {
            method:'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data) 
        };
        return fetch(url, config);
    });
    
    // ####################################### Problem START
    retrieveAvailableProblem = infoRequest({
        loading_text: '正在获取题库信息'
    })((mission_id) => {
        const url = getAPIUrl(API.AVAILABLE_PROBLEM(mission_id));
        const config = {
            method: 'get',
        };
        return fetch(url, config);
    })
    listMissionProblem = infoRequest({
        loading_text: '正在获取题目列表',
        callback: (v) =>{
            this.setState({
                problem_data: v.results
            });
            let childrens = [];
            v.results.map((item, key) => {
                childrens.push({
                    key: "0" + key,
                    title: item.title,
                    target: `#problem/${item.id}`, 
                });
            });
            let key = 1;
            if(has_permission(RESOURCE.MISSION, PERMISSION.UPDATE))
                key = 2;
            this.props.siderbar[key].childrens = childrens;
            this.props.setSiderbarDataSource([...this.props.siderbar]);
        }
    })((mission_id) => {
        const url = getAPIUrl(API.PROBLEM_LIST(mission_id));
        const config = {
            method: 'get',
        };
        return fetch(url, config);
    })
    createMissionProblem = infoRequest({
        loading_text: '正在创建题目',
        success_text: '创建成功',
    })((data, mission_id) => {
        //{'problem': problem_id}
        const url = getAPIUrl(API.CREATE_MISSION_PROBLEM_INSTANCE(mission_id));
        const option = {
            method: 'post',
            headers: {
              "Content-Type": "application/json" 
            },
            body: JSON.stringify(data),
          };
          return fetch(url, option);
    })
        /**
     * 获取指定id的题目信息
     */
    retrieveMissionProblem = infoRequest({
        loading_text: '正在获取题目信息',
        default_value: null // 保证题目页面不出现异常
    })((mission_id, problem_id) => {
        const url = getAPIUrl(API.PROBLEM_INSTANCE(mission_id, problem_id));
        const config = {
            method: 'get',
        }
        return fetch(url, config);
    })
    updateMissionProblem = infoRequest({
        loading_text: '正在更新题目信息',
        success_text: '更新成功'
    })((data, mission_id, problem_id) => {
        let url = getAPIUrl(API.PROBLEM_INSTANCE(mission_id, problem_id));
        let option = {
            method: 'put',
            headers: {
              "Content-Type": "application/json" 
            },
            body: JSON.stringify(data),
          };
          return fetch(url, option);
    })
    deleteMissionProblem = infoRequest({
        loading_text: '正在删除题目',
        success_text: '删除成功'
    })((mission_id, problem_id) => {
        let url = getAPIUrl(API.DELETE_MISSION_PROBLEM_INSTANCE(mission_id, problem_id));
        let option = {
            method: 'delete',
            headers: {
              "Content-Type": "application/json" 
            },
          };
          return fetch(url, option);
    })
    
    //################################ Problem End

    //################################ Mission START
    listMission = infoRequest({
        loading_text: '正在获取任务列表',
    })((mission_group_id) =>{
        const url = getAPIUrl(API.MISSION_LIST(mission_group_id));
        const config = {
            method: 'get',
        };
        return fetch(url, config);
    })
    createMission = infoRequest({
        loading_text: '正在创建任务',
        success_text: '创建成功',
    })((data, mission_group_id) => {
        const url = getAPIUrl(API.CREATE_MISSION_INSTANCE(mission_group_id));
        const option = {
          method: 'post',
          headers: {
            "Content-Type": "application/json" 
          },
          body: data,
        };
        return fetch(url, option);
    })
    retrieveMission = infoRequest({
        loading_text: '正在获取任务',
        callback: (data) => {
            this.setState({
                caption: data.caption,
                introduction: data.introduction,
                start_time: data.start_time,
                end_time: data.end_time
            })
        }
    })((mission_id) => {
        let url = getAPIUrl(API.MISSION_INSTANCE(mission_id));
        let config = {
            method: 'get',
        }
        return fetch(url, config);
    })
    updateMission = infoRequest({
        loading_text: '正在更新任务',
        success_text: '更新成功'
    })((data, mission_id) => {
        let url = getAPIUrl(API.MISSION_INSTANCE(mission_id));
        let config = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
        return fetch(url, config);
    })
    deleteMission = infoRequest({
        loading_text: '正在删除任务',
        success_text: '删除成功',
    })((mission_group_id, mission_id) => {
        const url = getAPIUrl(API.DELETE_MISSION_INSTANCE(mission_group_id, mission_id));
        const config = {
            method: 'delete',
        }
        return fetch(url, config);
    })

    //################################ Mission END


    render() {
        let {hash} = this.props;
        if (hash.startsWith("#problem/")) {
            let {problem_id} = this.props;
            return (
                <ProblemInstancePage 
                    problem_id={problem_id}
                    mission_id={this.props.mission_id}
                    introduction={this.state.introduction}
                    caption={this.state.caption}
                    start_time={this.state.start_time}
                    end_time={this.state.end_time}
                    retrieveMissionProblem={this.retrieveMissionProblem}
                    createSubmission={this.createSubmission}
                />
            );
        } else if (hash.startsWith("#submission")) {
            return (
                <SubmissionInstancePage 
                    mission_id = {this.props.mission_id}
                    introduction={this.state.introduction}
                    caption={this.state.caption}
                    start_time={this.state.start_time}
                    end_time={this.state.end_time}
                    listSubmissionList={this.listSubmissionList}
                />
            );
        } else if(hash.startsWith("#score")) {
            return <h1>hello world</h1>;
        } else if (hash.startsWith("#info")) {
            return <MissionInfoPage
                mission_id = {this.props.mission_id}
                introduction={this.state.introduction}
                caption={this.state.caption}
                start_time={this.state.start_time}
                end_time={this.state.end_time}
                retrieveMission={this.retrieveMission}
                updateMission={this.updateMission}
            />
        }else {
            return (
                <Page
                    mission_id={this.props.mission_id}
                    introduction={this.state.introduction}
                    caption={this.state.caption}
                    start_time={this.state.start_time}
                    end_time={this.state.end_time}
                    has_permission = {this.has_permission}
                    retrieveAvailableProblem={this.retrieveAvailableProblem}
                    listMissionProblem={this.listMissionProblem}
                    createMissionProblem={this.createMissionProblem}
                    deleteMissionProblem={this.deleteMissionProblem}
                    updateMissionProblem={this.updateMissionProblem}
                    />
            );
        }
        

    }
}
const mapStateToProp = (state, ownProps) => {
    let { course_id, mission_group_id, mission_id } = ownProps.match.params;
    console.log(ownProps.match.params);
    // console.log(state.router.location.hash);
    // console.log(state.router.location.search);
    // console.log(state.router.location.hash);
    let problem_id = null;
    const setProblemId = (hash) => {
        function isNumber(v){
            return (/^[0-9]+.?[0-9]*/).test(v);
        }
        if (hash.startsWith('#problem')) {
            let tmp = hash.split('/');
            if (tmp.length == 2) {
                if (isNumber(tmp[1])) {
                    problem_id = tmp[1];
                }
            }
        }
    }
    let hash = state.router.location.hash;
    setProblemId(state.router.location.hash)
    return {
        auth: state.auth,
        pathname: state.router.location.pathname,
        search: state.router.location.search,
        hash,
        course_id,
        mission_group_id,
        mission_id,
        problem_id
        // data: state.course.courseList,
        // loading: state.course.loading,
        // error: state.course.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setSiderbarDataSource: (dataSource) => dispatch(setSiderbarDataSource(dataSource))
    }
}
export default connect(mapStateToProp, mapDispatchToProps)(MissionInstanceContainer);