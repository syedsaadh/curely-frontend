import { practicestaff as _config } from '../config/service/index';
import { getRequest, postRequest } from './_helper';

class ProceduresService {
  static getAllStaffs() {
    const request = getRequest(_config.baseUrl, '/admin/users/all', true);
    return fetch(request);
  }
  static getAllDoctors() {
    const request = getRequest(_config.baseUrl, '/admin/users/doctors', true);
    return fetch(request);
  }
  static addStaff(data) {
    const request = postRequest(_config.baseUrl, '/admin/users/createStaff', data);
    return fetch(request);
  }
  static editStaff(data) {
    const request = postRequest(_config.baseUrl, '/admin/users/editStaff', data);
    return fetch(request);
  }
  static deleteStaff(id) {
    const request = getRequest(_config.baseUrl, `/admin/users/delete/${id}`, true);
    return fetch(request);
  }
}

export default ProceduresService;
