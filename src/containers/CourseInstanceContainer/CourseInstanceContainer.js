import React from "react";
/**
 * @note Page 原名 LessDetailPage 位于"../../pages/CourseInstancePage"下
 */
import Page from "../../pages/CourseInstancePage";
import {infoRequest} from '../../utils/message';
import { connect } from 'react-redux';
import { getAPIUrl, API, ROLE, PERMISSION_TABLE, PERMISSION, has_permission, RESOURCE} from "../../utils/config";
import { setSiderbarDataSource } from '../../actions';
import CourseStudentPage from '../../pages/CourseInstancePage/CourseStudentPage';
import MissionGroupPage from "../../pages/CourseInstancePage/TrueMissionGroupPage";
import { push, replace } from "connected-react-router";
import CourseInfoPage from '../../pages/CourseInstancePage/CourseInfo';
// 一个用以判断是否已经加载过的标记
let isInitFlag = false;

class CourseInstanceContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mission_data: [],
            submission: [],
            studentData: [],
            mission_group_id: null,
        };
    }
    static defaultProps = {
        
        siderbar : [{
            key: '5',
            title: '课程详细信息',
            target: ''
        },{
            key: '100',
            title: '正在进行的任务',
            target: '#running'
        }, {
            key: "0",
            title: "所有任务",
            target: "",
            childrens: []
        }, {
            key: '4',
            title: '任务组',
            target: "#mission_group"
        }, ],
    }
    componentDidMount() {
        this.props.setSiderbarDataSource(this.props.siderbar);
        this.get_instance(this.props.course_id);
        this.getSiderBarItems(this.props.course_id);
        if (this.props.hash === '') {
            this.props.push({
                hash:"#running"
            });
        }
        // alert("Hello World");
        // this.fetchCourseList();
    }
    componentWillReceiveProps(newProps) {
        // let new_hash = newProps.hash;
        // let old_hash = this.props.hash;


    }
    // fetchCourseList = () => {
    //     this.props.getCourseList();
    // }
    // _convert_mission_group_data = (v) => {
    //     let data = [];
    //     v.results.map((item, key) => {
    //         data.push({mission_group_id: item.id, title: item.caption})
    //         // console.log(data);
    //     })
    //     return data;
    // }

    /**
     * @description <old> 获取当前课程任务组 并将其作为侧边栏项
     * @description <new> 添加用户判断，以展示不同的侧边栏项. 这里有点小问题的是，
     * 暂时我只能根据对该任务组具有create权限来判断是否应该添加其它侧边栏项。以后再改 :)
     * @time 18-08-09
     */
    getSiderBarItems = (course_id) => {
        this.get_mission_group(course_id);

        if(isInitFlag) return;
        isInitFlag = true;
        
        
        // 如果对该任务组具有create权限
        if(has_permission(RESOURCE.MISSION_GROUP, PERMISSION.CREATE))
        {
            let otherSideBarItems = [
                // {
                //     key: '1',
                //     title: '教师',
                //     target: `#teacher`,
                // },
                {
                    key: '2',
                    title: '学生',
                    target: `#student`,
                },{
                    key: '3',
                    title: '所在课程组',
                    target: `#course_group`
                }
            ];
            this.props.siderbar.push(...otherSideBarItems);
        }
      //  this.props.setSiderbarDataSource([...this.props.siderbar]);
    }
    addMissionGroupToMenu = (v) => {
        let childrens = [];
        v.results.map((item, key) => {
            childrens.push({
                key: "0" + key,
                title: item.caption,
                target: `#mission_group/${item.id}`, 
            });
        });
        this.props.siderbar.find(({key}) => key === '0').childrens = childrens;
        ///////// 加几个bug :)
        this.props.siderbar[0].target = `#course_info`;
        //////////////////
        this.props.setSiderbarDataSource([...this.props.siderbar]);
    }
    get_mission_group = infoRequest({
        callback: this.addMissionGroupToMenu}
    )((course_id) => {
        let url = getAPIUrl(API.MISSION_GROUP_LIST(course_id));
        let option = {
            method: 'get',
        };
        return fetch(url, option);
    })
    get_instance = infoRequest({callback:(res) => {
        this.setState({introduction: res.introduction, caption: res.caption})
    }})((course_id) => {
        let url = getAPIUrl(API.COURSE_INSTANCE(course_id));
        return fetch(url, {
            method: 'get',
        });
    })
    /////////////////////////////////////////////////////STUDENT START
    listMissionStudent = infoRequest({
        loading_text: '正在获取课程中的学生信息'
     })((course_id) => {
        let url = getAPIUrl(API.MISSION_STUDENT_LIST(course_id));
        let option = {
          method: 'get',
          headers: {
            "Content-Type": "application/json" 
          },
        };
        return fetch(url, option);
    })
    createMissionStudent = infoRequest({
        loading_text: '正在添加学生信息',
        success_text: '添加成功'
    })((course_id, data) => {
        let url = getAPIUrl(API.MISSION_STUDENT_LIST(course_id));
        let option = {
          method: 'post',
          headers: {
            "Content-Type": "application/json" 
          },
          body: JSON.stringify(data),
        };
        return fetch(url, option);
    })
    deleteMissionStudent = infoRequest({
        loading_text: '正在删除学生信息',
        success_text: '删除成功'
    })((course_id, id) => {
        let url = getAPIUrl(API.MISSION_STUDENT_INSTANCE(course_id, id));
        let option = {
            method: 'delete',
        }
        return fetch(url, option);
    })
    /////////////////////////////////////////////////////STUDENT END

    ////////////////////////////////////////////////// Mission START
    listRunningMission = infoRequest({
        loading_text: '正在获取当前正在运行的题目列表',
    })(() => {
        let url = getAPIUrl(API.RUNNING_MISSION_LIST(this.props.course_id));
        const config = {
            method: 'get',
        }
        return fetch(url, config);
    })
    listMission = infoRequest({
        loading_text: '正在获取任务列表'
    })((mission_group_id) =>{
        const url = getAPIUrl(API.MISSION_LIST(mission_group_id));
        const config = {
            method: 'get',
        };
        return fetch(url, config);
    })
    deleteMission = infoRequest({
        loading_text: '正在删除任务'
    })((mission_group_id, mission_id) => {
        const url = getAPIUrl(API.DELETE_MISSION_INSTANCE(mission_group_id, mission_id));
        const option = {
            method: 'delete',
        }
        return fetch(url, option);
    })
    updateMission = infoRequest({
        loading_text: '正在更新任务',
        success_text: '更新完成',
    })((data, mission_group_id, mission_id) => {
        const url = getAPIUrl(API.UPDATE_MISSION_INSTANCE(mission_group_id, mission_id));
        const config = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        };
        return fetch(url, config);
    })
    retrieveMission = infoRequest({
        loading_text: '正在获取任务',
    })((mission_id) => {
        let url = getAPIUrl(API.MISSION_INSTANCE(mission_id));
        return fetch(url, {
            method: 'get',
            // credentials: 'include'  
        }).then(res => res.json());
    })
    createMission = infoRequest({
        loading_text: '正在创建任务',
        success_text: '创建成功'
    })((data, mission_group_id) => {
        const url = getAPIUrl(API.CREATE_MISSION_INSTANCE(mission_group_id));
        const option = {
          method: 'post',
          mode:'cors',
          headers: {
            "Content-Type": "application/json" 
          },
          credentials:'include',
          body: data,
        };
        return fetch(url, option);
    })
    ////////////////////////////////////////////////// Mission END

    ////////////////////////////////////////////////// MissionGroup START
    listMissionGroup = infoRequest({
        loading_text: '正在获取任务组'
    })((course_id) => {
        let url = getAPIUrl(API.MISSION_GROUP_LIST(course_id));
        let option = {
            method: 'get',
        }
        return fetch(url, option);
    })
    createMissionGroup = infoRequest({
        success_text: '添加任务组成功',
        loading_text: '正在添加任务组'
    })((data, course_id) => {
        let url = getAPIUrl(API.MISSION_GROUP_LIST(course_id));
        let option = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        return fetch(url, option);
    })
    retrieveMissionGroup = (course_id, mission_group_id) => {
        
    }
    updateMissionGroup = infoRequest({
        success_text: '修改任务组成功',
        loading_text: '正在修改任务组'
    })((data, mission_group_id) => {
        let url = getAPIUrl(API.MISSION_GROUP_INSTANCE(mission_group_id));
        let config = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        return fetch(url, config);
    });
    deleteMissionGroup =  infoRequest({
        success_text: '删除任务组成功',
        loading_text: '正在删除任务组'
    })((mission_group_id) => {
        let url = getAPIUrl(API.MISSION_GROUP_INSTANCE(mission_group_id));
        let config = {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
        }
        return fetch(url, config);
    });
    ////////////////////////////////////////////////// MissionGroup END

    render() {
        let {hash} = this.props;
        if (hash.startsWith("#student")) {
            return <CourseStudentPage
                introduction={this.state.introduction}
                caption={this.state.caption}
                createMissionStudent={(data) => this.createMissionStudent(this.props.course_id, data)}
                listMissionStudent={() => this.listMissionStudent(this.props.course_id)}
                deleteMissionStudent={(id) => this.deleteMissionStudent(this.props.course_id, id)}
                />
        } else if (hash == "#mission_group") {
            let { course_id } = this.props;
            return <MissionGroupPage
                course_id={course_id}
                introduction={this.state.introduction} /** 此字段日后需要溢出 */
                caption={this.state.caption} /**此字段日后需要移除 */
                listMissionGroup={() => this.listMissionGroup(course_id)}
                retrieveMissionGroup={(mission_group_id) => this.retrieveMissionGroup(course_id, mission_group_id)}
                createMissionGroup={(data) => this.createMissionGroup(data, course_id)}
                updateMissionGroup={(data, mission_group_id) => this.updateMissionGroup(data, mission_group_id)}
                deleteMissionGroup={(mission_group_id) => this.deleteMissionGroup(mission_group_id)}
            />
        }  else if (hash.startsWith('#info')) {
            return <CourseInfoPage
                    course_id={this.props.course_id}
                />
        }
        return (
            <Page {...this.props} 
            introduction={this.state.introduction}
            caption={this.state.caption}
            mission_group_id={this.props.mission_group_id}
            createMission ={this.createMission}
            deleteMission = {this.deleteMission}
            updateMission={this.updateMission}
            retrieveMission={this.retrieveMission}
            listMission={this.listMission}
            listRunningMission={this.listRunningMission}
             />
        );
    }
}
const mapStateToProp = (state, ownProps) => {
    function isNumber(v){
        return (/^[0-9]+.?[0-9]*/).test(v);
    }
    
    let { course_id} = ownProps.match.params;
    let hash = state.router.location.hash;
    let mission_group_id = null;
    if (hash.startsWith("#running")) {
        mission_group_id = '0'; //0代表正在运行的任务组成的*虚拟*任务组
        // this.get_running_mission(newProps.course_id);
    } else if (hash.startsWith("#mission_group/")) {
        let tmp = hash.split('/');
        if (tmp.length === 2 && isNumber(tmp[1])) {
            mission_group_id = hash.split('/')[1]; 
        }
    }
    return {
        auth: state.auth,
        pathname: state.router.location.pathname,
        search: state.router.location.search,
        hash,
        course_id,
        mission_group_id,
        // data: state.course.courseList,
        // loading: state.course.loading,
        // error: state.course.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setSiderbarDataSource: (dataSource) => dispatch(setSiderbarDataSource(dataSource)),
        push: (path) => dispatch(replace(path))
    }
}
export default connect(mapStateToProp, mapDispatchToProps)(CourseInstanceContainer);