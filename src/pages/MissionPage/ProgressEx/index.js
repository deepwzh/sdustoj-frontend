/**TODO:
 * @description 一个模仿的进度条
 * 根据分析，我至少需要一个开始时间和一个结束时间
 * 一个问题：必须跟服务器时间同步（所以还需要一个服务器时间）
 * @warning 注意 因为不知道如何获取服务器当前时间，所以先用本地时间代替
 * 暂时就想到这些
 */

import {Process, Card} from 'antd';
import React from 'react';

let getDate = ()=>
{
    return new Date();
}



class ProcessEx extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            missionState : this.props.missionState,
            time : 0,         // 或者距开始时间的倒计时 或者距结束时间的倒计时 
            timer : null
        };
    }

    componentDidMount()
    {

        if(this.props.missionState == 'undefined')
        {

        }
        this.state.time = 200;
        this.state.timer = setInterval(()=>{
            
        }, 1000);
    }

    componentWillUnmount()
    {
        if(this.state.timer != null)
        {
            
        }
    }

    



    getStatusBar = ()=> {
        let statusBar = null;
        if(this.state.missionState == 'Scheduled') {
            statusBar = <p>Start CountDown: {this.state.time}</p>;
        }   else if(this.state.missionState == 'Running')   {

        }   else if(this.state.missionState == 'Ended')   {

        }   else {

        }
        return statusBar;
    }

    render() {
        const title = (
            <div>
                <p>start time : {this.props.startTime}</p>
                <h1>{title}</h1>
                <p>end time : {this.props.endTime}</p>
            </div>
        );
        
        
    }

}



export default ProcessEx;