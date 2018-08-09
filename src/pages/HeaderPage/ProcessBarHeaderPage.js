import React from 'react';
import { Tooltip, Progress, Card } from 'antd';
import Moment from 'moment';
class TimeRender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: null,
        }
    }
    onTimerChange = () => {
        let duration_to_start = Moment.duration(Moment() - Moment(this.props.start_time));
        let duration_to_end = Moment.duration(Moment(this.props.end_time) - Moment());
        let elapsed_time_hour = `${parseInt(duration_to_start.asHours())}`;
        let elapsed_time_minute = `${parseInt(duration_to_start.asMinutes())%60}`;
        let elapsed_time_second = `${parseInt(duration_to_start.asSeconds()%60)}`;
        let remain_time_hour = `${parseInt(duration_to_end.asHours())}`;
        let remain_time_minute = `${parseInt(duration_to_end.asMinutes()%60)}`;
        let remain_time_second = `${parseInt(duration_to_end.asSeconds()%60)}`;
        let elapsed_time = `${elapsed_time_hour.length<2?("0"+elapsed_time_hour):elapsed_time_hour}:${elapsed_time_minute.length<2?("0"+elapsed_time_minute):elapsed_time_minute}:${elapsed_time_second.length<2?("0"+elapsed_time_second):elapsed_time_second}`;
        let remain_time = `${remain_time_hour.length<2?("0"+remain_time_hour):remain_time_hour}:${remain_time_minute.length<2?("0"+remain_time_minute):remain_time_minute}:${remain_time_second.length<2?("0"+remain_time_second):remain_time_second}`;
        this.setState({
            elapsed_time: elapsed_time,
            remain_time: remain_time
        });
    }
    componentDidMount() {
        this.state = {
            timer: setInterval(this.onTimerChange, 1000)
        }
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    normalize_time_format(time) {
        let new_time_str = time.split(':');
        let res = "";
        let cnt = 0;
        for (let c of new_time_str) {
            if (c.length < 2) {
                new_time_str[cnt] = "0" + c;
            } else {
                new_time_str[cnt] = c;
            }
            cnt++;
        }
        return new_time_str.reduce((prev, next) => prev + ":" + next);
    }
    render() {
        let is_running = false;
        let innnerText = "";
        let {elapsed_time, remain_time} = this.state;
        if (!elapsed_time || !remain_time) {
            innnerText = "正在加载";
        }
        else if (elapsed_time.includes("-")) { 
            //未开始
            innnerText = "距离开始还有" + this.normalize_time_format(elapsed_time.replace(/-/g, ''))  ;
            
        } else if (remain_time.includes("-")) {
            //已结束
            innnerText = "已结束";
        } else {
            is_running = true;
            //正在进行
        }
        return (
            
            is_running?(
                <div id="datetime-info">
                    <span>进行时间: {elapsed_time}</span>
                    <span>剩余时间: {remain_time}</span>
                </div>
                ):(
                <div id="datetime-info-unrunning">
                    <span>{innnerText}</span>
                </div>
                )
        );
    }
}
export default class ProcessBarHeaderPage extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <div id="processbar-header-block">
            <Card id="introduction">{this.props.introduction?this.props.introduction:"暂无通告"}</Card>
            <Card id="processbar">
                <div id="banner">
                {this.props.caption}
                </div> 
                <div id="datetime-info">
                    <span>开始时间: {Moment(this.props.start_time).format('lll')}</span>
                    <span>结束时间: {Moment(this.props.end_time).format('lll')}</span>
                </div>
                <Tooltip title="3 done / 3 in progress / 4 to do">
                    <Progress percent={100} successPercent={30} showInfo={false}  status="active" />
                </Tooltip>
                <TimeRender start_time={this.props.start_time} end_time={this.props.end_time}/>
            </Card>
        </div>
        )
    }
};