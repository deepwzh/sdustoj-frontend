import React from 'react';
import './mission-sidebar.css';
// TODO:
/*
class MissionSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'selected': 0
        }
    }
    onSelect = (key) => {
        this.setState({'selected': key});
        this.props.onMissionChange(key);
    }
    render() {
        let column = this.props.column;
        column = [{
            key: 0,
            title: "概览"
        }, {
            key:1,
            title: "题目"
        }, {
            key:2,
            title: "排名"
        }, {
            key:3,
            title: "统计"
        }];
        return (
            <div id="mission-sidebar">
                {
                column.map((column, key) => (
                    <div 
                        key={column.key} 
                        id={`mission-sidebar-item${this.state.selected == key? '-selected': ''}`}
                        onClick={() => this.onSelect(column.key)}
                        >
                            {column.title}
                    </div>
                ))
                }
            </div>
        );
    }
}
*/



// /**
//  * @description 传入标签名，生成标签选项
//  * @returns 标签项数组
//  * <TabPane tab="Tab 1" key="1">Content of tab 1</TabPane>
//  */
// createTabPanes = (tabPanes)=>{
//     let res = tabPanes.map(
//         (value, index) => {
//             return (<TabPane tab = {value} key = {index}>{value}</TabPane>);
//         }
//     );
//     return res;
// }

/***
 * @description 模仿virtual judge 的侧边栏
 * 其中的 路由 由自己手动完成，这样或许有一些加载的小问题，先暂时不管
 * 它的名字叫任务侧边栏，在这次完成后是时候给它换个名字了 :)
 * @time 2018-08-03
 */

import Overview from './Overview';
import Problems from './Problem';
//import Status from './Status';
//import Rank from './';
import {Card, Menu, a} from 'antd';

class MissionContentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route : 'null00'
        };
    }
    getInitialState() {
        return {
          route: window.location.hash.substr(1)
        }
      };
    
    componentDidMount() {
        window.addEventListener('hashchange', () => {
          this.setState({
            route: window.location.hash.substr(1)
          })
          console.log("hashChange");
        })
    };

    render() {
        const data = this.props.problemsData;
        
        let content = null;
        
        console.log("hashChange in render : " + this.state.route)

        switch(this.state.route) {
            case '/overview' : 
                content = (<Overview problemsData = {data}/>); 
                break;
            case '/problem' : 
                var problemIDs = [];
                for(let i = 0; i < data.length; ++i)
                    problemIDs.push(data[i].problem_id);
                content = (<Problems problemIDs = {problemIDs}/>); 
                break;
            default : content = (<Overview problemsData = {data}/>);
        }

        

        const Item = Menu.Item;
        return (
            <Card>
                
                    <li><a href = '#/overview'>Overview</a></li>
                    <li><a href = '#/problem'>Problem</a></li>
                    <li><a href = '#/status'>Status</a></li>
                    <li><a href = '#/rank'>Rank</a></li>
                    <li><a href = '#/other'>Other</a></li>
                
                {content}
            </Card>
        );
    }
}

export default MissionContentPage;
