import service from '../../services/charts';

import { checkStatus, checkResponseCode } from '../../utils/ApiUtils';

export const actions = {
  APPOINTMENT_VITAL_SIGNS_UPDATE_REQUEST: 'APPOINTMENT_VITAL_SIGNS_UPDATE_REQUEST',
  APPOINTMENT_VITAL_SIGNS_UPDATE_SUCCESS: 'APPOINTMENT_VITAL_SIGNS_UPDATE_SUCCESS',
  APPOINTMENT_VITAL_SIGNS_UPDATE_FAILED: 'APPOINTMENT_VITAL_SIGNS_UPDATE_FAILED',

  APPOINTMENT_VITAL_SIGNS_DELETE_REQUEST: 'APPOINTMENT_VITAL_SIGNS_DELETE_REQUEST',
  APPOINTMENT_VITAL_SIGNS_DELETE_SUCCESS: 'APPOINTMENT_VITAL_SIGNS_DELETE_SUCCESS',
  APPOINTMENT_VITAL_SIGNS_DELETE_FAILED: 'APPOINTMENT_VITAL_SIGNS_DELETE_FAILED',

  APPOINTMENT_CLINICAL_NOTES_UPDATE_REQUEST: 'APPOINTMENT_CLINICAL_NOTES_UPDATE_REQUEST',
  APPOINTMENT_CLINICAL_NOTES_UPDATE_SUCCESS: 'APPOINTMENT_CLINICAL_NOTES_UPDATE_SUCCESS',
  APPOINTMENT_CLINICAL_NOTES_UPDATE_FAILED: 'APPOINTMENT_CLINICAL_NOTES_UPDATE_FAILED',

  APPOINTMENT_CLINICAL_NOTES_DELETE_REQUEST: 'APPOINTMENT_CLINICAL_NOTES_DELETE_REQUEST',
  APPOINTMENT_CLINICAL_NOTES_DELETE_SUCCESS: 'APPOINTMENT_CLINICAL_NOTES_DELETE_SUCCESS',
  APPOINTMENT_CLINICAL_NOTES_DELETE_FAILED: 'APPOINTMENT_CLINICAL_NOTES_DELETE_FAILED',

  APPOINTMENT_PRESCRIPTIONS_UPDATE_REQUEST: 'APPOINTMENT_PRESCRIPTIONS_UPDATE_REQUEST',
  APPOINTMENT_PRESCRIPTIONS_UPDATE_SUCCESS: 'APPOINTMENT_PRESCRIPTIONS_UPDATE_SUCCESS',
  APPOINTMENT_PRESCRIPTIONS_UPDATE_FAILED: 'APPOINTMENT_PRESCRIPTIONS_UPDATE_FAILED',

  APPOINTMENT_PRESCRIPTIONS_DELETE_REQUEST: 'APPOINTMENT_PRESCRIPTIONS_DELETE_REQUEST',
  APPOINTMENT_PRESCRIPTIONS_DELETE_SUCCESS: 'APPOINTMENT_PRESCRIPTIONS_DELETE_SUCCESS',
  APPOINTMENT_PRESCRIPTIONS_DELETE_FAILED: 'APPOINTMENT_PRESCRIPTIONS_DELETE_FAILED',

  APPOINTMENT_LAB_ORDERS_UPDATE_REQUEST: 'APPOINTMENT_LAB_ORDERS_UPDATE_REQUEST',
  APPOINTMENT_LAB_ORDERS_UPDATE_SUCCESS: 'APPOINTMENT_LAB_ORDERS_UPDATE_SUCCESS',
  APPOINTMENT_LAB_ORDERS_UPDATE_FAILED: 'APPOINTMENT_LAB_ORDERS_UPDATE_FAILED',

  APPOINTMENT_LAB_ORDERS_DELETE_REQUEST: 'APPOINTMENT_LAB_ORDERS_DELETE_REQUEST',
  APPOINTMENT_LAB_ORDERS_DELETE_SUCCESS: 'APPOINTMENT_LAB_ORDERS_DELETE_SUCCESS',
  APPOINTMENT_LAB_ORDERS_DELETE_FAILED: 'APPOINTMENT_LAB_ORDERS_DELETE_FAILED',

  APPOINTMENT_TREATMENT_PLANS_UPDATE_REQUEST: 'APPOINTMENT_TREATMENT_PLANS_UPDATE_REQUEST',
  APPOINTMENT_TREATMENT_PLANS_UPDATE_SUCCESS: 'APPOINTMENT_TREATMENT_PLANS_UPDATE_SUCCESS',
  APPOINTMENT_TREATMENT_PLANS_UPDATE_FAILED: 'APPOINTMENT_TREATMENT_PLANS_UPDATE_FAILED',

  APPOINTMENT_TREATMENT_PLANS_DELETE_REQUEST: 'APPOINTMENT_TREATMENT_PLANS_DELETE_REQUEST',
  APPOINTMENT_TREATMENT_PLANS_DELETE_SUCCESS: 'APPOINTMENT_TREATMENT_PLANS_DELETE_SUCCESS',
  APPOINTMENT_TREATMENT_PLANS_DELETE_FAILED: 'APPOINTMENT_TREATMENT_PLANS_DELETE_FAILED',

  APPOINTMENT_COMPLETED_PROCEDURES_UPDATE_REQUEST: 'APPOINTMENT_COMPLETED_PROCEDURES_UPDATE_REQUEST',
  APPOINTMENT_COMPLETED_PROCEDURES_UPDATE_SUCCESS: 'APPOINTMENT_COMPLETED_PROCEDURES_UPDATE_SUCCESS',
  APPOINTMENT_COMPLETED_PROCEDURES_UPDATE_FAILED: 'APPOINTMENT_COMPLETED_PROCEDURES_UPDATE_FAILED',

  APPOINTMENT_COMPLETED_PROCEDURES_DELETE_REQUEST: 'APPOINTMENT_COMPLETED_PROCEDURES_DELETE_REQUEST',
  APPOINTMENT_COMPLETED_PROCEDURES_DELETE_SUCCESS: 'APPOINTMENT_COMPLETED_PROCEDURES_DELETE_SUCCESS',
  APPOINTMENT_COMPLETED_PROCEDURES_DELETE_FAILED: 'APPOINTMENT_COMPLETED_PROCEDURES_DELETE_FAILED',

  TOGGLE_DONE_ACTION: 'TOGGLE_DONE_ACTION',
};

