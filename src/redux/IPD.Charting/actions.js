import service from '../../services/ipd.charting';

import { checkStatus, checkResponseCode } from '../../utils/ApiUtils';

export const actions = {
  ADMISSION_VITAL_SIGNS_UPDATE_REQUEST: 'ADMISSION_VITAL_SIGNS_UPDATE_REQUEST',
  ADMISSION_VITAL_SIGNS_UPDATE_SUCCESS: 'ADMISSION_VITAL_SIGNS_UPDATE_SUCCESS',
  ADMISSION_VITAL_SIGNS_UPDATE_FAILED: 'ADMISSION_VITAL_SIGNS_UPDATE_FAILED',

  ADMISSION_VITAL_SIGNS_DELETE_REQUEST: 'ADMISSION_VITAL_SIGNS_DELETE_REQUEST',
  ADMISSION_VITAL_SIGNS_DELETE_SUCCESS: 'ADMISSION_VITAL_SIGNS_DELETE_SUCCESS',
  ADMISSION_VITAL_SIGNS_DELETE_FAILED: 'ADMISSION_VITAL_SIGNS_DELETE_FAILED',

  ADMISSION_CLINICAL_NOTES_UPDATE_REQUEST: 'ADMISSION_CLINICAL_NOTES_UPDATE_REQUEST',
  ADMISSION_CLINICAL_NOTES_UPDATE_SUCCESS: 'ADMISSION_CLINICAL_NOTES_UPDATE_SUCCESS',
  ADMISSION_CLINICAL_NOTES_UPDATE_FAILED: 'ADMISSION_CLINICAL_NOTES_UPDATE_FAILED',

  ADMISSION_CLINICAL_NOTES_DELETE_REQUEST: 'ADMISSION_CLINICAL_NOTES_DELETE_REQUEST',
  ADMISSION_CLINICAL_NOTES_DELETE_SUCCESS: 'ADMISSION_CLINICAL_NOTES_DELETE_SUCCESS',
  ADMISSION_CLINICAL_NOTES_DELETE_FAILED: 'ADMISSION_CLINICAL_NOTES_DELETE_FAILED',

  ADMISSION_PRESCRIPTIONS_UPDATE_REQUEST: 'ADMISSION_PRESCRIPTIONS_UPDATE_REQUEST',
  ADMISSION_PRESCRIPTIONS_UPDATE_SUCCESS: 'ADMISSION_PRESCRIPTIONS_UPDATE_SUCCESS',
  ADMISSION_PRESCRIPTIONS_UPDATE_FAILED: 'ADMISSION_PRESCRIPTIONS_UPDATE_FAILED',

  ADMISSION_PRESCRIPTIONS_DELETE_REQUEST: 'ADMISSION_PRESCRIPTIONS_DELETE_REQUEST',
  ADMISSION_PRESCRIPTIONS_DELETE_SUCCESS: 'ADMISSION_PRESCRIPTIONS_DELETE_SUCCESS',
  ADMISSION_PRESCRIPTIONS_DELETE_FAILED: 'ADMISSION_PRESCRIPTIONS_DELETE_FAILED',

  ADMISSION_LAB_ORDERS_UPDATE_REQUEST: 'ADMISSION_LAB_ORDERS_UPDATE_REQUEST',
  ADMISSION_LAB_ORDERS_UPDATE_SUCCESS: 'ADMISSION_LAB_ORDERS_UPDATE_SUCCESS',
  ADMISSION_LAB_ORDERS_UPDATE_FAILED: 'ADMISSION_LAB_ORDERS_UPDATE_FAILED',

  ADMISSION_LAB_ORDERS_DELETE_REQUEST: 'ADMISSION_LAB_ORDERS_DELETE_REQUEST',
  ADMISSION_LAB_ORDERS_DELETE_SUCCESS: 'ADMISSION_LAB_ORDERS_DELETE_SUCCESS',
  ADMISSION_LAB_ORDERS_DELETE_FAILED: 'ADMISSION_LAB_ORDERS_DELETE_FAILED',

  ADMISSION_TREATMENT_PLANS_UPDATE_REQUEST: 'ADMISSION_TREATMENT_PLANS_UPDATE_REQUEST',
  ADMISSION_TREATMENT_PLANS_UPDATE_SUCCESS: 'ADMISSION_TREATMENT_PLANS_UPDATE_SUCCESS',
  ADMISSION_TREATMENT_PLANS_UPDATE_FAILED: 'ADMISSION_TREATMENT_PLANS_UPDATE_FAILED',

  ADMISSION_TREATMENT_PLANS_DELETE_REQUEST: 'ADMISSION_TREATMENT_PLANS_DELETE_REQUEST',
  ADMISSION_TREATMENT_PLANS_DELETE_SUCCESS: 'ADMISSION_TREATMENT_PLANS_DELETE_SUCCESS',
  ADMISSION_TREATMENT_PLANS_DELETE_FAILED: 'ADMISSION_TREATMENT_PLANS_DELETE_FAILED',

  ADMISSION_COMPLETED_PROCEDURES_UPDATE_REQUEST: 'ADMISSION_COMPLETED_PROCEDURES_UPDATE_REQUEST',
  ADMISSION_COMPLETED_PROCEDURES_UPDATE_SUCCESS: 'ADMISSION_COMPLETED_PROCEDURES_UPDATE_SUCCESS',
  ADMISSION_COMPLETED_PROCEDURES_UPDATE_FAILED: 'ADMISSION_COMPLETED_PROCEDURES_UPDATE_FAILED',

  ADMISSION_COMPLETED_PROCEDURES_DELETE_REQUEST: 'ADMISSION_COMPLETED_PROCEDURES_DELETE_REQUEST',
  ADMISSION_COMPLETED_PROCEDURES_DELETE_SUCCESS: 'ADMISSION_COMPLETED_PROCEDURES_DELETE_SUCCESS',
  ADMISSION_COMPLETED_PROCEDURES_DELETE_FAILED: 'ADMISSION_COMPLETED_PROCEDURES_DELETE_FAILED',

  TOGGLE_DONE_ACTION: 'TOGGLE_DONE_ACTION',
};

