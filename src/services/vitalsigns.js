import { vitalsigns as _config } from '../config/service/index';
import { getRequest, postRequest } from './_helper';

class VitalSignsService {
  static getAllVitalSigns() {
    const request = getRequest(_config.baseUrl, '/admin/vitalsigns/all', true);
    return fetch(request);
  }
  static addVitalSign(data) {
    const request = postRequest(_config.baseUrl, '/admin/vitalsigns/create', data);
    return fetch(request);
  }
  static editVitalSign(data) {
    const request = postRequest(_config.baseUrl, '/admin/vitalsigns/edit', data);
    return fetch(request);
  }
  static deleteVitalSign(id) {
    const request = getRequest(_config.baseUrl, `/admin/vitalsigns/delete/${id}`, true);
    return fetch(request);
  }
}

export default VitalSignsService;
