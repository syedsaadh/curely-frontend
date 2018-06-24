import service from '../../services/patient';

import { checkStatus, checkResponseCode } from '../../utils/ApiUtils';

export const actions = {
  PATIENT_FETCH_ALL_REQUEST: 'PATIENT_FETCH_ALL_REQUEST',
  PATIENT_FETCH_ALL_SUCCESS: 'PATIENT_FETCH_ALL_SUCCESS',
  PATIENT_FETCH_ALL_FAILED: 'PATIENT_FETCH_ALL_FAILED',

  PATIENT_FETCH_REQUEST: 'PATIENT_FETCH_REQUEST',
  PATIENT_FETCH_SUCCESS: 'PATIENT_FETCH_SUCCESS',
  PATIENT_FETCH_FAILED: 'PATIENT_FETCH_FAILED',

  PATIENT_ADD_REQUEST: 'PATIENT_ADD_REQUEST',
  PATIENT_ADD_SUCCESS: 'PATIENT_ADD_SUCCESS',
  PATIENT_ADD_FAILED: 'PATIENT_ADD_FAILED',

  PATIENT_EDIT_REQUEST: 'PATIENT_EDIT_REQUEST',
  PATIENT_EDIT_SUCCESS: 'PATIENT_EDIT_SUCCESS',
  PATIENT_EDIT_FAILED: 'PATIENT_EDIT_FAILED',

  PATIENT_DELETE_REQUEST: 'PATIENT_DELETE_REQUEST',
  PATIENT_DELETE_SUCCESS: 'PATIENT_DELETE_SUCCESS',
  PATIENT_DELETE_FAILED: 'PATIENT_DELETE_FAILED',

  SORT_PATIENTS_BY_NAME: 'SORT_PATIENTS_BY_NAME',
  SORT_PATIENTS_BY_ID: 'SORT_PATIENTS_BY_ID',

  SELECT_PATIENT: 'SELECT_PATIENT',
  TOGGLE_DONE_ACTION: 'TOGGLE_DONE_ACTION',
};

export const fetchAllRequest = () => ({
  type: actions.PATIENT_FETCH_ALL_REQUEST,
});
export const fetchAllSuccess = data => ({
  type: actions.PATIENT_FETCH_ALL_SUCCESS,
  payload: data,
});
export const fetchAllFailed = error => ({
  type: actions.PATIENT_FETCH_ALL_FAILED,
  payload: error,
});

export const fetchRequest = () => ({
  type: actions.PATIENT_FETCH_REQUEST,
});
export const fetchSuccess = data => ({
  type: actions.PATIENT_FETCH_SUCCESS,
  payload: data,
});
export const fetchFailed = error => ({
  type: actions.PATIENT_FETCH_FAILED,
  payload: error,
});

export const addRequest = () => ({
  type: actions.PATIENT_ADD_REQUEST,
});
export const addSuccess = data => ({
  type: actions.PATIENT_ADD_SUCCESS,
  payload: data,
});
export const addFailed = error => ({
  type: actions.PATIENT_ADD_FAILED,
  payload: error,
});

export const editRequest = () => ({
  type: actions.PATIENT_EDIT_REQUEST,
});
export const editSuccess = data => ({
  type: actions.PATIENT_EDIT_SUCCESS,
  payload: data,
});
export const editFailed = error => ({
  type: actions.PATIENT_EDIT_FAILED,
  payload: error,
});

export const deleteRequest = () => ({
  type: actions.PATIENT_DELETE_REQUEST,
});
export const deleteSuccess = data => ({
  type: actions.PATIENT_DELETE_SUCCESS,
  payload: data,
});
export const deleteFailed = error => ({
  type: actions.PATIENT_DELETE_FAILED,
  payload: error,
});

export const selectPatient = data => ({
  type: actions.SELECT_PATIENT,
  payload: data,
});

export const toggleDoneAction = () => ({
  type: actions.TOGGLE_DONE_ACTION,
});

export const sortByName = () => ({
  type: actions.SORT_PATIENTS_BY_NAME,
});
export const sortById = () => ({
  type: actions.SORT_PATIENTS_BY_ID,
});

export const fetchAll = () => (dispatch) => {
  dispatch(fetchAllRequest());
  service
    .getAllPatient()
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(fetchAllSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(fetchAllFailed(error));
    });
};

export const fetchPatient = id => (dispatch) => {
  dispatch(fetchRequest());
  service
    .getPatientById(id)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(fetchSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(fetchFailed(error));
    });
};

export const addPatient = data => (dispatch) => {
  dispatch(addRequest());
  service
    .addPatient(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(addSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(addFailed(error));
    });
};

export const editPatient = data => (dispatch) => {
  dispatch(editRequest());
  service
    .editPatient(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(editSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(editFailed(error));
    });
};

export const deletePatient = id => (dispatch) => {
  dispatch(deleteRequest());
  service
    .deletePatient(id)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(deleteSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(deleteFailed(error));
    });
};
