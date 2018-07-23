import React from 'react';
import {Card} from 'antd';
class ProblemInfoPage extends React.Component {
    render() {
        let {limit, number_test_data} = this.props.data;
        // console.log(limit);
        if (limit) {
            limit = limit[0];
        } else {
            limit = {};
        }
        // info_data = {
        //     limit: [ {
        //         env: 'gcc',
        //         length_limit: '',
        //         memory_limit: '',
        //         time_limit: ''
        //     }
        //     ],
        //     number_test_data: '',
        // };

        return (
            <Card title="编程限制">
                <div>编程环境：{limit.env_name}</div>
                <div>长度限制：{limit.length_limit}</div>
                <div>时间限制：{limit.time_limit}</div>
                <div>内存限制：{limit.memory_limit}</div>
                <div>数据组数：{number_test_data}</div>
            </Card>
        );
    }
}
export default ProblemInfoPage;