export const updateVitalSignsRequest = () => ({
  type: actions.ADMISSION_VITAL_SIGNS_UPDATE_REQUEST,
});
export const updateVitalSignsSuccess = data => ({
  type: actions.ADMISSION_VITAL_SIGNS_UPDATE_SUCCESS,
  payload: data,
});
export const updateVitalSignsFailed = error => ({
  type: actions.ADMISSION_VITAL_SIGNS_UPDATE_FAILED,
  payload: error,
});

export const deleteVitalSignsRequest = () => ({
  type: actions.ADMISSION_VITAL_SIGNS_DELETE_REQUEST,
});
export const deleteVitalSignsSuccess = data => ({
  type: actions.ADMISSION_VITAL_SIGNS_DELETE_SUCCESS,
  payload: data,
});
export const deleteVitalSignsFailed = error => ({
  type: actions.ADMISSION_VITAL_SIGNS_DELETE_FAILED,
  payload: error,
});
export const updateClinicalNotesRequest = () => ({
  type: actions.ADMISSION_CLINICAL_NOTES_UPDATE_REQUEST,
});
export const updateClinicalNotesSuccess = data => ({
  type: actions.ADMISSION_CLINICAL_NOTES_UPDATE_SUCCESS,
  payload: data,
});
export const updateClinicalNotesFailed = error => ({
  type: actions.ADMISSION_CLINICAL_NOTES_UPDATE_FAILED,
  payload: error,
});

export const deleteClinicalNotesRequest = () => ({
  type: actions.ADMISSION_CLINICAL_NOTES_DELETE_REQUEST,
});
export const deleteClinicalNotesSuccess = data => ({
  type: actions.ADMISSION_CLINICAL_NOTES_DELETE_SUCCESS,
  payload: data,
});
export const deleteClinicalNotesFailed = error => ({
  type: actions.ADMISSION_CLINICAL_NOTES_DELETE_FAILED,
  payload: error,
});
export const updatePrescriptionsRequest = () => ({
  type: actions.ADMISSION_PRESCRIPTIONS_UPDATE_REQUEST,
});
export const updatePrescriptionsSuccess = data => ({
  type: actions.ADMISSION_PRESCRIPTIONS_UPDATE_SUCCESS,
  payload: data,
});
export const updatePrescriptionsFailed = error => ({
  type: actions.ADMISSION_PRESCRIPTIONS_UPDATE_FAILED,
  payload: error,
});

