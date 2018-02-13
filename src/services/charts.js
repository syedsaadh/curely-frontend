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
  static updateClinicalNotes(data) {
    const request = postRequest(_config.baseUrl, '/admin/appointment/clinicalnotes/update', data);
    return fetch(request);
  }
  static deleteClinicalNotes(appointmentId) {
    const request = getRequest(
      _config.baseUrl,
      `/admin/appointment/clinicalnotes/delete/${appointmentId}`,
      true,
    );
    return fetch(request);
  }
  static updatePrescriptions(data) {
    const request = postRequest(_config.baseUrl, '/admin/appointment/prescriptions/update', data);
    return fetch(request);
  }
  static deletePrescriptions(appointmentId) {
    const request = getRequest(
      _config.baseUrl,
      `/admin/appointment/prescriptions/delete/${appointmentId}`,
      true,
    );
    return fetch(request);
  }
  static updateLabOrders(data) {
    const request = postRequest(_config.baseUrl, '/admin/appointment/laborders/update', data);
    return fetch(request);
  }
  static deleteLabOrders(appointmentId) {
    const request = getRequest(
      _config.baseUrl,
      `/admin/appointment/laborders/delete/${appointmentId}`,
      true,
    );
    return fetch(request);
  }
  static updateTreatmentPlans(data) {
    const request = postRequest(_config.baseUrl, '/admin/appointment/treatmentplans/update', data);
    return fetch(request);
  }
  static deleteTreatmentPlans(appointmentId) {
    const request = getRequest(
      _config.baseUrl,
      `/admin/appointment/treatmentplans/delete/${appointmentId}`,
      true,
    );
    return fetch(request);
  }
  static updateCompletedProcedures(data) {
    const request = postRequest(
      _config.baseUrl,
      '/admin/appointment/completedprocedures/update',
      data,
    );
    return fetch(request);
  }
  static deleteCompletedProcedures(appointmentId) {
    const request = getRequest(
      _config.baseUrl,
      `/admin/appointment/completedprocedures/delete/${appointmentId}`,
      true,
    );
    return fetch(request);
  }
}

export default ChartsService;
