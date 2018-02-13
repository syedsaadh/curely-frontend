import { charts as _config } from '../config/service/index';
import { getRequest, postRequest } from './_helper';

class ChartsService {
  static updateVitalSigns(data) {
    const request = postRequest(_config.baseUrl, '/admin/appointment/vitalsigns/update', data);
    return fetch(request);
  }
  static deleteVitalSigns(appointmentId) {
    const request = getRequest(
      _config.baseUrl,
      `/admin/appointment/vitalsigns/delete/${appointmentId}`,
      true,
    );
    return fetch(request);
  }
}

export default ChartsService;
