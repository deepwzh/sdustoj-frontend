import React from 'react';
import ReactMarkDown from 'react-markdown';
import SimpleMDE from 'react-simplemde-editor';
import "simplemde/dist/simplemde.min.css";
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
class AnnouncementInstancePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.create_mode?'create':'retrieve', // ['retrieve', 'update', 'create']
            content: null,
            pulish_time: null,
            owner: null,
            title: null,
        };
    }
    componentDidMount() {
        // if (!this.props.id) return;
        // console.log(this.state.mode);
        if (this.state.mode == "retrieve") {
            this.getContent();
        }
        // }
    }
    componentWillReceiveProps(newProps) {
        // console.log("Hello World");
        // if (newProps.create_mode) {
        //     this.changeMode("create");
        //     // this.setState({
        //     //     mode: 'create'
        //     // })
        // } else {
        //     this.changeMode("retrieve");
        // }
    }
    getContent = () => {
        this.props.retrieve(this.props.id).then((data) => {
            this.setState({
                // mode:'retrieve',
                pulish_time: data.pulish_time,
                owner: data.owner,
                title: data.title,
                content: data.content
            })
        });
    }
    handleChange = (value) => {
        this.setState({
            content: value
        })
    }
    changeMode = (mode) => {
        console.log(mode);
        if (mode == "update") {
            this.setState({
                form_title: this.state.title,
                mode: "update"
            })
        } else if (mode == "retrieve") {
            this.getContent();
            this.setState({
                mode: "retrieve"
            })
        } else if (mode == "create") {
            this.setState({
                mode: "create"
            })
        }
    }
    render() {
        const { id } = this.props; 
        const { title, content, owner, pulish_time} = this.state;
        if (this.state.mode == "retrieve") {
            return (
                <div>
                    <h2>
                        {title}
                    </h2>
                    <div>
                        {owner} 于 { pulish_time} 发表 <span><a onClick={() => {
                            this.changeMode("update");
                        }} href="javascript:;">编辑</a></span>
                        {/* Ir1d 于 2018-08-11 16:51:38 发表，2018-08-29 9:06:54 最后更新 */}
                    </div>
                    <div>
                            <ReactMarkDown source={content} />
                        {/* 与此同时， OI Wiki 源于社区，提倡知识自由，在未来也绝不会商业化，将始终保持独立自由的性质。 */}
                    </div>
                </div>
                // <div style={{margin:"50px", zIndex:11111111}}>
                //     <SimpleMDE
                //       onChange={this.handleChange}
                //     />
                // </div>
            );
        } else if (this.state.mode == "update") {
            return (
                <div  style={{zIndex:11111111}}>
                    <h2>
                        <input 
                            onChange={(e) => {
                                this.setState({
                                    form_title: e.target.value
                                })
                            }}
                            value={this.state.form_title}></input>
                    </h2>
                    <div>
                        <span><a onClick={() => {
                            this.props.update(id, {
                                content: this.state.content,
                                title: this.state.form_title,
                            }).then(() => {
                                this.changeMode("retrieve")
                            });
                        }} href="javascript:;">保存</a></span>
                        {/* Ir1d 于 2018-08-11 16:51:38 发表，2018-08-29 9:06:54 最后更新 */}
                    </div>
                    <div>
                     <SimpleMDE
                        value={this.state.content}
                        onChange={this.handleChange}
                    />
                    </div>
                </div>
            );
        } else if (this.state.mode == "create") {
            return (
                <div  style={{zIndex:11111111}}>
                    <h2>
                        <input 
                            onChange={(e) => {
                                this.setState({
                                    form_title: e.target.value
                                })
                            }}
                            value={this.state.form_title}></input>
                    </h2>
                    <div>
                        <span><a onClick={() => {
                            this.props.create({
                                content: this.state.content,
                                title: this.state.form_title,
                            }).then(() => {
                                this.props.push("/");
                            });
                        }} href="javascript:;">保存</a></span>
                    </div>
                    <div>
                     <SimpleMDE
                        value={this.state.content}
                        onChange={this.handleChange}
                    />
                    </div>
                </div>
            );
        }
    }
}
const dispatchToProps = (dispatch) => {
    return {
        push: (v) => dispatch(push(v))
    };
}
export default connect(null, dispatchToProps)(AnnouncementInstancePage);