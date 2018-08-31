import React from "react";
import Link from 'umi/link';
import moment from 'moment';
import { connect } from 'dva';
import { Card, Table, Form, Input, Select, Row, Col, DatePicker } from 'antd';

const { Option } = Select;
const { MonthPicker } = DatePicker;
@Form.create()
@connect(state => ({
  attendance: state.attendance
}))
export default class AttendanceList extends React.Component {
  state = {
    name: '',
    month: '',
    status: ''
  }
  componentDidMount() {
    // const { name, month, status } = this.state;
    this.props.dispatch({
      type: 'attendance/fetch',
      payload: {}
    })
  }
  changeName = (e) => {
    const { month, status } = this.state;
    const name = e.target.value;
    this.setState({
      name: name
    })
    this.props.dispatch({
      type: 'attendance/fetch',
      payload: { name, month, status }
    })
  }
  changeMonth = (date, dateString) => {
    const { name, status } = this.state;
    const month = dateString;
    this.setState({
      month: month
    })
    this.props.dispatch({
      type: 'attendance/fetch',
      payload: { name, month, status }
    })
  }
  changeStatus = (e) => {
    const { name, month } = this.state;
    const status = e;
    this.setState({
      status
    })
    this.props.dispatch({
      type: 'attendance/fetch',
      payload: { name, month, status }
    })
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 }
    };
    const { attendances } = this.props.attendance;
    const { name, month, status} = this.state;
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    }, {
      title: '月份',
      dataIndex: 'month',
      key: 'month',
      align: 'center'
    }, {
      title: '应上班时间',
      dataIndex: 'should_work',
      key: 'should_work',
      align: 'center'
    }, {
      title: '实际上班时间',
      dataIndex: 'actual_hours',
      key: 'actual_hours',
      align: 'center'
    }, {
      title: '月度总请假时间',
      dataIndex: 'vacation_hours',
      key: 'vacation_hours',
      align: 'center'
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (text, record) => {
        if(text === '正常') {
          return(
            <span> {text} </span>
          )
        } else {
          return(
            <span style={{color: 'red'}}> {text} </span>
          )
        }
      }
    }, {
      title: '异常次数',
      dataIndex: 'times',
      key: 'times',
      align: 'center'
    }, {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (text, record) => {
        return(
          <Link to={`/attendance/show/${record.id}?month=${record.month}`}> 查看</Link>
        )
      }
    }];
    return(
      <Card title="员工考勤列表">
        <Form>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="姓名">
                <Input value={name} onChange={this.changeName}/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="月份">
                <MonthPicker value={month ? moment(month) : null} onChange={this.changeMonth} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item {...formItemLayout} label="状态">
                <Select
                  allowClear={true}
                  value={status}
                  onChange={this.changeStatus}
                >
                  <Option value="正常">正常</Option>
                  <Option value="异常">异常</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table
          rowKey={ row => row.name + row.month }
          dataSource={attendances}
          columns={columns}
        />
      </Card>
    )
  }
}
