/**
 * @description 我需要来自上层组件的环境限制和一个选择函数，
 * 以此来确定选中的是哪一个环境。关于 环境限制，这里把整个limit全部传递过来
 * @time 18-08-20
 */

import React from 'react';
import MonacoEditor from '../../components/MonacoEditor';
import { Select, Card } from 'antd';
import { Button } from 'antd';
import Operation from 'antd/lib/transfer/operation';

const env2Language = {
  'gcc': 'C',
  'g++': 'C++',
};








const Option = Select.Option;
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// type your code...',
      
    }
  }

  onChange = (newValue, e) =>{
    //TODO: 可能用这种方法会有性能问题？
      this.setState({code:newValue});
    // console.log('onChange', newValue, e);
    }
    
  render() {
    const code = this.state.code;
    const options = {
    //   selectOnLineNumbers: true
    };
    
    let optionsOfEnv = [];
    for(let key in this.props.envs)
    {
      let language = env2Language[this.props.envs[key]];
      optionsOfEnv.push(
        <Option value = {key}>{language}</Option>
      );
    }
    

    return (
      <Card style = {{backgroundColor : '#ffd'}}>
          <div>
            <span>Language:</span>
            <Select defaultValue="C" style={{ width: 120 }} onChange={this.props.onChange}>
                {optionsOfEnv}
            </Select>
          </div>
          <MonacoEditor
            width="100%"
            height="600"
            language={this.props.language}
            theme="vs-light"
            value={code}
            options={options}
            onChange={this.onChange}
            // editorDidMount={this.editorDidMount}
          />
          <Button type="primary" onClick={() => {
            this.props.submit(this.state.code);
            }
          }>提交</Button>
      </Card>
    );
  }
}
export default Editor;