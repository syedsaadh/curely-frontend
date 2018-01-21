import { department as _config } from '../config/service/index';
import { getRequest, postRequest } from './_helper';

class DepartmentService {
  static getAllDepartment() {
    const request = getRequest(_config.baseUrl, '/admin/departments/all', true);
    return fetch(request);
  }
  static getDepartmentWithDoctors() {
    const request = getRequest(_config.baseUrl, '/admin/departments/all?with=doctor', true);
    return fetch(request);
  }
  static addDepartment(data) {
    const request = postRequest(_config.baseUrl, '/admin/departments/create', data);
    return fetch(request);
  }
  static editDepartment(data) {
    const request = postRequest(_config.baseUrl, '/admin/departments/edit', data);
    return fetch(request);
  }
  static deleteDepartment(id) {
    const request = getRequest(_config.baseUrl, `/admin/departments/delete/${id}`, true);
    return fetch(request);
  }
}

export default DepartmentService;