export const updateVitalSignsRequest = () => ({
  type: actions.APPOINTMENT_VITAL_SIGNS_UPDATE_REQUEST,
});
export const updateVitalSignsSuccess = data => ({
  type: actions.APPOINTMENT_VITAL_SIGNS_UPDATE_SUCCESS,
  payload: data,
});
export const updateVitalSignsFailed = error => ({
  type: actions.APPOINTMENT_VITAL_SIGNS_UPDATE_FAILED,
  payload: error,
});

export const deleteVitalSignsRequest = () => ({
  type: actions.APPOINTMENT_VITAL_SIGNS_DELETE_REQUEST,
});
export const deleteVitalSignsSuccess = data => ({
  type: actions.APPOINTMENT_VITAL_SIGNS_DELETE_SUCCESS,
  payload: data,
});
export const deleteVitalSignsFailed = error => ({
  type: actions.APPOINTMENT_VITAL_SIGNS_DELETE_FAILED,
  payload: error,
});
export const updateClinicalNotesRequest = () => ({
  type: actions.APPOINTMENT_CLINICAL_NOTES_UPDATE_REQUEST,
});
export const updateClinicalNotesSuccess = data => ({
  type: actions.APPOINTMENT_CLINICAL_NOTES_UPDATE_SUCCESS,
  payload: data,
});
export const updateClinicalNotesFailed = error => ({
  type: actions.APPOINTMENT_CLINICAL_NOTES_UPDATE_FAILED,
  payload: error,
});

