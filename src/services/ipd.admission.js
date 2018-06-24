import { ipd as _config } from '../config/service/index';
import { getRequest, postRequest } from './_helper';

class IPDAdmissionService {
  static getAllAdmissions(fromDate, toDate) {
    const request = getRequest(
      _config.baseUrl,
      `/admin/ipd/get?from=${fromDate}&to=${toDate}`,
      true,
    );
    return fetch(request);
  }
  static getVisit(id) {
    const request = getRequest(_config.baseUrl, `/admin/ipd/visit/get/${id}`, true);
    return fetch(request);
  }
  static getAdmission(ipdAdmissionId) {
    const request = getRequest(_config.baseUrl, `/admin/ipd/get/${ipdAdmissionId}`, true);
    return fetch(request);
  }
  static getAdmittedPatientsByDept(deptId) {
    const request = getRequest(_config.baseUrl, `/admin/ipd/admitted/${deptId}`, true);
    return fetch(request);
  }

  static getAvailableBeds(deptId) {
    const request = getRequest(_config.baseUrl, `/admin/ipd/getAvailableBeds/${deptId}`, true);
    return fetch(request);
  }
  static addAdmission(data) {
    const request = postRequest(_config.baseUrl, '/admin/ipd/create', data);
    return fetch(request);
  }
  static editAdmission(data) {
    const request = postRequest(_config.baseUrl, '/admin/ipd/edit', data);
    return fetch(request);
  }
  static cancelAdmission(data) {
    const request = postRequest(_config.baseUrl, '/admin/ipd/delete', data);
    return fetch(request);
  }
  static dischargeAdmission(data) {
    const request = postRequest(_config.baseUrl, '/admin/ipd/discharge', data);
    return fetch(request);
  }
}

export default IPDAdmissionService;
