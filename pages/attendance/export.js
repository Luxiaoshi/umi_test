import React from "react";
import { connect } from 'dva';
import moment from 'moment';
import { Card, Button, DatePicker } from 'antd'

const { MonthPicker } = DatePicker;

@connect(state => ({
  attendance: state.attendance
}))
export default class AttendanceExport extends React.Component {
  state = {
    month: ''
  }
  handleChange = (m, month) => {
    this.setState({
      month: month
    })
  }
  exData = () => {
    const { month } = this.state;
    window.open(`/api/attendance/export?month=${month}`, "_blank")
  }
  render() {
    const { month } = this.state;
    return(
      <Card title="导出考勤表">
        <MonthPicker value={month ? moment(month) : null} onChange={this.handleChange}/>
        <p></p>
        <Button type="primary" onClick={this.exData}> 导出</Button>
      </Card>
    )
  }
}
