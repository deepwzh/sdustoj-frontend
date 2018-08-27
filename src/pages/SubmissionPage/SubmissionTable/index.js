import React from "react";
import {Table, Button, Select, Input, Tag, Card} from 'antd';

/**
 * @description 一个小选择器，目的是为了提供提交结果的搜索。
 * 我们将提供以下四个选项：｛ProblemID，User，Language，Result｝
 */
export class Selector extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    options = function(data)
    {
        const Option = Select.Option;
        let result = data.map((val, index) =>{ return (<Option value = {index - 1}>{val}</Option>); })
        return result;
    }

    render()
    {
        let { problem, environment, status } = this.props.dataSource;
        const Option = Select.Option;
        return (
            <div id = "selector">
                <Select style={{ width: 120 }} defaultValue = ''  onChange = {this.props.onChange.onProblemIDChange} value = {this.props.value.problemID}>
                  <Select.Option value=''>全部</Select.Option>
                  {problem.map((item) => (
                      <Select.Option value={item.value}>{item.title}</Select.Option>
                  ))}
                </Select>
                <Input placeholder = "User" onChange = {this.props.onChange.onUserIDChange} value = {this.props.value.userID}  />
                
                <p value = "Language:"  />
                <div >
                <Select style={{ width: 120 }} defaultValue = "All"  onSelect = {this.props.onChange.onLanguageChange}>
                  <Select.Option value=''>全部</Select.Option>
                  {
                    environment.map((item) => (
                      <Select.Option value={item.value}>{item.title}</Select.Option>
                    ))
                  
                  }
                    {/* {this.options(languageType)} */}
                </Select>
                </div>
                <p value = "Result:" />
                <div>
                <Select style={{ width: 240 }} defaultValue ='' onSelect = {this.props.onChange.onResultChange}>
                  <Select.Option value=''>全部</Select.Option>
                    {
                      status.map((item) => (
                        <Select.Option value={item.value}>{item.title}</Select.Option>
                      ))
                    
                    }
                </Select>
                </div>
                <Button type="primary" onClick = {this.props.onFlush} >更新</Button>
            </div>
        );
        
    }


}