import Editor from './Editor';
import React from 'react';
import ProblemDetailPage from './ProblemDetailPage';
// import { withRouter } from "react-router-dom";
import './index.css';

class ProblemPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problem_id: null,
            problem_data: null,
            id: null,
            dataSource: null,
            limitKey: 0     // 一方面用以判断选中了哪一个语言，另一方面，用以展示哪一个环境限制
        }
    }
    componentDidMount() {
        this.fetchDataSource();
    }
    fetchDataSource = (data) => {
        let {problem_id } = data || {};
        problem_id = problem_id || this.props.problem_id;
        // 当题目或任务没有加载好，不加载数据
        if (!problem_id || !this.props.mission_id) {  
            return; 
        }
        this.props.retrieveMissionProblem(this.props.mission_id, problem_id)
            .then((data) => {
                this.setState({dataSource: data})
                console.log("Hello World"); 
                console.log(data);
        }
        );
    }
    componentWillReceiveProps(newProps) {
        this.fetchDataSource({problem_id: newProps.problem_id});
    }

    // 提供给下层(Editor)的语言选择函数
    onLanguageChange = (value) => {
        console.log('onLanguageChange  :  ' + value)
        this.setState({limitKey : value});
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
        let {match} = this.props;
        let { dataSource } = this.state;
        let data = {
            problem: dataSource.problem.id,
            environment: dataSource.problem.limit[this.state.limitKey].environment ,
            code: {
                code:code
            }
        };
        this.props.createSubmission(data, this.props.mission_id);
    }
    render() {
        let problem_data = this.state.dataSource;
        // console.log(problem_data);
        let detail_data = {};
        let info_data = {};
        let envs = [];
        if (problem_data) {
            let problem = problem_data.problem;
            let limit = null;
            if (problem_data.problem.limit.length) {
                let limitp = problem_data.problem.limit[this.state.limitKey];
                limit = {
                    env_name: limitp.env_name,
                    length_limit: limitp.length_limit,
                    memory_limit: limitp.memory_limit,
                    time_limit: limitp.time_limit,
                }
            };

            for(let key in problem_data.problem.limit){
                envs.push(problem_data.problem.limit[key].env_name);
            }

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
                    {!this.props.disableEditor?
                        <Editor 
                            submit={this.submit}
                            envs = {envs}
                            onChange = {this.onLanguageChange}
                            language = {this.state.language}/>
                    
                    : null}
                </div>
                {/* <div id="problem-info-container">
                    <NavMenu/>
                    <ProblemInfoPage data={info_data}/>
                </div> */}
            </div>           
        );
    }
}

/**
 * @description 关于问题页的设计。我们需要将 Editor 选择的语言项 传递给当前组件，
 * 以此让 ProblemDetailPage 显示 不同的 时间空间限制
 * @time 18-08-20
 */


export default ProblemPage;