export const deleteClinicalNotesRequest = () => ({
  type: actions.APPOINTMENT_CLINICAL_NOTES_DELETE_REQUEST,
});
export const deleteClinicalNotesSuccess = data => ({
  type: actions.APPOINTMENT_CLINICAL_NOTES_DELETE_SUCCESS,
  payload: data,
});
export const deleteClinicalNotesFailed = error => ({
  type: actions.APPOINTMENT_CLINICAL_NOTES_DELETE_FAILED,
  payload: error,
});
export const updatePrescriptionsRequest = () => ({
  type: actions.APPOINTMENT_PRESCRIPTIONS_UPDATE_REQUEST,
});
export const updatePrescriptionsSuccess = data => ({
  type: actions.APPOINTMENT_PRESCRIPTIONS_UPDATE_SUCCESS,
  payload: data,
});
export const updatePrescriptionsFailed = error => ({
  type: actions.APPOINTMENT_PRESCRIPTIONS_UPDATE_FAILED,
  payload: error,
});

export const deletePrescriptionsRequest = () => ({
  type: actions.APPOINTMENT_PRESCRIPTIONS_DELETE_REQUEST,
});
export const deletePrescriptionsSuccess = data => ({
  type: actions.APPOINTMENT_PRESCRIPTIONS_DELETE_SUCCESS,
  payload: data,
});
export const deletePrescriptionsFailed = error => ({
  type: actions.APPOINTMENT_PRESCRIPTIONS_DELETE_FAILED,
  payload: error,
});
export const updateLabOrdersRequest = () => ({
  type: actions.APPOINTMENT_LAB_ORDERS_UPDATE_REQUEST,
});
export const updateLabOrdersSuccess = data => ({
  type: actions.APPOINTMENT_LAB_ORDERS_UPDATE_SUCCESS,
  payload: data,
});
export const updateLabOrdersFailed = error => ({
  type: actions.APPOINTMENT_LAB_ORDERS_UPDATE_FAILED,
  payload: error,
});

export const deleteLabOrdersRequest = () => ({
  type: actions.APPOINTMENT_LAB_ORDERS_DELETE_REQUEST,
});
export const deleteLabOrdersSuccess = data => ({
  type: actions.APPOINTMENT_LAB_ORDERS_DELETE_SUCCESS,
  payload: data,
});
export const deleteLabOrdersFailed = error => ({
  type: actions.APPOINTMENT_LAB_ORDERS_DELETE_FAILED,
  payload: error,
});
export const updateTreatmentPlansRequest = () => ({
  type: actions.APPOINTMENT_TREATMENT_PLANS_UPDATE_REQUEST,
});
export const updateTreatmentPlansSuccess = data => ({
  type: actions.APPOINTMENT_TREATMENT_PLANS_UPDATE_SUCCESS,
  payload: data,
});
export const updateTreatmentPlansFailed = error => ({
  type: actions.APPOINTMENT_TREATMENT_PLANS_UPDATE_FAILED,
  payload: error,
});

export const deleteTreatmentPlansRequest = () => ({
  type: actions.APPOINTMENT_TREATMENT_PLANS_DELETE_REQUEST,
});
export const deleteTreatmentPlansSuccess = data => ({
  type: actions.APPOINTMENT_TREATMENT_PLANS_DELETE_SUCCESS,
  payload: data,
});
export const deleteTreatmentPlansFailed = error => ({
  type: actions.APPOINTMENT_TREATMENT_PLANS_DELETE_FAILED,
  payload: error,
});
export const updateCompletedProceduresRequest = () => ({
  type: actions.APPOINTMENT_COMPLETED_PROCEDURES_UPDATE_REQUEST,
});
export const updateCompletedProceduresSuccess = data => ({
  type: actions.APPOINTMENT_COMPLETED_PROCEDURES_UPDATE_SUCCESS,
  payload: data,
});
export const updateCompletedProceduresFailed = error => ({
  type: actions.APPOINTMENT_COMPLETED_PROCEDURES_UPDATE_FAILED,
  payload: error,
});

