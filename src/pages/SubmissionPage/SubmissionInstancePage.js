import React from 'react';
import { Modal, Button } from 'antd';
import SubmissionDetail from '../StatusPage/CodeDisplay';

class App extends React.Component {
  state = {
    loading: false,
    visible: false,
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <Modal
          visible={this.props.visible}
          title="提交记录"
          width={800}
          onOk={this.props.handleOk}
          onCancel={this.props.onClose}
        //   footer={[
        //     <Button key="back" onClick={this.handleCancel}>Return</Button>,
        //     <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
        //       关闭
        //     </Button>
        //   ]}
        >
        <SubmissionDetail 
            dataSource={this.props.data}
            code={this.props.code}
        />
        </Modal>
      </div>
    );
  }
}
export default App;