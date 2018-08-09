import React from 'react';
import ProblemDetailPage from './ProblemDetailPage';
import { withRouter } from "react-router-dom";
import Editor from './Editor';
import Cookie from 'js-cookie';
import NavMenu from './NavMenu';
import './index.css';

class ProblemPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problem_id: null,
            problem_data: null,
            id: null
        }
    }
    componentDidMount() {
        
    }
    get_token = () => 
        new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:80/JudgeOnline/api/csrf_token/',{
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
        let url = `http://127.0.0.1:80/JudgeOnline/api/missions/${this.props.mission_id}/submissions/`;
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
        
        let problem_data = this.props.data;
        // console.log(problem_data);
        let detail_data = {};
        let info_data = {};
        if (problem_data) {
            let problem = problem_data.problem;
            let limit = [];
            problem.limit.map((item, key) => {
                limit.push({
                    env_name: item.env_name,
                    length_limit: item.length_limit,
                    memory_limit: item.memory_limit,
                    time_limit: item.time_limit,
                });
            });
            detail_data= {
                title: problem.title,
                description: problem.description,
                sample: problem.sample,
                source: problem.source,
                limit: limit,
                number_test_data: problem.number_test_data
            }

        }

        return (
            <div id="problem-container">
                <div id="problem-detail-container">
                    <ProblemDetailPage data={detail_data}/>
                    <Editor submit={this.submit}/>
                </div>
                {/* <div id="problem-info-container">
                    <NavMenu/>
                    <ProblemInfoPage data={info_data}/>
                </div> */}
            </div>           
        );
    }
}
export default withRouter(ProblemPage);