import React from "react";
import Page from "../../pages/MissionInstancePage";
import SubmissionPage from "../../pages/SubmissionPage";
import ProblemInstancePage from "../../pages/MissionInstancePage/ProblemInstancePage";
import SubmissionInstancePage from "../../pages/MissionInstancePage/SubmissionInstancePage";
import { connect } from 'react-redux';
import { getAPIUrl, API, ROLE, PERMISSION_TABLE, PERMISSION} from "../../utils/config";
import { setSiderbarDataSource } from '../../actions';
class MissionInstanceContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problem_data: [],
            submission: [],
            last_mission_group_id: 0,
            last_hash: '',
            problem_detail_data: null,
            available_problem_data: null,
            problem_prev_data: null,
        }
    }
    static defaultProps = {
        siderbar : [{
            key:"0",
            title: "概览",
            target: "#overview"
        },{
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
        }]
    }
    componentDidMount() {
        this.props.setSiderbarDataSource(this.props.siderbar);
        this.get_instance(this.props.mission_id);
        this.get_problem(this.props.mission_id);
        // alert("Hello World");
        // this.fetchCourseList();
    }
    delete_mission_problem = (mission_id, problem_id) => {
        let url = getAPIUrl(API.DELETE_MISSION_PROBLEM_INSTANCE(mission_id, problem_id));
        let option = {
            method: 'delete',
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
                if(response.status >= 201 && response.status < 300) {
                  // localStorage.sessionid = response.token;
                  alert("删除成功");
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
    create_mission_problem = (mission_id, problem_id) => {
        let url = getAPIUrl(API.CREATE_MISSION_PROBLEM_INSTANCE(mission_id));
        let option = {
            method: 'post',
            mode:'cors',
            headers: {
              // 'X-CSRFTOKEN': token,
              "Content-Type": "application/json" 
            },
            credentials:'include',
            body: JSON.stringify({'problem': problem_id}),
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
    update_mission_problem = (mission_id, problem_id, data) => {
        let url = getAPIUrl(API.PROBLEM_INSTANCE(mission_id, problem_id));
        let option = {
            method: 'put',
            mode:'cors',
            headers: {
              // 'X-CSRFTOKEN': token,
              "Content-Type": "application/json" 
            },
            credentials:'include',
            body: JSON.stringify(data),
          };
          // Post a fake request
          return fetch(url, option)
            .then((response) => {
                if(response.status >= 200 && response.status < 300) {
                  // localStorage.sessionid = response.token;
                  alert("修改成功");
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
     * 获取提交列表
     * @param mission_id 任务ID
     */
    get_submission_list = (mission_id) => {
        let url = getAPIUrl(API.SUBMISSION_LIST(mission_id));
        fetch(url, {
            method: 'get',
            mode:'cors',
            credentials: 'include',
            headers: {  
                // "X-CSRFTOKEN": Cookie.get('csrftoken')             
            }
        }).then((response) => response.json()).then((data) => this.setState({data: data.results}))
    }
    get_available_problem = (mission_id) => {
        let url = getAPIUrl(API.AVAILABLE_PROBLEM(mission_id));
        fetch(url, {
            method: 'get',
            credentials: 'include'  
        }).then(res => res.json()).then((res)=> this.setState({available_problem_data: res.results}));
    }
    /**
     * 获取指定id的题目信息
     */
    get_problem_instance = (mission_id, problem_id) => {
        let url = getAPIUrl(API.PROBLEM_INSTANCE(mission_id, problem_id));
        fetch(url, {
            method: 'get',
            credentials: 'include'  
        }).then(res => res.json()).then((res)=> this.setState({problem_detail_data: res}));
    }
    get_problem = (mission_id) => {
        let url = getAPIUrl(API.PROBLEM_LIST(mission_id));
        fetch(url, {
            method: 'get',
            credentials: 'include'    
        }).then(res => res.json())
        .then((v)=> {
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
            this.props.siderbar[1].childrens = childrens;
            this.props.setSiderbarDataSource([...this.props.siderbar]);
        });
    }
    get_instance = (mission_id) => {
        let url = getAPIUrl(API.MISSION_INSTANCE(mission_id));
        fetch(url, {
            method: 'get',
            credentials: 'include'  
        }).then(res => res.json()).then((res)=> this.setState({introduction: res.introduction, caption: res.caption, start_time: res.start_time, end_time: res.end_time}));
    }
    get_mission = (mission_group_id) =>{
        let url = getAPIUrl(API.MISSION_LIST(mission_group_id));
        fetch(url, {
            method: 'get',
            credentials: 'include'    
        }).then(res => res.json()).then((res)=> this.setState({mission_data: res.results}));
    }
    deleteProblem = (mission_group_id, mission_id) => {
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
    createProblem = (data, mission_group_id) => {
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
    has_permission = (object, permission) => {
        let role = this.props.auth.role;
        if (PERMISSION_TABLE[object][permission].includes(role)) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        if (this.props.mission_group_id && this.state.last_mission_group_id !== this.props.mission_group_id) {
            this.get_mission(this.props.mission_group_id);
            this.setState({
                last_mission_group_id: this.props.mission_group_id
            });
        }
        let {hash} = this.props;
        if (hash.startsWith("#problem/")) {
            let problem_id = hash.split('/')[1];
            if (this.state.last_hash !== hash) {
                this.get_problem_instance(this.props.mission_id, problem_id);
                this.setState({
                    last_hash: hash
                });
            }
            return (
                <ProblemInstancePage  {...this.props}
                introduction={this.state.introduction}
                caption={this.state.caption}
                start_time={this.state.start_time}
                end_time={this.state.end_time}
                data={this.state.problem_detail_data}
                problem_id={problem_id}
                />
            );
        } else if (hash.startsWith("#submission")) {
            // let problem_id = hash.split('/')[1];
            if (this.state.last_hash !== hash) {
                this.get_submission_list(this.props.mission_id);
                this.setState({
                    last_hash: hash
                });
            }
            return (
                <SubmissionInstancePage  {...this.props}
                introduction={this.state.introduction}
                caption={this.state.caption}
                start_time={this.state.start_time}
                end_time={this.state.end_time}
                data={this.state.data}
                get_submission_list={(mission_id) => this.get_submission_list(this.props.mission_id)}
                />
            );
        }else {
            return (
                <Page {...this.props} 
                createProblem ={this.createProblem}
                deleteProblem = {this.deleteProblem}
                has_permission = {this.has_permission}
                get_available_problem={this.get_available_problem}
                create_mission_problem={this.create_mission_problem}
                delete_mission_problem={this.delete_mission_problem}
                update_mission_problem={this.update_mission_problem}
                    introduction={this.state.introduction}
                    caption={this.state.caption}
                    start_time={this.state.start_time}
                    end_time={this.state.end_time}
                    data={this.state.problem_data}
                    available_problem_data={this.state.available_problem_data} 
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
    return {
        auth: state.auth,
        pathname: state.router.location.pathname,
        search: state.router.location.search,
        hash: state.router.location.hash,
        course_id,
        mission_group_id,
        mission_id
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