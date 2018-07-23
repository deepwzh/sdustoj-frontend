import React from 'react';
import MonacoEditor from './MonacoEditor';
import { Select, Card } from 'antd';
import { Button } from 'antd';

const Option = Select.Option;
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// type your code...',
      language: 'cpp'
    }
  }
//   editorDidMount(editor, monaco) {
//     console.log('editorDidMount', editor);
//     editor.focus();
//   }
  onChange = (newValue, e) =>{
    //TODO: 可能用这种方法会有性能问题？
      this.setState({code:newValue});
    // console.log('onChange', newValue, e);
    }
    handleChange = (value) => {
        this.setState({
            language: value
        })
    }

  render() {
    const code = this.state.code;
    const options = {
    //   selectOnLineNumbers: true
    };
    // console.log("render....");
    return (
      <Card>
          <div>
            <span>编译器选择</span>
            <Select defaultValue="2" style={{ width: 120 }} onChange={this.handleChange}>
                <Option value="2">gcc</Option>
                <Option value="c">C</Option>
                <Option value="javascript">JavaScript</Option>
                <Option value="java">Java</Option>
            </Select>
          </div>
          <MonacoEditor
            width="100%"
            height="600"
            language={this.state.language}
            theme="vs-light"
            value={code}
            options={options}
            onChange={this.onChange}
            // editorDidMount={this.editorDidMount}
          />
          <Button type="primary" onClick={() => {
            alert(this.state.code);
            this.props.submit(this.state.code);
            }
          }>提交</Button>
      </Card>
    );
  }
}
export default Editor;