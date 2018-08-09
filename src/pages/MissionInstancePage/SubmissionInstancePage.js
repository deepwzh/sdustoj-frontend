import React from 'react';
import Page from "../../pages/SubmissionPage";
import { ProcessBarHeaderPage } from '../HeaderPage';
export default class extends React.Component{
    render() {
        return (
            <div>
                <ProcessBarHeaderPage {...this.props}/>
                <Page {...this.props}/>
            </div>
        );
    }
};