import React from 'react';
import TableComponent from "./MissionTable";
class  MissionGroupPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {data} = this.props;
        return (
            <div>
                <TableComponent data={data} isRead = {this.props.isRead}/>
            </div>
        );
    }
}
export default MissionGroupPage;