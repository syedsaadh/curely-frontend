import { ipd as _config } from '../config/service/index';
import { getRequest, postRequest } from './_helper';

class IPDChartingService {
  static getAdmissionVisits(patientId) {
    const request = getRequest(
      _config.baseUrl,
      `/admin/ipd/getAdmissionsVisits/${patientId}`,
      true,
    );
    return fetch(request);
  }
  static addVisit(data) {
    const request = postRequest(_config.baseUrl, '/admin/ipd/visit/add', data);
    return fetch(request);
  }
  static editVisit(data) {
    const request = postRequest(_config.baseUrl, '/admin/ipd/visit/edit', data);
    return fetch(request);
  }
  static updateVitalSigns(data) {
    const request = postRequest(_config.baseUrl, '/admin/ipd/vitalsigns/update', data);
    return fetch(request);
  }
  static deleteVisit(id) {
    const request = getRequest(_config.baseUrl, `/admin/ipd/visit/delete/${id}`, true);
    return fetch(request);
  }
  static deleteVitalSigns(ipdAdmissionId) {
    const request = getRequest(
      _config.baseUrl,
      `/admin/ipd/vitalsigns/delete/${ipdAdmissionId}`,
      true,
    );
    return fetch(request);
  }
  static updateClinicalNotes(data) {
    const request = postRequest(_config.baseUrl, '/admin/ipd/clinicalnotes/update', data);
    return fetch(request);
  }
  static deleteClinicalNotes(ipdAdmissionId) {
    const request = getRequest(
      _config.baseUrl,
      `/admin/ipd/clinicalnotes/delete/${ipdAdmissionId}`,
      true,
    );
    return fetch(request);
  }
  static updatePrescriptions(data) {
    const request = postRequest(_config.baseUrl, '/admin/ipd/prescriptions/update', data);
    return fetch(request);
  }
  static deletePrescriptions(ipdAdmissionId) {
    const request = getRequest(
      _config.baseUrl,
      `/admin/ipd/prescriptions/delete/${ipdAdmissionId}`,
      true,
    );
    return fetch(request);
  }
  static updateLabOrders(data) {
    const request = postRequest(_config.baseUrl, '/admin/ipd/laborders/update', data);
    return fetch(request);
  }
  static deleteLabOrders(ipdAdmissionId) {
    const request = getRequest(
      _config.baseUrl,
      `/admin/ipd/laborders/delete/${ipdAdmissionId}`,
      true,
    );
    return fetch(request);
  }
  static updateTreatmentPlans(data) {
    const request = postRequest(_config.baseUrl, '/admin/ipd/treatmentplans/update', data);
    return fetch(request);
  }
  static deleteTreatmentPlans(ipdAdmissionId) {
    const request = getRequest(
      _config.baseUrl,
      `/admin/ipd/treatmentplans/delete/${ipdAdmissionId}`,
      true,
    );
    return fetch(request);
  }
  static updateCompletedProcedures(data) {
    const request = postRequest(_config.baseUrl, '/admin/ipd/completedprocedures/update', data);
    return fetch(request);
  }
  static deleteCompletedProcedures(ipdAdmissionId) {
    const request = getRequest(
      _config.baseUrl,
      `/admin/ipd/completedprocedures/delete/${ipdAdmissionId}`,
      true,
    );
    return fetch(request);
  }
}

export default IPDChartingService;
