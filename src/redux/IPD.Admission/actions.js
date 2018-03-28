import service from '../../services/ipd.admission';

import { checkStatus, checkResponseCode } from '../../utils/ApiUtils';

export const actions = {
  ADMISSION_FETCH_ALL_REQUEST: 'ADMISSION_FETCH_ALL_REQUEST',
  ADMISSION_FETCH_ALL_SUCCESS: 'ADMISSION_FETCH_ALL_SUCCESS',
  ADMISSION_FETCH_ALL_FAILED: 'ADMISSION_FETCH_ALL_FAILED',

  ADMISSION_FETCH_REQUEST: 'ADMISSION_FETCH_REQUEST',
  ADMISSION_FETCH_SUCCESS: 'ADMISSION_FETCH_SUCCESS',
  ADMISSION_FETCH_FAILED: 'ADMISSION_FETCH_FAILED',

  ADMISSION_ADD_REQUEST: 'ADMISSION_ADD_REQUEST',
  ADMISSION_ADD_SUCCESS: 'ADMISSION_ADD_SUCCESS',
  ADMISSION_ADD_FAILED: 'ADMISSION_ADD_FAILED',

  ADMISSION_EDIT_REQUEST: 'ADMISSION_EDIT_REQUEST',
  ADMISSION_EDIT_SUCCESS: 'ADMISSION_EDIT_SUCCESS',
  ADMISSION_EDIT_FAILED: 'ADMISSION_EDIT_FAILED',

  ADMISSION_CANCEL_REQUEST: 'ADMISSION_CANCEL_REQUEST',
  ADMISSION_CANCEL_SUCCESS: 'ADMISSION_CANCEL_SUCCESS',
  ADMISSION_CANCEL_FAILED: 'ADMISSION_CANCEL_FAILED',

  SELECT_ADMISSION: 'SELECT_ADMISSION',
  TOGGLE_DONE_ACTION: 'TOGGLE_DONE_ACTION',
};

export const fetchRequest = () => ({
  type: actions.ADMISSION_FETCH_REQUEST,
});
export const fetchSuccess = data => ({
  type: actions.ADMISSION_FETCH_SUCCESS,
  payload: data,
});
export const fetchFailed = error => ({
  type: actions.ADMISSION_FETCH_FAILED,
  payload: error,
});

export const fetchAllRequest = () => ({
  type: actions.ADMISSION_FETCH_ALL_REQUEST,
});
export const fetchAllSuccess = data => ({
  type: actions.ADMISSION_FETCH_ALL_SUCCESS,
  payload: data,
});
export const fetchAllFailed = error => ({
  type: actions.ADMISSION_FETCH_ALL_FAILED,
  payload: error,
});

export const addRequest = () => ({
  type: actions.ADMISSION_ADD_REQUEST,
});
export const addSuccess = data => ({
  type: actions.ADMISSION_ADD_SUCCESS,
  payload: data,
});
export const addFailed = error => ({
  type: actions.ADMISSION_ADD_FAILED,
  payload: error,
});

export const editRequest = () => ({
  type: actions.ADMISSION_EDIT_REQUEST,
});
export const editSuccess = data => ({
  type: actions.ADMISSION_EDIT_SUCCESS,
  payload: data,
});
export const editFailed = error => ({
  type: actions.ADMISSION_EDIT_FAILED,
  payload: error,
});

export const cancelRequest = () => ({
  type: actions.ADMISSION_CANCEL_REQUEST,
});
export const cancelSuccess = data => ({
  type: actions.ADMISSION_CANCEL_SUCCESS,
  payload: data,
});
export const cancelFailed = error => ({
  type: actions.ADMISSION_CANCEL_FAILED,
  payload: error,
});

export const selectAdmission = data => ({
  type: actions.SELECT_ADMISSION,
  payload: data,
});

export const toggleDoneAction = () => ({
  type: actions.TOGGLE_DONE_ACTION,
});

export const fetch = appointmentId => (dispatch) => {
  dispatch(fetchRequest());
  service
    .getAdmission(appointmentId)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(fetchSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(fetchFailed(error));
    });
};

export const fetchAll = (fromDate, toDate) => (dispatch) => {
  dispatch(fetchAllRequest());
  service
    .getAllAdmissions(fromDate, toDate)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(fetchAllSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(fetchAllFailed(error));
    });
};

export const addAdmission = data => (dispatch) => {
  dispatch(addRequest());
  service
    .addAdmission(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(addSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(addFailed(error));
    });
};

export const editAdmission = data => (dispatch) => {
  dispatch(editRequest());
  service
    .editAdmission(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(editSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(editFailed(error));
    });
};

export const cancel = data => (dispatch) => {
  dispatch(cancelRequest());
  service
    .cancelAdmission(data)
    .then(checkStatus)
    .then(checkResponseCode)
    .then((response) => {
      dispatch(cancelSuccess(response.Payload));
    })
    .catch((error) => {
      dispatch(cancelFailed(error));
    });
};
