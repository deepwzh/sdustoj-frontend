import React from 'react';
import { connect } from 'react-redux';
import AnnounmentListPage from '../../pages/MainPage';
import { API, getAPIUrl } from '../../utils/config';
import { infoRequest } from '../../utils/message';
import AnnounmentInstancePage from '../../pages/MainPage/AnnouncementInstancePage'
class MainPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            announcement_data_list: [],
            announcement_id: 1,
        }
    }
    componentDidMount() {
        this.listAnnouncement();
    }
    listAnnouncement = infoRequest({
        loading_text: '正在加载公告',
        callback: (data) => {
            this.setState({
                announcement_data_list: data
            })
        }
        // success_text: '删除成功'
    })(() => {
        const url = getAPIUrl(API.ANNOUNCEMENT_LIST);
        const config = {
            method: 'get',
        }
        return fetch(url, config);
    })
    retrieveAnnouncement = infoRequest({
        loading_text: "正在获取公告",
        callback: (data) => {
            this.setState({
                announcement_data_instance: data
            })
        }
    })((id) => {
        const url = getAPIUrl(API.ANNOUNCEMENT_INSTANCE(id));
        const config = {
            method: 'get'
        }
        return fetch(url, config);
    })
    createAnnouncement = infoRequest({
        success_text: "创建公告成功",
        loading_text: "正在创建公告"
    })((data) => {
        const url = getAPIUrl(API.ANNOUNCEMENT_LIST);
        const config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        return fetch(url, config);
    })
    deleteAnnouncement = infoRequest({
        loading_text: "正在删除公告",
        success_text: "删除公告成功",
    })((id) => {
        const url = getAPIUrl(API.ANNOUNCEMENT_INSTANCE(id));
        const config = {
            method: 'delete'
        }
        return fetch(url, config);
    })
    updateAnnouncement = infoRequest({
        loading_text: "正在更新公告",
        success_text: "更新公告成功"
    })((id, data) => {
        console.log(data);
        const url = getAPIUrl(API.ANNOUNCEMENT_INSTANCE(id));
        const config = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };
        return fetch(url, config);
    })
    render() {
        if (this.props.pathname.startsWith("/board/")) {
            return ( <AnnounmentInstancePage
                id={this.props.id}
                create_mode={this.props.id == "new" ? true: false}
                update={this.updateAnnouncement}
                create={this.createAnnouncement}
                retrieve={this.retrieveAnnouncement}
            // dataSource={this.state.announcement_data_list}            
            />);
        } else {
            return (
                <AnnounmentListPage
                    // id={this.state.announcement_id}
                    list={this.listAnnouncement}
                />
                
            )
        }
    }
}
const stateToProps = (state, ownProps) => {
    let { id } = ownProps.match.params;
    return {
        id: id,
        pathname: state.router.location.pathname,
    }
}
export default connect(stateToProps)(MainPageContainer);