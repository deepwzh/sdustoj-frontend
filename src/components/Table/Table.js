import { Table as AntdTable, Spin, message } from "antd";
import React from "react";
class Table extends React.Component {
    componentWillReceiveProps(nextprops){
        // FIXME: 请求中的错误不提醒
        // if (!this.props.error && nextprops.error) {
        //     message.error(nextprops.error);
        // }
        // alert("props" + nextprops.error);
    }
    render() {
        return (
            <div>
                <Spin tip="正在加载" spinning={this.props.loading} >
                    <AntdTable dataSource={this.props.dataSource} columns={this.props.columns} />
                </Spin>
            </div>
        );
    }
}
export default Table;