export const deletePrescriptionsRequest = () => ({
  type: actions.ADMISSION_PRESCRIPTIONS_DELETE_REQUEST,
});
export const deletePrescriptionsSuccess = data => ({
  type: actions.ADMISSION_PRESCRIPTIONS_DELETE_SUCCESS,
  payload: data,
});
export const deletePrescriptionsFailed = error => ({
  type: actions.ADMISSION_PRESCRIPTIONS_DELETE_FAILED,
  payload: error,
});
export const updateLabOrdersRequest = () => ({
  type: actions.ADMISSION_LAB_ORDERS_UPDATE_REQUEST,
});
export const updateLabOrdersSuccess = data => ({
  type: actions.ADMISSION_LAB_ORDERS_UPDATE_SUCCESS,
  payload: data,
});
export const updateLabOrdersFailed = error => ({
  type: actions.ADMISSION_LAB_ORDERS_UPDATE_FAILED,
  payload: error,
});

export const deleteLabOrdersRequest = () => ({
  type: actions.ADMISSION_LAB_ORDERS_DELETE_REQUEST,
});
export const deleteLabOrdersSuccess = data => ({
  type: actions.ADMISSION_LAB_ORDERS_DELETE_SUCCESS,
  payload: data,
});
export const deleteLabOrdersFailed = error => ({
  type: actions.ADMISSION_LAB_ORDERS_DELETE_FAILED,
  payload: error,
});
export const updateTreatmentPlansRequest = () => ({
  type: actions.ADMISSION_TREATMENT_PLANS_UPDATE_REQUEST,
});
export const updateTreatmentPlansSuccess = data => ({
  type: actions.ADMISSION_TREATMENT_PLANS_UPDATE_SUCCESS,
  payload: data,
});
export const updateTreatmentPlansFailed = error => ({
  type: actions.ADMISSION_TREATMENT_PLANS_UPDATE_FAILED,
  payload: error,
});

export const deleteTreatmentPlansRequest = () => ({
  type: actions.ADMISSION_TREATMENT_PLANS_DELETE_REQUEST,
});
export const deleteTreatmentPlansSuccess = data => ({
  type: actions.ADMISSION_TREATMENT_PLANS_DELETE_SUCCESS,
  payload: data,
});
export const deleteTreatmentPlansFailed = error => ({
  type: actions.ADMISSION_TREATMENT_PLANS_DELETE_FAILED,
  payload: error,
});
export const updateCompletedProceduresRequest = () => ({
  type: actions.ADMISSION_COMPLETED_PROCEDURES_UPDATE_REQUEST,
});
export const updateCompletedProceduresSuccess = data => ({
  type: actions.ADMISSION_COMPLETED_PROCEDURES_UPDATE_SUCCESS,
  payload: data,
});
export const updateCompletedProceduresFailed = error => ({
  type: actions.ADMISSION_COMPLETED_PROCEDURES_UPDATE_FAILED,
  payload: error,
});

export const deleteCompletedProceduresRequest = () => ({
  type: actions.ADMISSION_COMPLETED_PROCEDURES_DELETE_REQUEST,
});
export const deleteCompletedProceduresSuccess = data => ({
  type: actions.ADMISSION_COMPLETED_PROCEDURES_DELETE_SUCCESS,
  payload: data,
});
export const deleteCompletedProceduresFailed = error => ({
  type: actions.ADMISSION_COMPLETED_PROCEDURES_DELETE_FAILED,
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
export const deleteVitalSigns = ipdAdmissionId => (dispatch) => {
  dispatch(deleteVitalSignsRequest());
  service
    .deleteVitalSigns(ipdAdmissionId)
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
export const deleteClinicalNotes = ipdAdmissionId => (dispatch) => {
  dispatch(deleteClinicalNotesRequest());
  service
    .deleteClinicalNotes(ipdAdmissionId)
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
export const deletePrescriptions = ipdAdmissionId => (dispatch) => {
  dispatch(deletePrescriptionsRequest());
  service
    .deletePrescriptions(ipdAdmissionId)
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
export const deleteLabOrders = ipdAdmissionId => (dispatch) => {
  dispatch(deleteLabOrdersRequest());
  service
    .deleteLabOrders(ipdAdmissionId)
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
export const deleteTreatmentPlans = ipdAdmissionId => (dispatch) => {
  dispatch(deleteTreatmentPlansRequest());
  service
    .deleteTreatmentPlans(ipdAdmissionId)
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
export const deleteCompletedProcedures = ipdAdmissionId => (dispatch) => {
  dispatch(deleteCompletedProceduresRequest());
  service
    .deleteCompletedProcedures(ipdAdmissionId)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(deleteCompletedProceduresSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(deleteCompletedProceduresFailed(error));
    });
};