export const deleteCompletedProceduresRequest = () => ({
  type: actions.APPOINTMENT_COMPLETED_PROCEDURES_DELETE_REQUEST,
});
export const deleteCompletedProceduresSuccess = data => ({
  type: actions.APPOINTMENT_COMPLETED_PROCEDURES_DELETE_SUCCESS,
  payload: data,
});
export const deleteCompletedProceduresFailed = error => ({
  type: actions.APPOINTMENT_COMPLETED_PROCEDURES_DELETE_FAILED,
  payload: error,
});
export const toggleDoneAction = () => ({
  type: actions.TOGGLE_DONE_ACTION,
});
export const updateVitalSigns = data => (dispatch) => {
  dispatch(updateVitalSignsRequest());
  service
    .updateVitalSigns(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(updateVitalSignsSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(updateVitalSignsFailed(error));
    });
};
export const deleteVitalSigns = appointmentId => (dispatch) => {
  dispatch(deleteVitalSignsRequest());
  service
    .deleteVitalSigns(appointmentId)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(deleteVitalSignsSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(deleteVitalSignsFailed(error));
    });
};
export const updateClinicalNotes = data => (dispatch) => {
  dispatch(updateClinicalNotesRequest());
  service
    .updateClinicalNotes(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(updateClinicalNotesSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(updateClinicalNotesFailed(error));
    });
};
export const deleteClinicalNotes = appointmentId => (dispatch) => {
  dispatch(deleteClinicalNotesRequest());
  service
    .deleteClinicalNotes(appointmentId)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(deleteClinicalNotesSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(deleteClinicalNotesFailed(error));
    });
};
export const updatePrescriptions = data => (dispatch) => {
  dispatch(updatePrescriptionsRequest());
  service
    .updatePrescriptions(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(updatePrescriptionsSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(updatePrescriptionsFailed(error));
    });
};
export const deletePrescriptions = appointmentId => (dispatch) => {
  dispatch(deletePrescriptionsRequest());
  service
    .deletePrescriptions(appointmentId)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(deletePrescriptionsSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(deletePrescriptionsFailed(error));
    });
};
export const updateLabOrders = data => (dispatch) => {
  dispatch(updateLabOrdersRequest());
  service
    .updateLabOrders(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(updateLabOrdersSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(updateLabOrdersFailed(error));
    });
};
export const deleteLabOrders = appointmentId => (dispatch) => {
  dispatch(deleteLabOrdersRequest());
  service
    .deleteLabOrders(appointmentId)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(deleteLabOrdersSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(deleteLabOrdersFailed(error));
    });
};
export const updateTreatmentPlans = data => (dispatch) => {
  dispatch(updateTreatmentPlansRequest());
  service
    .updateTreatmentPlans(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(updateTreatmentPlansSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(updateTreatmentPlansFailed(error));
    });
};
export const deleteTreatmentPlans = appointmentId => (dispatch) => {
  dispatch(deleteTreatmentPlansRequest());
  service
    .deleteTreatmentPlans(appointmentId)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(deleteTreatmentPlansSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(deleteTreatmentPlansFailed(error));
    });
};
export const updateCompletedProcedures = data => (dispatch) => {
  dispatch(updateCompletedProceduresRequest());
  service
    .updateCompletedProcedures(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(updateCompletedProceduresSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(updateCompletedProceduresFailed(error));
    });
};
export const deleteCompletedProcedures = appointmentId => (dispatch) => {
  dispatch(deleteCompletedProceduresRequest());
  service
    .deleteCompletedProcedures(appointmentId)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(deleteCompletedProceduresSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(deleteCompletedProceduresFailed(error));
    });
};