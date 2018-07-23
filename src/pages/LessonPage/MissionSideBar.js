import React from 'react';
import './mission-sidebar.css';

class MissionSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'selected': 0
        }
    }
    onSelect = (key) => {
        
        this.setState({'selected': key});
        this.props.onMissionChange(key);
    }
    render() {
        let column = this.props.column;
        column = [{
            key: 0,
            title: "概览"
        }, ...column];
        return (
            <div id="mission-sidebar">
                {
                column.map((column, key) => (
                    <div 
                        key={column.key} 
                        id={`mission-sidebar-item${this.state.selected == key? '-selected': ''}`}
                        onClick={() => this.onSelect(column.key)}
                        >
                            {column.title}
                    </div>
                ))
                }
            </div>
        );
    }
}
export default MissionSideBar;