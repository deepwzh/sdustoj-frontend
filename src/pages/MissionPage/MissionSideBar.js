import React from 'react';
import './mission-sidebar.css';
// TODO:

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
        }

    render() {
        const data = this.props.problemsData;
        
        let content = null;
        
        
////////////////////////////////warning
        switch(1) {
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
                {content}
            </Card>
        );
    }
}

export default MissionContentPage;
