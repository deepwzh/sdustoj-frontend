/**
 * @description 课程详细信息展示表
 * TODO:
 * @time 18-08-21 修改为表单形式，目的是为了完善提交修改课程信息操作（此权限一般为教务管理员所拥有）
 * 另外，我们好像不需要展示全部的课程信息，只展示用户关心的一部分即可。
 * 顺便，加入权限
 * 
 * 目前功能还不完善，
 */
import React from 'react';
import {Form, Card, Button, Input} from 'antd';
import { getAPIUrl, API, ROLE, PERMISSION_TABLE, PERMISSION, has_permission, RESOURCE} from "../../utils/config";
import { connect } from 'react-redux';


/**
 * @description 课程信息英文至中文的翻译映射
 */
const LessonE2CMap = {
    'meta' : '课程类别ID',
    'meta_caption' : '课程类别名称',
    'cid' : '课程ID',
    'caption' : '课程名称',
    'creator' : '课程登录人',
    'create_time' : '课程登录日期',
    'updater' : '课程信息最近更新者',
    'update_time' : '课程信息最近更新时间',
    'available' : '课程状态',
    'deleted' : '废弃',
    'introduction' : '课程介绍',
    'start_time' : '课程开始日期',
    'end_time' : '课程结束日期'
};

// { 与表单相关
const FormItem = Form.Item;
// const formItemLayout = {
//     labelCol: {
//       xs: { span: 24 },
//       sm: { span: 8 },
//     },
//     wrapperCol: {
//       xs: { span: 24 },
//       sm: { span: 16 },
//     },
//   };
const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  };

  let createFormItem = (keyword, value, isUpdate, getFieldDecorator) => {
    let content = null;
    if(isUpdate)
    {
        content = <Input placeholder = {keyword}/>;
    } else {
        content = <span>{value}</span>;
    }
  return (
    <FormItem label = {LessonE2CMap[keyword]} {...formItemLayout}>
        {
            getFieldDecorator(keyword, {initialValue: value})(content)
        }
    </FormItem>
  );
}

// }

/**
 * @description 一个简单的更新按钮
 */
class UpdateButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Button onClick = {this.props.onClick} type = {'primary'}>
                修改课程信息
            </Button>
        );
    }
}



class LessonInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data : null,
            isUpdate: false     // 用以判断修改按钮是否点击
        }

    }

    onUpdateClick = () => {
        let old = this.state.isUpdate;
        this.setState({isUpdate: !old});
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        // 目的是为了关闭编辑
        this.onUpdateClick();
    }

    componentWillMount() {
        this.get_instance(this.props.course_id);
    }

    get_instance = (course_id) => {
        let url = getAPIUrl(API.COURSE_INSTANCE(course_id));
        fetch(url, {
            method: 'get',
            credentials: 'include'  
        }).then(res => res.json()).then(res => this.setState({data : res}));
    }
    /**
     * @description 这里的dataSource处理有些慢，因为每次都需要去映射。更好的办法没发现。
     * 不过好在 this.props.data 是一个常数大小 :)
     */
    render() {
        console.log('course_data course_data course_data course_data course_data ' + this.state.data);
        const { getFieldDecorator } = this.props.form;

        let extra = null;
        if(has_permission(RESOURCE.COURSE, PERMISSION.UPDATE))
            extra = <UpdateButton onClick = {this.onUpdateClick} />
        let submitButton = null;
        if(this.state.isUpdate)
        {
            submitButton = (
                <Button type="primary" htmlType="submit" >
                    提交
                </Button>);
        }
        let formItemList = [];
        for(let key in this.state.data){
            formItemList.push(createFormItem(key, this.state.data[key], this.state.isUpdate, getFieldDecorator));
        }

        return (
            <Card title = '课程详细信息' extra = {extra}>
                <Form layout='vertical' onSubmit = {this.onSubmit}>
                    {formItemList}
                    {submitButton}
                </Form>
            </Card>
        );
    }

}

const mapStateToProp = (state, ownProps) => {
    // let { course_id, mission_group_id, mission_id } = ownProps.match.params;
    // console.log(ownProps.match.params);
    // console.log(state.router.location.hash);
    // console.log(state.router.location.search);
    // console.log(state.router.location.hash);
    return {
        auth: state.auth,
        pathname: state.router.location.pathname,
        search: state.router.location.search,
        hash: state.router.location.hash,
        // mission_group_id,
        // mission_id
        // data: state.course.courseList,
        // loading: state.course.loading,
        // error: state.course.error
    }
}

const LessonInfoForm = Form.create()(LessonInfo);

export default connect(mapStateToProp, null)(LessonInfoForm)


/**
 * 注释即是雪藏   18-08-09
 * 还会再次用到吗 18-08-21
/**
 * @description 任务信息 英文至中文的翻译映射
const MissionE2CMap = {
    'id' : '任务ID',
    'caption' : '任务名称',
    'course_meta' : '课程类别ID',
    'meta_caption' : '课程类别名称',
    'start_time' : '任务开始时间',
    'end_time' : '任务结束时间',
    'available' : '任务状态',
    'deleted' : '废弃',
    'create_time' : '任务登录日期',
    'creator' : '任务登录人',
    'update_time' : '任务信息最近更新时间',
    'updater' : '任务信息最近更新者',
    'mode' : '任务模式', //{ ??? 什么意思
    'type' : '成绩评判模式',
    'score_display' : '成绩显示',
    'submission_display' : '提交范围',
    'valid_submission' : '有效提交',    // }
};
 */