import React from 'react';
import UpdateMissionForm from "./Form/UpdateMissionForm";
import { ProcessBarHeaderPage } from '../HeaderPage';
import { callbackDecorator } from '../../utils/message';
export default class extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataSource: {}
        };
    }
    componentDidMount() {
        this.fetchDatasource();
    }
    fetchDatasource = () => {
        this.props.retrieveMission(this.props.mission_id).then((dataSource) => this.setState({
            dataSource
        }));
    }
    render() {
        return (
            <div>
                {/* <ProcessBarHeaderPage {...this.props}/> */}
                <UpdateMissionForm
                    data={this.state.dataSource}
                    onUpdate={(data) => callbackDecorator(this.fetchDatasource)(this.props.updateMission)(data, this.props.mission_id)}
                {...this.props}/>
            </div>
        );
    }
};