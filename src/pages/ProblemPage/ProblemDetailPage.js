import React from 'react';
import { Card } from 'antd';
import ReactMarkDown from 'react-markdown';
class ProblemDetailPage extends React.Component {
    render() {
        let {title, description, sample, source} = this.props.data;
        return (
            <Card>
                <h1>{title}</h1>
                <div>
                    <div>
                        <h3>描述</h3>
                        <p>{description}</p>
                    </div>
                    <div>
                        <h3>样例</h3>
                        <ReactMarkDown source={sample}/>
                    </div>
                    <div>
                        <h3>来源</h3>
                        <p>
                            {source}
                        </p>
                    </div>
                </div>
            </Card>
        );
    }
}
export default ProblemDetailPage;