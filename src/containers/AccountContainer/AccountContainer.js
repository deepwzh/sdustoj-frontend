import React from 'react';
import { ProfilePage, ModifyPasswordPage } from '../../pages/AccountPage';
import { setSiderbarDataSource } from '../../actions';
import { connect } from 'react-redux';
import { getAPIUrl, API } from '../../utils/config';
import { infoRequest } from '../../utils/message';
class AccountContainer extends React.Component {
    state = {
        data: {}
    }
    static defaultProps = {
        siderbar : [{
            key: '0',
            title: '用户信息',
            target: '#profile'
        }, {
            key: "1",
            title: "密码修改",
            target: '#password',
        } ],
    }
    componentDidMount() {
        this.props.setSiderbarDataSource(this.props.siderbar);
    }
    getProfileData = infoRequest({
        loading_text: '正在获取个人信息',
        callback: (data) => {
            this.setState({
                data: data
            })
        }
    })(() => {
        const url = getAPIUrl(API.ACCOUNT_PROFILE);
        const config = {
            method: 'get',

        }
        return fetch(url, config);
    })
    modifyUserPassword = infoRequest({
        loading_text: '正在修改密码',
        success_text: '修改成功'
    })((data) => {
        const url = getAPIUrl(API.ACCOUNT_PASSWORD);
        const config = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        return fetch(url, config);
    })
    updateProfileData = infoRequest({
        loading_text: '正在更新个人信息',
        success_text: '更新成功'
    })((data) => {
        const url = getAPIUrl(API.ACCOUNT_PROFILE);
        const config = {
            headers: {
                "Content-Type": "application/json" 
            },
            method: 'PATCH',
            body: JSON.stringify(data)
        }
        return fetch(url, config);
    })
    render() {
        let { hash } = this.props;
        if (hash.startsWith('#password')) {
            return (
                <ModifyPasswordPage 
                    onSubmit={this.modifyUserPassword}
                />
            );
        }
        return (
            <ProfilePage 
            updateProfileData={this.updateProfileData}
            getProfileData={this.getProfileData}
            data={this.state.data}
            />
        );
    }
}
const mapStateToProp = (state, ownProps) => {
    // let { course_id, mission_group_id} = ownProps.match.params;
    // console.log(ownProps.match.params);
    return {
        auth: state.auth,
        pathname: state.router.location.pathname,
        search: state.router.location.search,
        hash: state.router.location.hash,
        // data: state.course.courseList,
        // loading: state.course.loading,
        // error: state.course.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setSiderbarDataSource: (dataSource) => dispatch(setSiderbarDataSource(dataSource))
    }
}
export default connect(mapStateToProp, mapDispatchToProps)(AccountContainer);