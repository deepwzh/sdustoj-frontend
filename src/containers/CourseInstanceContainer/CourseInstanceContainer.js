import React from "react";
import Page from "../../pages/CourseInstancePage";
import { connect } from 'react-redux';
import { getAPIUrl, API, ROLE, PERMISSION_TABLE, PERMISSION, has_permission, RESOURCE} from "../../utils/config";
import { setSiderbarDataSource } from '../../actions';
class CourseInstanceContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mission_data: [],
            submission: [],
            last_mission_group_id: 0,
        }
    }
    static defaultProps = {
        siderbar : [{
            key: "0",
            title: "任务组",
            target: "",
            childrens: []
        }],
    }
    componentDidMount() {
        this.props.setSiderbarDataSource(this.props.siderbar);
        this.get_instance(this.props.course_id);
        this.getSiderBarItems(this.props.course_id);
        // alert("Hello World");
        // this.fetchCourseList();
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
        this.get_mission_group = (course_id);
        let role = this.props.auth.role;
        // 如果对该任务组具有create权限
        if(has_permission(role, RESOURCE.MISSION_GROUP, PERMISSION.CREATE))
        {
            let otherSideBarItems = [
                {
                    key: '1',
                    title: '教师',
                    target: '/teacher',
                },{
                    key: '2',
                    title: '学生',
                    target: '/student',
                },{
                    key: '3',
                    title: '所在课程组',
                    target: '/course_group'
                }
            ];
            this.props.siderbar.push(...otherSideBarItems);
        }
        this.props.setSiderbarDataSource([...this.props.siderbar]);
    }

    get_mission_group = (course_id) => {
        let url = getAPIUrl(API.MISSION_GROUP_LIST(course_id));
        fetch(url, {
            method: 'get',
            credentials: 'include'    
        }).then(res => res.json())
        .then((v)=> {
            let childrens = [];
            v.results.map((item, key) => {
                childrens.push({
                    key: "0" + key,
                    title: item.caption,
                    target: `/course/${course_id}/mission_group/${item.id}`, 
                });
            });
            this.props.siderbar[0].childrens = childrens;
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
    render() {
        if (this.props.mission_group_id && this.state.last_mission_group_id !== this.props.mission_group_id) {
            this.get_mission(this.props.mission_group_id);
            this.setState({
                last_mission_group_id: this.props.mission_group_id
            });
        }
        return (
            <Page {...this.props} 
            createMission ={this.createMission}
            deleteMission = {this.deleteMission}
            
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
        mission_group_id
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
export default connect(mapStateToProp, mapDispatchToProps)(CourseInstanceContainer);