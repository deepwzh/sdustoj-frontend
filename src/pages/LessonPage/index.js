import React from 'react';
import TableComponent from "./LessonTable";
class LessonPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        fetch('http://127.0.0.1:8000/JudgeOnline/api/learning-courses/', {
            method:'get',
            mode:'cors',
            credentials: "include"

        }).then(response => response.json()).then((data)=> this.setState({data: data.results}));
    }
    render() {
        return (
            <div>
                <TableComponent data={this.state.data}/>
            </div>
        );
    }
}
export default LessonPage;