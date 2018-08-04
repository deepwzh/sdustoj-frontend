import {Table} from 'antd'
import React from 'react'


class DefaultTable extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            
        };
    }

    addSorter(columns)
    {
        let newColumns = columns.map((obj) => {
            return Object.assign({}, obj, {sorter : (a, b) => (a[obj.dataIndex] < b[obj.dataIndex])})
        });
        return newColumns;
    }

    render()
    {

    }
}