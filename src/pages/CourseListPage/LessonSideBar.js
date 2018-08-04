import React from 'react';
import './mission-sidebar.css';
import {Menu} from 'antd';
import {withRouter} from 'react-router-dom';

class LessonSideBar extends React.Component {
    constructor(props) {
        super(props);
    }
   
    onClick = (e) => {
        this.props.onSideBarChange(e.key);
    }

    onSelect = ({ item, key, selectedKeys }) => {
        const { match, location, history } = this.props
        if (selectedKeys[0] == 1) {
            this.props.history.push('/');
        } else if (selectedKeys[0] == 2) {
            this.props.history.push('/lesson');
        } else if (selectedKeys[0] == 4) {
            this.props.history.push('/status');
        }
    }

    render() {
        const Item = Menu.Item;
        return (
            <div >
                <Menu onClick = {this.onClick}>
                    <Item key = '1'>课程信息</Item>
                    <Item key = '2'>作业</Item>
                    <Item key = '3'>实验</Item>
                    <Item key = '4'>考试</Item>
                    <Item key = '5'>其他</Item> 
                </Menu>
            </div>
        );
    }
}
export default withRouter(LessonSideBar);

