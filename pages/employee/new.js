import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Form, Input, Col, Row, Button, notification, DatePicker } from 'antd'

@connect(state => ({
  employee: state.employee,
}))
@Form.create()

export default class EmployeeNew extends React.PureComponent {
  componentDidMount() {
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.in_time = values.in_time.format('YYYY-MM-DD')
        this.props.dispatch({
          type: 'employee/create',
          payload: values,
          callback: (res) =>{
            if(res === 'success'){
              router.push('/employee/list')
              notification['success']({
                message: '创建成功',
                description: '',
              });
            } else {
              notification['error']({
                message: '创建失败',
                description: '',
              });
            }
          }
        });
      }
    });
  }
  render() {
    const { form } = this.props;
    const params_a = [
                       [{'department': '部门'}, {'min_department': '业务线'}, {'type': '人员分类'}],
                       [{'gender': '性别'}, {'id_card': '身份证号'}, {'bank': '招行卡号'}],
                       [{'position': '职位'}, {'birthday': '出生年月'}, {'age': '年龄'}],
                       [{'ethnic': '民族'}, {'end_date_of_contract': '合同到期时间'}, {'education': '文化程度'}],
                       [{'graduation_time': '毕业时间'}, {'graduation_school': '毕业学校'}, {'professional': '专业'}],
                       [{'polotocal_landscape': '政治面貌'}, {'marital_status': '婚育情况'}, {'end_date_of_probation_period': '试用期结束日期'}],
                       [{'fund_id': '公积金编号'}, {'security_id': '苏州市社保编号'}, {'security_plan': '参保计划'}],
                       [{'security_base': '社保缴费基数'}, {'probation_wage': '试用期工资'}, {'official_monthly_base_salary': '正式月底薪'}],
                       [{'official_monthly_performance': '正式月绩效'}, {'quarterly_bonus': '季度奖金'}, {'household_registration_address': '户籍地址'}],
                       [{'current_registration_address': '现居住地址'}, {'contact_information': '联系方式'}, {'end_date_of_id_card': '身份证结束日期'}],
                       [{'time_of_first_employment': '初次就业时间'}, {'length_of_work': '工作年限'}, {'length_of_company': '司龄'}],
                       [{'company_background': '公司背景'}, {'comment': '备注'}, {'status': '员工状态'}]
                     ]
    const { getFieldDecorator } = form;
    return(
      <Card title="新建员工">
        <Form layout="vertical">
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label='姓名'>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入姓名' }],
                })(
                  <Input placeholder="请输入姓名" />
                )}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label='工号'>
                {getFieldDecorator('work_id', {
                  rules: [{ required: true, message: '请输入工号' }],
                })(
                  <Input placeholder="请输入工号" />
                )}
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item label='入职时间'>
                {getFieldDecorator('in_time', {
                  rules: [{ required: true, message: '入职时间' }],
                })(
                  <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }}/>
                )}
              </Form.Item>
            </Col>
          </Row>
          {
            params_a.map((item, i) => {
              return(
                <Row gutter={16} key={i}>
                  <Col lg={6} md={12} sm={24}>
                    <Form.Item label={Object.values(item[0])[0]}>
                      {getFieldDecorator(Object.keys(item[0])[0])(
                        <Input placeholder={"请输入"+Object.values(item[0])[0]} />
                      )}
                    </Form.Item>
                  </Col>
                  <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                    <Form.Item label={Object.values(item[1])[0]}>
                      {getFieldDecorator(Object.keys(item[1])[0])(
                        <Input placeholder={"请输入"+Object.values(item[1])[0]} />
                      )}
                    </Form.Item>
                  </Col>
                  <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                    <Form.Item label={Object.values(item[2])[0]}>
                      {getFieldDecorator(Object.keys(item[2])[0])(
                        <Input placeholder={"请输入"+Object.values(item[2])[0]} />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              )
            })
          }
          <Form.Item style={{ marginTop: 32 }}>
            <Button type="primary" onClick={this.handleSubmit}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
