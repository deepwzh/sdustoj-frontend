import React from 'react';
import { Card } from 'antd';
import ReactMarkDown from 'react-markdown';
import { runInDebugContext } from 'vm';
class ProblemDetailPage extends React.Component {
    
    render() {
        let {title, description, sample, source} = this.props.data;
        return (
            <Card>
                <h1>{title}</h1>
                <div>
                    <Card style = {{backgroundColor : '#fee'}} hoverable = {true}>
                        {/* <h3>描述</h3> */}
                        <ReactMarkDown source={description} />
                    </Card>
                    <br/>
                    <Card style = {{backgroundColor : '#fee'}} hoverable = {true}>
                        {/* <h3>样例</h3> */}
                        <ReactMarkDown source={sample}/>
                    </Card>
                    <br/>
                    <Card style = {{backgroundColor : '#fee'}} hoverable = {true}>
                        <h3>来源</h3>
                        <p>
                            {source}
                        </p>
                    </Card>
                </div>
            </Card>
        );
    }
}
export default ProblemDetailPage;