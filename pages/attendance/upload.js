import React from "react";
import reqwest from 'reqwest';
import { connect } from 'dva';
import { Button, Card, Upload, message, Icon } from 'antd';

@connect(state => ({
}))
export default class AttendanceUpload extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  }
  componentDidMount() {
  }
  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    let test = 1;
    fileList.forEach((file) => {
      formData.append(`${test}`, file);
      test += 1;
    });

    this.setState({
      uploading: true,
    });

    // You can use any AJAX library you like
    reqwest({
      url: '/api/deal',
      method: 'post',
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success('upload successfully.');
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    });
  }

  render() {
    const { uploading } = this.state;
    const props = {
      action: '/api/deal',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };
    return(
      <Card title="上传考勤表">
        <p>考勤-休假-出差-外出</p>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
        <Button
          className="upload-demo-start"
          type="primary"
          onClick={this.handleUpload}
          disabled={this.state.fileList.length === 0}
          loading={uploading}
        >
          {uploading ? 'Uploading' : 'Start Upload' }
        </Button>
      </Card>
    )
  }
}
