import React from 'react';
import ProblemDetailPage from './ProblemDetailPage';
import ProblemInfoPage from './ProblemInfoPage';
import { withRouter } from "react-router-dom";
import Editor from './Editor';
import Cookie from 'js-cookie';
import NavMenu from './NavMenu';
import './index.css';
/**
 * @description 首先要声明的是，这一部分不太明白怎么做，暂时给出一种解决方案。如下：
 * 上层传递一个mission_id 和一个 problem_id 这样，我们就可以找到对应的题目
 */
class ProblemPage extends React.Component {
    get_problem_info = () => {
        let url = 
            `http://www.92ac.cn:8008/JudgeOnline/api/missions/${this.props.mission_id}/problems/${this.props.problem_id}/`;
        fetch(url, {
            method: 'get',
            credentials: 'include'
        }).then((response) => response.json()).then((res) => {console.log(res),this.setState({problem_data: res, id: res.id, problem_id: res.problem.id})});
    }
    constructor(props) {
        super(props);
        this.state = {
            problem_id: null,
            problem_data: null,
            id: null
        }
    }
    componentDidMount() {
        this.get_problem_info();      
    }
    get_token = () => 
        new Promise((resolve, reject) => {
            fetch('http://www.92ac.cn:8008/JudgeOnline/api/csrf_token/',{
                method:'get',
                mode:'cors',
                credentials:'include'
            }).then(
                (response) => response.json()
            )
            .then(
                (value)=> resolve(value.token)
            ).catch(
                (err) => reject(err)
            );
        })
  
    submit = (code) => {
        //TODO:这里environment设置了初始值
        let data = {
            problem: this.state.problem_id,
            environment: 2,
            code: {
                code:code
            }
        };
        let url = `http://www.92ac.cn:8008/JudgeOnline/api/missions/${this.props.mission_id}/submissions/`;
        this.get_token().then((token) => {
            console.log(JSON.stringify(data) );
            fetch(url, {
                method:'post',
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFTOKEN": token
                },
                mode:'cors',
                credentials:'include',
                body: JSON.stringify(data) 
            }).then((response) => console.log(response.status));
        }); 
    }
    render() {
        
        let {problem_data} = this.state;
        // console.log(problem_data);
        let detail_data = {};
        let info_data = {};
        if (problem_data) {
            let problem = problem_data.problem;
            detail_data= {
                title: problem.title,
                description: problem.description,
                sample: problem.sample,
                source: problem.source
            }
            let limit = [];
            problem.limit.map((item, key) => {
                limit.push({
                    env_name: item.env_name,
                    length_limit: item.length_limit,
                    memory_limit: item.memory_limit,
                    time_limit: item.time_limit,
                });
            });
            info_data = {
                limit: limit,
                number_test_data: problem.number_test_data
            };
        }

        return (
            <div id="problem-container">
                <div id="problem-detail-container">
                    <ProblemDetailPage data={detail_data}/>
                    <Editor submit={this.submit}/>
                </div>
                <div id="problem-info-container">
                    <NavMenu/>
                    <ProblemInfoPage data={info_data}/>
                </div>
            </div>           
        );
    }

}

export default withRouter(ProblemPage);



/*
class ProblemPage extends React.Component {
    get_problem_info = () => {
        let {match} = this.props;
        let url = 
            `http://www.92ac.cn:8008/JudgeOnline/api/missions/${match.params.mission_id}/problems/${match.params.problem_id}/`;
        fetch(url, {
            method: 'get',
            credentials: 'include'
        }).then((response) => response.json()).then((res) => {console.log(res),this.setState({problem_data: res, id: res.id, problem_id: res.problem.id})});
    }
    constructor(props) {
        super(props);
        this.state = {
            problem_id: null,
            problem_data: null,
            id: null
        }
    }
    componentDidMount() {
        this.get_problem_info();      
    }
    get_token = () => 
        new Promise((resolve, reject) => {
            fetch('http://www.92ac.cn:8008/JudgeOnline/api/csrf_token/',{
                method:'get',
                mode:'cors',
                credentials:'include'
            }).then(
                (response) => response.json()
            )
            .then(
                (value)=> resolve(value.token)
            ).catch(
                (err) => reject(err)
            );
        })
  
    submit = (code) => {
        //TODO:这里environment设置了初始值
        let {match} = this.props;
        let data = {
            problem: this.state.problem_id,
            environment: 2,
            code: {
                code:code
            }
        };
        let url = `http://www.92ac.cn:8008/JudgeOnline/api/missions/${match.params.mission_id}/submissions/`;
        this.get_token().then((token) => {
            console.log(JSON.stringify(data) );
            fetch(url, {
                method:'post',
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFTOKEN": token
                },
                mode:'cors',
                credentials:'include',
                body: JSON.stringify(data) 
            }).then((response) => console.log(response.status));
        }); 
    }
    render() {
        
        let {problem_data} = this.state;
        // console.log(problem_data);
        let detail_data = {};
        let info_data = {};
        if (problem_data) {
            let problem = problem_data.problem;
            detail_data= {
                title: problem.title,
                description: problem.description,
                sample: problem.sample,
                source: problem.source
            }
            let limit = [];
            problem.limit.map((item, key) => {
                limit.push({
                    env_name: item.env_name,
                    length_limit: item.length_limit,
                    memory_limit: item.memory_limit,
                    time_limit: item.time_limit,
                });
            });
            info_data = {
                limit: limit,
                number_test_data: problem.number_test_data
            };
        }

        return (
            <div id="problem-container">
                <div id="problem-detail-container">
                    <ProblemDetailPage data={detail_data}/>
                    <Editor submit={this.submit}/>
                </div>
                <div id="problem-info-container">
                    <NavMenu/>
                    <ProblemInfoPage data={info_data}/>
                </div>
            </div>           
        );
    }
}
export default withRouter(ProblemPage);
*/