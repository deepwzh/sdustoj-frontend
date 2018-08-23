import React from 'react';
import Table from "./LessonTable";
import { message, Button } from 'antd';
import memoize from "memoize-one";
import { ROLE } from '../../utils/config';

class LessonPage extends React.Component {
    constructor(props) {
        super(props);
        this.hide = null;
    }
    // componentDidUpdate(prevProps, prevState) {
    //     if (!prevProps.loading && this.props.loading) {
    //         this.showLoadingTip();
    //     }
    //     if (prevProps.loading && !this.props.loading) {
    //         this.closeLoadingTip();
    //     }
    //     if (!prevProps.error && this.props.error) {
    //         message.error('发生错误');
    //     }
    // }
    // showLoadingTip = () => {
    //     this.hide = message.loading('正在加载', 0);
    //     // setTimeout(hide, 2500);
    // }
    // closeLoadingTip = () => {
    //     message.destroy()
    // }

    render() {
        // this.showLoadingTip();
        return (
            <Table {...this.props} title={this.props.auth.role === ROLE.TEACHER?"我教授的课程": "我学习的课程"} data={this.props.data} error={this.props.error} loading={this.props.loading} />
        );
    }
}
export default LessonPage;