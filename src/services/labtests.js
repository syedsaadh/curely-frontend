import { labtests as _config } from '../config/service/index';
import { getRequest, postRequest } from './_helper';

class LabTestsService {
  static getAllLabTests() {
    const request = getRequest(_config.baseUrl, '/admin/labtests/all', true);
    return fetch(request);
  }
  static addLabTest(data) {
    const request = postRequest(_config.baseUrl, '/admin/labtests/create', data);
    return fetch(request);
  }
  static editLabTest(data) {
    const request = postRequest(_config.baseUrl, '/admin/labtests/edit', data);
    return fetch(request);
  }
  static deleteLabTest(id) {
    const request = getRequest(_config.baseUrl, `/admin/labtests/delete/${id}`, true);
    return fetch(request);
  }
}

export default LabTestsService;
