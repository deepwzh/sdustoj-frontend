import React from 'react';
import { Card } from 'antd';
export default class HeaderPage extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <div id="header-block">
            <Card id="introduction">{this.props.introduction?
                this.props.introduction.split("\n").map((item) => (<p>{item}</p>))
                :"暂无通告"}</Card>
            <Card id="banner">{this.props.caption}</Card>
        </div>
        )
    }
};