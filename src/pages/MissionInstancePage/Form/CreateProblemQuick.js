import React from 'react';
import { Select } from 'antd';
import { Button } from 'antd';
import { connect } from 'tls';

const Option = Select.Option;

const children = [];
// for (let i = 10; i < 36; i++) {
//   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
// }
class CreateProblemQuick extends React.Component {
    state = {
        selected_value: undefined
    }
    handleChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            selected_value: value
        })
    }
    onSubmit = () => {
        const val = this.state.selected_value;
        if (val) {
            val.forEach(
                (problem_id) => this.props.onCreate({ problem: problem_id})
            );
        }
        this.setState({
            selected_value: []
        })
        this.props.onClose();
    }
    render() {
        return (
            <div style={{width:"100%"}}>
                <Select
                    mode="tags"
                    style={{width: "200px"}}
                    // style={{ width: '10  0%' }}
                    onChange={this.handleChange}
                    value={this.state.selected_value}
                    tokenSeparators={[',']}
                >
                    {children}
                </Select>
                <Button type="primary" onClick={this.onSubmit}>添加</Button>
                <Button type="dashed" onClick={() => {
                    var url = "/problemset/" + this.props.mission_id;
                    var win = window.open(url, '_blank');
                    win.focus();
                }} >浏览题库</Button>
                {/* <Link to></Link> */}
                {/* <Button type="primary" onClick={this.onSubmit}></Button> */}
            </div>
        );
    }
}
// const mapDispatchToProps = (dispatch) => {
//     return dispatch;
// }
export default CreateProblemQuick;