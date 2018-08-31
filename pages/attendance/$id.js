import React from "react";
import { connect } from 'dva';
import { Card, Table, notification, Popconfirm, Divider, Modal, Form, Input } from 'antd';

@connect(state => ({
  attendance: state.attendance
}))
@Form.create()
export default class AttendanceDetail extends React.Component {
  state = {
    modal: false,
    current: {
      business_trip: 0,
      business_out: 0,
      vacation: 0,
      record_id: ''
    }
  }
  componentDidMount() {
    this.getData()
  }
  getData = () => {
    const id = this.props.match.params.id;
    const month = this.props.location.query.month;
    this.props.dispatch({
      type: 'attendance/personal',
      payload: {id, month}
    })
  }
  changeStatus = (record) => {
    const id = record.id;
    this.props.dispatch({
      type: 'attendance/change_status',
      payload: { id },
      callback: (res) => {
        if(res === 'success'){
          this.getData()
          notification['success']({
            message: '消除异常成功',
            description: '',
          });
        } else {
          notification['error']({
            message: '消除异常失败',
            description: '',
          });
        }
      }
    })
  }
  handleChange = (record) => {
    this.setState({
      modal: true,
      current: {
        business_trip: record.business_trip,
        business_out: record.business_out,
        vacation: record.vacation,
        record_id: record.id
      }
    })
  }
  confirmChange = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.id = this.state.current.record_id;
        this.props.dispatch({
          type: `attendance/change_data`,
          payload: { values },
          callback: (res) =>{
            if(res === 'success'){
              this.getData()
              notification['success']({
                message: '修改成功',
                description: '',
              });
              this.setState({
                modal: false,
              });
            } else {
              notification['error']({
                message: '修改失败',
                description: '',
              });
            }
          }
        });
      }
    });
  }
  handleCancel = () => {
    this.setState({
      modal: false
    })
  }
  render() {
    const { personal_attendances } = this.props.attendance;
    const { modal, current } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    }, {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
    }, {
      title: '时间',
      dataIndex: 'work_detail',
      key: 'work_detail',
      align: 'center',
    }, {
      title: '出差',
      dataIndex: 'business_trip',
      key: 'business_trip',
      align: 'center',
    }, {
      title: '办公',
      dataIndex: 'business_out',
      key: 'business_out',
      align: 'center',
    }, {
      title: '请假',
      dataIndex: 'vacation',
      key: 'vacation',
      align: 'center',
    }, {
      title: '备注',
      dataIndex: 'comment',
      key: 'comment',
      align: 'center',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (text, record) => {
        if(text === -1) {
          return(
            <span style={{color: 'red'}}> 异常 </span>
          )
        } else {
          return(
            <span> 正常 </span>
          )
        }
      }
    }, {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (text, record) => {
        if(record.status === 0){
          return(
            <span>
              <span> 消除异常</span>
              <Divider type="vertical" />
              <a onClick={(e) => this.handleChange(record)}>修改</a>
            </span>
          )
        } else {
          return(
            <span>
              <Popconfirm title="你确定要为此条记录消除异常吗?" onConfirm={(e) => this.changeStatus(record)} okText="确定" cancelText="取消">
                <a> 消除异常</a>
              </Popconfirm>
              <Divider type="vertical" />
              <a onClick={(e) => this.handleChange(record)}>修改</a>
            </span>
          )
        }
      }
    }];
    return(
      <Card title="员工考勤详情">
        <Table
          rowKey={ row => row.name + row.date }
          dataSource={personal_attendances}
          columns={columns}
        />
        <Modal
          visible={modal}
          onOk={this.confirmChange}
          onCancel={this.handleCancel}
        >
          <Form layout="vertical">
            <Form.Item label='出差(小时)'>
              {getFieldDecorator('business_trip', {
                initialValue: current.business_trip,
                rules: [{ required: true, message: '请输入出差时长' }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label='外出(小时)'>
              {getFieldDecorator('business_out', {
                initialValue: current.business_out,
                rules: [{ required: true, message: '请输入外出时长' }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label='请假(小时)'>
              {getFieldDecorator('vacation', {
                initialValue: current.vacation,
                rules: [{ required: true, message: '请输入请假时长' }],
              })(
                <Input />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    )
  }
}
