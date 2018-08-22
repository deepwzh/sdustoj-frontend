import React from "react";
/**
 * @note Page 原名 LessDetailPage 位于"../../pages/CourseInstancePage"下
 */
import Page from "../../pages/CourseInstancePage";
import { connect } from 'react-redux';
import { getAPIUrl, API, ROLE, PERMISSION_TABLE, PERMISSION, has_permission, RESOURCE} from "../../utils/config";
import { setSiderbarDataSource } from '../../actions';
import CourseStudentPage from '../../pages/CourseInstancePage/CourseStudentPage';
import { push, replace } from "connected-react-router";
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
            key: '4',
            title: '课程详细信息',
            target: ''
        },{
            key: '100',
            title: '正在进行的任务',
            target: '#running'
        },{
            key: "0",
            title: "任务组",
            target: "",
            childrens: []
        } ],
    }
    componentDidMount() {
        this.props.setSiderbarDataSource(this.props.siderbar);
        this.get_mission_student(this.props.course_id);
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
        let new_hash = newProps.hash;
        let old_hash = this.props.hash;
        if (new_hash === old_hash) return;
        if (new_hash.startsWith("#running")) {
            this.get_running_mission(newProps.course_id);
        } else if (new_hash.startsWith("#mission_group")) {
            let mission_group_id = new_hash.split('/')[1];
            if (mission_group_id === 'new') {
                //保持原有的mission_group_id
            } else {
                this.get_mission(mission_group_id);
                this.setState({
                    mission_group_id:mission_group_id
                })
            }
        }
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
                {
                    key: '1',
                    title: '教师',
                    target: `teacher`,
                },{
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

    get_mission_group = (course_id) => {
        let url = getAPIUrl(API.MISSION_GROUP_LIST(course_id));
        fetch(url, {
            method: 'get',
            credentials: 'include'    
        }).then(res => res.json())
        .then((v)=> {
            let childrens = [];
            if(has_permission(RESOURCE.MISSION_GROUP, PERMISSION.CREATE)){
                childrens.push({
                    key: "new",
                    title: "新建任务组",
                    target: `#mission_group/new`
                });
            }
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
        });
    }
    get_instance = (course_id) => {
        let url = getAPIUrl(API.COURSE_INSTANCE(course_id));
        fetch(url, {
            method: 'get',
            credentials: 'include'  
        }).then(res => res.json()).then((res)=> this.setState({introduction: res.introduction, caption: res.caption}));
    }
    get_mission = (mission_group_id) =>{
        let url = getAPIUrl(API.MISSION_LIST(mission_group_id));
        fetch(url, {
            method: 'get',
            credentials: 'include'    
        }).then(res => res.json()).then((res)=> this.setState({mission_data: res.results}));
    }
    get_running_mission = (mission_group_id) => {
        let url = getAPIUrl(API.RUNNING_MISSION_LIST(mission_group_id));
        fetch(url, {
            method: 'get',
            credentials: 'include'    
        }).then(res => res.json()).then((res)=> this.setState({mission_data: res.results}));
    }
    get_mission_student = (course_id) => {
        let url = getAPIUrl(API.MISSION_STUDENT_LIST(course_id));
        let option = {
          method: 'get',
          mode:'cors',
          headers: {
            // 'X-CSRFTOKEN': token,
            "Content-Type": "application/json" 
          },
          credentials:'include',
        };
        // Post a fake request
        return fetch(url, option)
          .then((response) => {
              if(response.status >= 200 && response.status < 300) {
                response.json().then((data) => {
                    this.setState({
                        studentData: data.results
                    })
                })
              } else if (response.status >= 400 && response.status < 500){
                alert("客户端错误");
                // throw {message: "认证失败！"};
                // return Promise.reject(false);
              } else if (response.status >= 500 ){
                  alert("服务器端错误");
                // throw {message: "服务器错误！"};
                // // return Promise.reject(false);
              }
          })
        .catch((err) => alert(err));
    }
    add_mission_student = (course_id, data) => {
        let url = getAPIUrl(API.MISSION_STUDENT_LIST(course_id));
        let option = {
          method: 'post',
          mode:'cors',
          headers: {
            // 'X-CSRFTOKEN': token,
            "Content-Type": "application/json" 
          },
          credentials:'include',
          body: data,
        };
        // Post a fake request
        return fetch(url, option)
          .then((response) => {
              if(response.status >= 201 && response.status < 300) {
                // localStorage.sessionid = response.token;
                alert("添加成功");
              } else if (response.status >= 400 && response.status < 500){
                alert("客户端错误");
                // throw {message: "认证失败！"};
                // return Promise.reject(false);
              } else if (response.status >= 500 ){
                  alert("服务器端错误");
                // throw {message: "服务器错误！"};
                // // return Promise.reject(false);
              }
          })
        .catch((err) => alert(err));
    }
    delete_mission_student = (course_id, id) => {
        let url = getAPIUrl(API.MISSION_STUDENT_INSTANCE(course_id, id));
        fetch(url, {
            method: 'delete',
            credentials: 'include'    
        }).then(response => {
            if(response.status >= 200 && response.status < 300) {
            alert("删除成功");
          } else if (response.status >= 400 && response.status < 500){
            alert("客户端错误");
          } else if (response.status >= 500 ){
              alert("服务器端错误");
          }
        }).catch((err) => alert(err));
    }
    deleteMission = (mission_group_id, mission_id) => {
        let url = getAPIUrl(API.DELETE_MISSION_INSTANCE(mission_group_id, mission_id));
        fetch(url, {
            method: 'delete',
            credentials: 'include'    
        }).then(response => {
            if(response.status >= 201 && response.status < 300) {
            alert("删除成功");
          } else if (response.status >= 400 && response.status < 500){
            alert("客户端错误");
          } else if (response.status >= 500 ){
              alert("服务器端错误");
          }
        }).catch((err) => alert(err));
    }
    updateMission = (data, mission_group_id, mission_id) => {
        let url = getAPIUrl(API.UPDATE_MISSION_INSTANCE(mission_group_id, mission_id));
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            // credentials: 'include',
            body: data
        }).then(response => {
            if(response.status >= 200 && response.status < 300) {
            alert("更新成功");
          } else if (response.status >= 400 && response.status < 500){
            alert("客户端错误");
          } else if (response.status >= 500 ){
              alert("服务器端错误");
          }
        }).catch((err) => alert(err));
    }
    getMissionInstance = (mission_id) => {
        let url = getAPIUrl(API.MISSION_INSTANCE(mission_id));
        return fetch(url, {
            method: 'get',
            // credentials: 'include'  
        }).then(res => res.json());
    }
    createMission = (data, mission_group_id) => {
        let url = getAPIUrl(API.CREATE_MISSION_INSTANCE(mission_group_id));
        let option = {
          method: 'post',
          mode:'cors',
          headers: {
            // 'X-CSRFTOKEN': token,
            "Content-Type": "application/json" 
          },
          credentials:'include',
          body: data,
        };
        // Post a fake request
        return fetch(url, option)
          .then((response) => {
              if(response.status >= 201 && response.status < 300) {
                // localStorage.sessionid = response.token;
                alert("添加成功");
              } else if (response.status >= 400 && response.status < 500){
                alert("客户端错误");
                // throw {message: "认证失败！"};
                // return Promise.reject(false);
              } else if (response.status >= 500 ){
                  alert("服务器端错误");
                // throw {message: "服务器错误！"};
                // // return Promise.reject(false);
              }
          })
        .catch((err) => alert(err));
    }
    createMissionGroup = (data, course_id) => {
        let url = getAPIUrl(API.MISSION_GROUP_LIST(course_id));
        fetch(url, {
            methd: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if(response.status >= 200 && response.status < 300) {
            // localStorage.sessionid = response.token;
            alert("添加成功");
          } else if (response.status >= 400 && response.status < 500){
            alert("客户端错误");
            // throw {message: "认证失败！"};
            // return Promise.reject(false);
          } else if (response.status >= 500 ){
              alert("服务器端错误");
            // throw {message: "服务器错误！"};
            // // return Promise.reject(false);
          }
        }
        );
    }
    render() {
        let {hash} = this.props;
        if (hash.startsWith("#student")) {
            return <CourseStudentPage
                data={this.state.studentData}
                introduction={this.state.introduction}
                caption={this.state.caption}
                createMissionStudent={(data) => this.add_mission_student(this.props.course_id, data)}
                retrieveMissionStudent={() => this.get_mission_student(this.props.course_id)}
                deleteMissionStudent={(id) => this.delete_mission_student(this.props.course_id, id)}
                />
        }
        return (
            <Page {...this.props} 
            createMissionGroup={this.createMissionGroup}
            createMission ={this.createMission}
            deleteMission = {this.deleteMission}
            updateMission={this.updateMission}
            getMissionInstance={this.getMissionInstance}
            mission_group_id={this.state.mission_group_id}
             introduction={this.state.introduction}
             caption={this.state.caption}
             data={this.state.mission_data} 
             />
        );
    }
}
const mapStateToProp = (state, ownProps) => {
    let { course_id, mission_group_id} = ownProps.match.params;
    console.log(ownProps.match.params);
    return {
        auth: state.auth,
        pathname: state.router.location.pathname,
        search: state.router.location.search,
        hash: state.router.location.hash,
        course_id,
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