import React from 'react';
import Table from "./LessonTable";
class LessonPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Table data={this.props.data} error={this.props.error} loading={this.props.loading} />
            </div>
        );
    }
}
export default LessonPage;