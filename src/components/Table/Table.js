import { Table as AntdTable } from "antd";
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
                <AntdTable {...this.props} />
            </div>
        );
    }
}
export default Table;