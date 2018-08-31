import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Button } from 'antd';
import DescriptionList from '../../../components/DescriptionList';

const { Description } = DescriptionList;

@connect(state => ({
  employee: state.employee
}))

export default class EmployeeId extends React.PureComponent{
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.dispatch({
      type: 'employee/fetchOne',
      payload:{ id }
    })
  }
  render() {
    const id = this.props.match.params.id
    const { employee } = this.props.employee;
    return(
      <Card bordered={false}>
        <DescriptionList size="large" title="员工详情" style={{ marginBottom: 32 }}>
          <Description term="姓名">{employee.name}</Description>
          <Description term="工号">{employee.work_id}</Description>
          <Description term="部门">{employee.department}</Description>
          <Description term="业务线">{employee.min_department}</Description>
          <Description term="职位">{employee.position}</Description>
          <Description term="人员分类">{employee.type}</Description>
          <Description term="性别">{employee.gender}</Description>
          <Description term="身份证号码">{employee.id_card}</Description>
          <Description term="招行卡号">{employee.bank}</Description>
          <Description term="员工状态">{employee.status}</Description>
          <Description term="出生年月">{employee.birthday}</Description>
          <Description term="年龄">{employee.age}</Description>
          <Description term="民族">{employee.ethnic}</Description>
          <Description term="入职时间">{employee.in_time}</Description>
          <Description term="合同到期时间">{employee.end_date_of_contract}</Description>
          <Description term="文化程度">{employee.education}</Description>
          <Description term="毕业时间">{employee.graduation_time}</Description>
          <Description term="毕业学校">{employee.graduation_school}</Description>
          <Description term="专业">{employee.professional}</Description>
          <Description term="政治面貌">{employee.polotocal_landscape}</Description>
          <Description term="婚育情况">{employee.marital_status}</Description>
          <Description term="试用期结束日期">{employee.end_date_of_probation_period}</Description>
          <Description term="公积金编号">{employee.fund_id}</Description>
          <Description term="苏州市社保编号">{employee.security_id}</Description>
          <Description term="参保计划">{employee.security_plan}</Description>
          <Description term="社保缴费基数">{employee.security_base}</Description>
          <Description term="试用期工资">{employee.probation_wage}</Description>
          <Description term="正式月底薪">{employee.official_monthly_base_salary}</Description>
          <Description term="正式月绩效">{employee.official_monthly_performance}</Description>
          <Description term="季度奖金">{employee.quarterly_bonus}</Description>
          <Description term="户籍地址">{employee.household_registration_address}</Description>
          <Description term="现居住地址">{employee.current_registration_address}</Description>
          <Description term="联系方式">{employee.contact_information}</Description>
          <Description term="身份证结束日期">{employee.end_date_of_id_card}</Description>
          <Description term="初次就业时间">{employee.time_of_first_employment}</Description>
          <Description term="工作年限">{employee.length_of_work}</Description>
          <Description term="司龄">{employee.length_of_company}</Description>
          <Description term="公司背景">{employee.company_background}</Description>
          <Description term="备注">{employee.comment}</Description>
        </DescriptionList>
        <Button type="primary" onClick={() => {
          router.push(`/employee/edit/${id}`);
        }}>编辑员工</Button>
      </Card>
    )
  }
}
