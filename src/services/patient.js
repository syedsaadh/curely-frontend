import { patient as _config } from '../config/service/index';
import { getRequest, postRequest } from './_helper';

class PatientService {
  static searchPatient(q) {
    const request = getRequest(_config.baseUrl, `/admin/patients/search/${q}`, true);
    return fetch(request);
  }
  static getAllPatient() {
    const request = getRequest(_config.baseUrl, '/admin/patients/all', true);
    return fetch(request);
  }
  static getPatientById(id) {
    const request = getRequest(_config.baseUrl, `/admin/patients/get/${id}`, true);
    return fetch(request);
  }
  static addPatient(data) {
    const request = postRequest(_config.baseUrl, '/admin/patients/create', data);
    return fetch(request);
  }
  static editPatient(data) {
    const request = postRequest(_config.baseUrl, '/admin/patients/edit', data);
    return fetch(request);
  }
  static deletePatient(id) {
    const request = getRequest(_config.baseUrl, `/admin/patients/delete/${id}`, true);
    return fetch(request);
  }
}

export default PatientService;
