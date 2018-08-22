import React from 'react';
import { ProfilePage, ModifyPasswordPage } from '../../pages/AccountPage';
import { setSiderbarDataSource } from '../../actions';
import { connect } from 'react-redux';
import { getAPIUrl, API } from '../../utils/config';
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
    getProfileData = () => {
        let url = getAPIUrl(API.ACCOUNT_PROFILE);
        fetch(url, {
            method: 'get',
            credentials: 'include'  
        }).then(res => res.json()).then((res)=> this.setState({data: res}));
    }
    modifyUserPassword = (data) => {
        let url = getAPIUrl(API.ACCOUNT_PASSWORD);
        fetch(url, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            // credentials: 'include'  
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                alert("更新成功");
            } else if(res.status >= 400 && res.status < 500) {
                alert("客户端错误");
            } else {
                alert("服务器端错误");
            }
        });
    }
    updateProfileData = (data) => {
        let url = getAPIUrl(API.ACCOUNT_PROFILE);
        fetch(url, {
            headers: {
                "Content-Type": "application/json" 
            },
            method: 'PATCH',
            body: JSON.stringify(data)
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                res.json().then((res) => this.setState({data: res}))
            } else if (res.status >= 400 && res.status < 500) {
                alert("客户端错误");
            } else if (res.status >= 500 && res.status < 600) {
                alert("服务器端错误");
            }
        });
    }
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
            onSubmit={this.updateProfileData}
            getProfileData={this.getProfileData}
            data = {this.state.data}
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