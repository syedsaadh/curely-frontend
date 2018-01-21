import { department as _config } from '../config/service/index';
import { getRequest, postRequest } from './_helper';

class AppointmentService {
  static getAllAppointments() {
    const request = getRequest(_config.baseUrl, '/admin/appointments/all', true);
    return fetch(request);
  }
  static addAppointment(data) {
    const request = postRequest(_config.baseUrl, '/admin/appointments/create', data);
    return fetch(request);
  }
  static editAppointment(data) {
    const request = postRequest(_config.baseUrl, '/admin/appointments/edit', data);
    return fetch(request);
  }
  static cancelAppointment(data) {
    const request = postRequest(_config.baseUrl, '/admin/departments/cancel', data);
    return fetch(request);
  }
}

export default AppointmentService;
