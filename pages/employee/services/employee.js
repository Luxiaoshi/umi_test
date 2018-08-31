import request from '../../../utils/request';

export async function query(params) {
  return request(`/api/employees?name=${params.name || ''}&work_id=${params.work_id || ''}&start=${params.start || ''}&end=${params.end || ''}`)
}

export async function info(params) {
  return request(`/api/employee/${params.id}`)
}

export async function addEmployee(params) {
  return request('/api/employees/add', {
    method: 'POST',
    body: JSON.stringify(params)
  });
}

export async function updateEmployee(params) {
  return request('/api/employees/update', {
    method: 'POST',
    body: JSON.stringify(params)
  });
}
