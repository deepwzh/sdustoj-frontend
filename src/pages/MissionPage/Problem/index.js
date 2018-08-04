/**
 * @description 模仿 problem
 * 包括一个可点击列表(单选框？？)和一个题目页
 */
import {Radio, Card, Link} from 'antd';
import React from 'react';
import {withRouter} from 'react-router-dom';
import ProblemPage from './ProblemPage';

/** TODO:
 * @description 根据题目id生成相应单选项
 * @param problemIDs 所有题目id
 * @returns 一个单选项数组
 */
let RButton = Radio.Button; 
let createRBItems = (problemIDs) => {
    let res = problemIDs.map(
        (val) => {return <RButton value = {val}>{val}</RButton>}
    );

    console.log(res);
    return res;
}

/** TODO:
 * @description 首先我需要来自上层的所有题目id 即 this.props.problemIDs 这是一个数组
 * 另外 和一个 mission_id 。。。 好吧，先假设它有吧。 emmm
 */
class Problems extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            mission_id : 2,
            problem_id : 1
        };
        
    }

    onChange = (e)=>
        {
            this.setState({problem_id : e.target.value});
        };


    render() {
        const radio = (
        <Radio.Group defaultValue = {this.props.problemIDs[0]} onSelect = {this.onChange}>
           {createRBItems(this.props.problemIDs)} 
        </Radio.Group> );
        return (
            <div>
                <Card> {radio} </Card>
                <ProblemPage mission_id = {this.state.mission_id} problem_id = {this.state.problem_id}/>
            </div>
        );
        
    }
}

export default withRouter(Problems);
