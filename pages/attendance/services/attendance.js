import request from '../../../utils/request';

export async function query(params) {
  return request(`/api/attendances?name=${params.name || ''}&month=${params.month || ''}&status=${params.status || ''}`);
}

export async function info(params) {
  return request(`/api/attendance/${params.id}?month=${params.month}`)
}

export async function change(params) {
  return request(`/api/attendance/change_status/${params.id}`)
}

export async function changeData(params) {
  return request(`/api/attendance/change_data/${params.id}?business_trip=${params.business_trip}&business_out=${params.business_out}&vacation=${params.vacation}`)
}

export async function exportData(params) {
  return request(`/api/attendance/export?month=${params.month || ''}`)
}
