import { department as _config } from '../config/service/index';
import { getRequest, postRequest } from './_helper';

class AppointmentService {
  static getAllAppointments(fromDate, toDate) {
    const request = getRequest(
      _config.baseUrl,
      `/admin/appointment/get?from=${fromDate}&to=${toDate}`,
      true,
    );
    return fetch(request);
  }
  static getAppointment(appointmentId) {
    const request = getRequest(_config.baseUrl, `/admin/appointment/get/${appointmentId}`, true);
    return fetch(request);
  }
  static addAppointment(data) {
    const request = postRequest(_config.baseUrl, '/admin/appointment/create', data);
    return fetch(request);
  }
  static editAppointment(data) {
    const request = postRequest(_config.baseUrl, '/admin/appointment/edit', data);
    return fetch(request);
  }
  static cancelAppointment(data) {
    const request = postRequest(_config.baseUrl, '/admin/appointment/cancel', data);
    return fetch(request);
  }
}

export default AppointmentService;
